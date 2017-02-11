function showWikiArticle(evt){
  var activeElement = chart.getElementAtEvent(evt);
  if (activeElement.length==0){
    return;
  }
  date_ = xticks[activeElement[0]._index]
  link = "https://en.wikipedia.org/w/api.php?action=query&prop=revisions&titles="+Title+"&rvlimit=1&rvprop=ids&rvdir=newer&rvstart="+date_.toISOString();

  $.ajax({
            url: link,
            type: "GET",
            dataType: 'jsonp',
            jsonp: "callback",
            data: {
              action: "query",
              list: "search",
              srsearch: "javascript",
              format: "json"
            },
            xhrFields: { withCredentials: true },
            success: function(data){
                  k = Object.keys(data["query"]["pages"])[0];
                  revid = data["query"]["pages"][k]["revisions"][0]["revid"];
                  final_link = "https://en.m.wikipedia.org/w/index.php?title="+Title+"&oldid="+revid
                  $('#articleIFrame').remove(); // this is my <canvas> element
                  $('#canvasContainer').append('<iframe src="'+final_link+'" id="articleIFrame" width = "100%" height= "200px" class = "display_website"></iframe>');
              }
}
);
}
function create_title(article_topics, topics,tag) {
tag.append('<h5>Topics in document (bag of words):</h5>');
tag.append('<ul class="post-list">');
ss = article_topics.sort(function(a,b){return -a["membership_value"]+b["membership_value"]});
for (k=0; k<article_topics.length; k++)
{
  tag.append("<li>"+topics[ss[k]["topic_id"]]+" (<b>"+ss[k]["membership_value"]+"</b>).</li>")
}
tag.append('</ul>');
}

function plot(data_arrival,data_removal,article_topics,ticks,topics){
$('#canvasContainer').empty();

create_title(article_topics,topics,$('#canvasContainer'));
$('#canvasContainer').append('<canvas id="canvasArticle"><canvas>');
var ctx = document.getElementById("canvasArticle");

var momentDate = moment(data_arrival['main']['start'], 'YYYYMMDDHHmmss');
var begin = momentDate.toDate();
Title = data_arrival['main']["name_"];
Date.prototype.mmyy = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [(mm>9 ? '' : '0') + mm,
          this.getFullYear()
        ].join('-');
};
xticks = []
for (i=0; i<Object.keys(ticks).length;i++) {
  var temp = new Date(begin);
  temp.setDate(temp.getDate()+parseInt(ticks[i]));
  xticks.push(temp);
}

params = {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'statements added',
            data: [],
            yAxisID: 'addition',
            borderWidth: 1,
            backgroundColor: 'rgba(132, 99, 255, 1)'
        },{
            label: 'statements refuted ',
            data: [],
            yAxisID: 'removal',
            borderWidth: 1,
            backgroundColor: 'rgba(255, 99, 132, 1)'
        }]
    },
    options: {
        scales: {
            yAxes: [{
              id:"addition",
              scaleLabel: {
                display: true,
                labelString: 'addition intensity'
              },
              position:"left"
            },
            {
              id:"removal",
              scaleLabel: {
                display: true,
                labelString: 'refutation intensity'
              },
              gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                },
              position:"right"
            }],
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'time'
              },
            ticks: {
                    callback: function(label, index, labels) {
                        return xticks[label].mmyy();
                    }
                  }
            }]
        },
    onClick: showWikiArticle
    }
}

for (i = 0; i<data_arrival['payload'].length; i++){
  params['data']['labels'].push(data_arrival['payload'][i].location)
  params['data']['datasets'][0]['data'].push(data_arrival['payload'][i].value_)
}
for (i = 0; i<data_removal['payload'].length; i++){
  params['data']['datasets'][1]['data'].push(data_removal['payload'][i].value_)
}
chart = new Chart(ctx, params);
$('#canvasContainer').append('<p>Select a bar to view corresponding revision of <b>'+Title+'</b>\'s article on Wikipedia.</p>');
}

function create_Fulltitle(topics,tag) {
tag.append('<h5>Topics (bag of words):</h5>');
tag.append('<ul class="post-list">');
for (k=0; k<Object.keys(topics).length; k++)
{
  tag.append("<li> <b> Topic "+(k+1)+" </b> "+topics[String(k)]+".</li>")
}
tag.append('</ul>');
}


function plotDomain(data_arrival,data_removal,topics){
  $('#canvasContainerSource').empty();
  $('#canvasContainerSource').append('<div class="leftcanv"><canvas id="canvasSourceArr"><canvas></div>');

  var ctx = document.getElementById("canvasSourceArr");

  labels = [];
  for (i=0; i<Object.keys(topics).length;i++)
  {
    labels.push("Topic "+(i+1));
  }
  arr_arr = []
  for (i=0; i<data_arrival["payload"].length;i++)
  {
    arr_arr.push(data_arrival["payload"][i]['value_']);
  }

  var data = {
    labels: labels,
    datasets: [
        {
            label: "Follow up rate",
            backgroundColor: "rgba(179,181,198,0.2)",
            borderColor: "rgba(179,181,198,1)",
            pointBackgroundColor: "rgba(179,181,198,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(179,181,198,1)",
            data: arr_arr
        }
    ]
  };
  params = {
     type: 'radar',
     data: data,
     options: {
       scale:{
         ticks: {
           min : 0,
           max : 3.0,
           maxTicksLimit:5
         }
       }
     }
   };
  chart = new Chart(ctx, params);


$('#canvasContainerSource').append('<div class="rightcanv"><canvas id="canvasSourceRem"><canvas></div>');

  var ctx = document.getElementById("canvasSourceRem");


  labels = [];
  for (i=0; i<Object.keys(topics).length;i++)
  {
    labels.push("Topic "+(i+1));
  }
  arr_arr = []
  for (i=0; i<data_removal["payload"].length;i++)
  {
    arr_arr.push(data_removal["payload"][i]['value_']);
  }

  var data = {
    labels: labels,
    datasets: [
        {
            label: "Refutation rate",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            pointBackgroundColor: "rgba(255,99,132,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(255,99,132,1)",
            data: arr_arr
        }
    ]
  };
  params = {
     type: 'radar',
     data: data,
     options: {
       scale:{
         ticks: {
           min : 0,
           max : 0.01,
           maxTicksLimit:5
         }
       }
     }
   };
  chart = new Chart(ctx, params);
create_Fulltitle(topics,$('#canvasContainerSource'));
}
