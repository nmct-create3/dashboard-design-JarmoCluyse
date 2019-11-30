let daySelect, graph, myLineChart;
let apiEndpoint ="https://iotcloud-nmct.azurewebsites.net/api/visitors/";

const drawChart = function (visitors) {
    let ctx = graph.getContext("2d");
    if (myLineChart != undefined){
        myLineChart.reset();
    }
    myLineChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: ["week1", "week2", "week3", "week4", "week5", "week6", "week7", ],
			datasets: [
				{
					label: 'Visitors',
					data: visitors,
					backgroundColor: [
						'rgba(143, 139, 255, 0.15)'
					],
					borderColor: [
						'rgba(143, 139, 255, 1)'
					],
					borderWidth: 2,
					pointBackgroundColor: 'rgba(255, 255, 255, 1)'
				}
			]
		},
		options: {
            legend: {
                position: 'bottom'
            },
			scales: {
				yAxes: [
					{
						scaleLabel: {
                            display: true
                        },
                        ticks:{
                            suggestedMin: 0, 
                            suggestedMax: 50
                        }
					}
				],
				xAxes: [
					{
						scaleLabel: {
							display: true
						}
					}
				]
			}
		}
	});
    

    
};

const showResult = function (jsondata) {
    console.log(jsondata);
    let visitors = [];
    for (data of jsondata) {
        visitors.push(data['AantalBezoekers']);
    }
    console.log(visitors);
    drawChart(visitors);
};

let getVisitorsByDay = (value) => {
	let uri = apiEndpoint + value;
	fetch(uri)
		.then(function(response) {
			if (!response.ok) {
				throw Error(
					`Looks like there was a problem. Status Code: ${response.status}`
				);
			} else {
				return response.json();
			}
		})
		.then(function(jsonObject) {
			showResult(jsonObject);
		})
		.catch(function(error) {
			console.error(`fout bij verwerken json ${error}`);
		});
};

const init = function() {
    console.log('Script geladen!');
    daySelect = document.querySelector('.js-daySelect');
    graph = document.querySelector('.js-graph');
    getVisitorsByDay("maandag");
    daySelect.addEventListener('change', function () {
        getVisitorsByDay(daySelect.value);
    })
};

// DomContentLoaded niet nodig door defer
document.addEventListener('DOMContentLoaded', function() {
	init();
});
