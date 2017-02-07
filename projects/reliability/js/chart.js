function plot(data_arrival,data_removal,ticks){
$('#canvasArticle').remove(); // this is my <canvas> element
$('#canvasContainer').append('<canvas id="canvasArticle"><canvas>');
var ctx = document.getElementById("canvasArticle");

var momentDate = moment(data_arrival['main']['start'], 'YYYYMMDDHHmmss');
var begin = momentDate.toDate();

Date.prototype.mmyy = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [(mm>9 ? '' : '0') + mm,
          this.getFullYear()
        ].join('-');
};
xticks = []
console.log(begin.getDate());
for (i=0; i<Object.keys(ticks).length;i++) {
  var temp = new Date(begin);
  temp.setDate(temp.getDate()+parseInt(ticks[i]));
  xticks.push(temp.mmyy());
}

params = {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'arrival',
            data: [],
            borderWidth: 1,
            backgroundColor: 'rgba(255, 99, 132, 1)'
        },{
            label: 'removal',
            data: [],
            borderWidth: 1,
            backgroundColor: 'rgba(132, 99, 255, 1)'
        }]
    },
    options: {
        scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'intensity'
              }
            }],
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'time'
              },
            ticks: {
                    callback: function(label, index, labels) {
                        return xticks[label];
                    }
                  }
            }]
        }
    }
}

for (i = 0; i<data_arrival['payload'].length; i++){
  params['data']['labels'].push(data_arrival['payload'][i].location)
  params['data']['datasets'][0]['data'].push(data_arrival['payload'][i].value_)
}
for (i = 0; i<data_removal['payload'].length; i++){
  params['data']['datasets'][1]['data'].push(data_removal['payload'][i].value_)
}
var myChart = new Chart(ctx, params);
}
