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
                  final_link = "https://en.wikipedia.org/w/index.php?title="+Title+"&oldid="+revid
                  $('#articleIFrame').remove(); // this is my <canvas> element
                  $('#canvasContainer').append('<iframe src="'+final_link+'" id="articleIFrame" class = "display_website"></iframe>');
              }
}
);


  console.log();

}

function plot(data_arrival,data_removal,ticks){
$('#canvasContainer').empty();
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
