result.then(function (val) {

    let liveness = [];
    let livenessAverage = [];

    for (let i = 0; i < val.length; i++) {

        let counter = 0;
        let sum = 0;
        let repeatedList = [];

        for (let j = 0; j < val[i].data.length; j++) {

            let featureValue = val[i].data[j].features.liveness;

            if (!repeatedList.includes(featureValue.toFixed(2)) & this.getRandomNumber(1, 100) > 75) {

                repeatedList.push(featureValue.toFixed(2));
                liveness.push({
                    'x': val[i].year,
                    'y': featureValue,
                    'artist': val[i].data[j].artists[0]['name'],
                    'song_name': val[i].data[j].name,
                    'song_id': val[i].data[j].id,
                    'feature_name': 'Liveness'
                });

            }

            sum += featureValue;
            counter += 1;

        }

        livenessAverage.push({
            'x': val[i].year,
            'y': sum / counter,
            'feature_name': 'Liveness'
        });

    }

    const data = {
        datasets: [
            {
                label: 'Track',
                type: 'scatter',
                data: liveness,
                borderColor: 'rgb(192, 214, 223)',
                backgroundColor: 'rgb(192, 214, 223)',
                pointRadius: 0.5, pointHoverRadius: 4
            },
            {
                label: 'Yearly Average',
                type: 'line',
                data: livenessAverage,
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
                                let currentAverage = context.dataset.data[index].y.toFixed(2);

                                return featureName + ': ' + currentAverage + ' on average';
                            }

                        },

                        title: function (context) {

                            let index = context[0].dataIndex;
                            let currentYear = context[0].dataset.data[index].x;

                            if (context[0].datasetIndex == 0) {

                                let featureName = context[0].dataset.data[index].feature_name;
                                let currentValue = context[0].dataset.data[index].y.toFixed(2);

                                return featureName + ': ' + currentValue + ' - Year: ' + currentYear;

                            } else {

                                return 'Year ' + currentYear;
                            }
                        }
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
                        }
                    },
                    grid: {
                        color: 'rgba(242, 242, 242, 0.04)'
                    }
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


