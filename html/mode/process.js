result.then(function (val) {

    let mode = [];
    let modeAverage = [];
    const modeLabels = ['Minor', 'Major'];

    for (let i = 0; i < val.length; i++) {

        let counter = 0;
        let sum = 0;
        let repeatedList = [];

        for (let j = 0; j < val[i].data.length; j++) {

            let featureValue = val[i].data[j].features.mode;

            if (!repeatedList.includes(featureValue.toFixed(2)) & this.getRandomNumber(1, 100) > 75) {

                repeatedList.push(featureValue.toFixed(2));
                mode.push({
                    'x': val[i].year,
                    'y': featureValue,
                    'artist': val[i].data[j].artists[0]['name'],
                    'song_name': val[i].data[j].name,
                    'song_id': val[i].data[j].id,
                    'feature_name': 'Mode'
                });

            }

            sum += featureValue;
            counter += 1;

        }

        modeAverage.push({
            'x': val[i].year,
            'y': sum / counter,
            'feature_name': 'Mode'
        });

    }

    const data = {
        datasets: [
            {
                label: 'Track',
                type: 'scatter',
                data: mode,
                borderColor: 'rgb(192, 214, 223)',
                backgroundColor: 'rgb(192, 214, 223)',
                pointRadius: 0.5, pointHoverRadius: 4
            },
            {
                label: 'Yearly Average',
                type: 'line',
                data: modeAverage,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgb(255, 99, 132)',
                fill: false, pointRadius: 0.5, pointHoverRadius: 4, lineWidth: 2, tension: 0.25
            },
        ]
    }

    const plugin = {
        id: 'custom_canvas_background_color',
        beforeDraw: (chart) => {
            const ctx = chart.canvas.getContext('2d');
            ctx.save();
            ctx.globalCompositeOperation = 'destination-over';
            ctx.fillStyle = 'rgb(23, 31, 46)';
            ctx.fillRect(0, 0, chart.width, chart.height);
            ctx.restore();
        },
    };

    const config = {
        type: 'scatter',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        color: "white",
                        size: 10,
                        boxWidth: 20
                    }
                },
                tooltip: {
                    callbacks: {

                        label: function (context) {

                            let index = context.dataIndex;

                            if (context.datasetIndex == 0) {

                                let artist = context.dataset.data[index].artist;
                                let songName = context.dataset.data[index].song_name;

                                return artist + ' - ' + songName;

                            } else {

                                let featureName = context.dataset.data[index].feature_name;
                                let currentAverage = context.dataset.data[index].y.toFixed(0);

                                return featureName + ': ' + modeLabels[currentAverage] + ' on average';
                            }

                        },

                        title: function (context) {

                            let index = context[0].dataIndex;
                            let currentYear = context[0].dataset.data[index].x;

                            if (context[0].datasetIndex == 0) {

                                let featureName = context[0].dataset.data[index].feature_name;
                                let currentValue = context[0].dataset.data[index].y;

                                return featureName + ': ' + modeLabels[currentValue] + ' - Year: ' + currentYear;

                            } else {

                                return 'Year ' + currentYear;
                            }
                        }

                        /*footer: function(context) {
            
                          let index = context[0].dataIndex;
            
                          if (context[0].datasetIndex == 0) {
            
                            let id = context[0].dataset.data[index].song_id;
            
                            return 'ID: ' + id;
            
                          }
                        }*/
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: 'white',
                        font: {
                            size: 10
                        }
                    },
                    grid: {
                        color: 'rgba(242, 242, 242, 0.04)'
                    }
                },
                y: {
                    ticks: {
                        color: 'white',
                        font: {
                            size: 10
                        },
                        callback: function (value, index, values) {
                            if ((value == 0) || (value == 1)) {
                                return modeLabels[value];
                            }
                        }
                    },
                    grid: {
                        color: 'rgba(242, 242, 242, 0.04)'
                    },
                    max: 1.25,
                    min: -0.25,
                }
            },
            layout: {
                padding: 6
            }
        },
        plugins: [plugin],
    };

    let chart = new Chart(
        document.getElementById('chart'),
        config
    );

});

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}