function plot(data_arrival,data_removal){
$('#canvasArticle').remove(); // this is my <canvas> element
$('#canvasContainer').append('<canvas id="canvasArticle"><canvas>');
var ctx = document.getElementById("canvasArticle");

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
