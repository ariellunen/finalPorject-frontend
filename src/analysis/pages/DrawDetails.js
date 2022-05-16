import React, { useEffect, useState } from 'react';
import Chart from 'chart.js';
import './DrawDetails.css';

let ctx1;
let ctx2;
let ctx3;
let ctx4;
let ctx5;

const DrawDetails = (props) => {
    console.log(props);
    useEffect(() => {
        ctx1 = document.getElementById('Chart1').getContext('2d');
        Chart1();
        ctx2 = document.getElementById('Chart2').getContext('2d');
        Chart2();
        ctx3 = document.getElementById('Chart3').getContext('2d');
        Chart3();
        ctx4 = document.getElementById('Chart4').getContext('2d');
        Chart4();
        ctx5 = document.getElementById('Chart5').getContext('2d');
        Chart5();
    }, []);

    const Chart1 = () => {
        let xValues = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
        let myChart = new Chart(ctx1, {
            type: "line",
            data: {
                labels: xValues,
                datasets: [{
                    data: [860, 1140, 1060, 1060, 1070, 1110, 1330, 2210, 7830, 2478],
                    borderColor: "red",
                    fill: false,
                }, {
                    data: [1600, 1700, 1700, 1900, 2000, 2700, 4000, 5000, 6000, 7000],
                    borderColor: "green",
                    fill: false
                }, {
                    data: [300, 700, 2000, 5000, 6000, 4000, 2000, 1000, 200, 100],
                    borderColor: "blue",
                    fill: false
                }]
            },
            options: {
                legend: { display: true },
                title: {
                    display: true,
                    text: "World Wide Wine Production 2018"
                }
            }
        });
    }
    const Chart2 = () => {
        var xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
        var yValues = [55, 49, 44, 24, 15];
        var barColors = [
            "#b91d47",
            "#00aba9",
            "#2b5797",
            "#e8c3b9",
            "#1e7145"
        ];

        new Chart(ctx2, {
            type: "doughnut",
            data: {
                labels: xValues,
                datasets: [{
                    backgroundColor: barColors,
                    data: yValues
                }]
            },
            options: {
                title: {
                    display: true,
                    text: "World Wide Wine Production 2018"
                }
            }
        });
    }
    const Chart3 = () => {
        var xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
        var yValues = [55, 49, 44, 24, 15];
        var barColors = ["red", "green", "blue", "orange", "brown"];
        new Chart(ctx3, {
            type: "horizontalBar",
            data: {
                labels: xValues,
                datasets: [{
                    backgroundColor: barColors,
                    data: yValues
                }]
            },
            options: {
                legend: { display: false },
                title: {
                    display: true,
                    text: "World Wine Production 2018"
                },
                scales: {
                    xAxes: [{ ticks: { min: 10, max: 60 } }]
                }
            }
        });
    }
    const Chart4 = () => {
        var xValues = [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150];
        var yValues = [7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15];

        new Chart(ctx4, {
            type: "line",
            data: {
                labels: xValues,
                datasets: [{
                    fill: false,
                    lineTension: 0,
                    backgroundColor: "rgba(0,0,255,1.0)",
                    borderColor: "rgba(0,0,255,0.1)",
                    data: yValues
                }]
            },
            options: {
                legend: { display: false },
                scales: {
                    yAxes: [{ ticks: { min: 6, max: 16 } }],
                }
            }
        });
    }
    const Chart5 = () => {
        var xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
        var yValues = [55, 49, 44, 24, 15];
        var barColors = [
            "rgba(255,0,0,1.0)",
            "rgba(255,0,0,0.8)",
            "rgba(255,0,0,0.6)",
            "rgba(255,0,0,0.4)",
            "rgba(255,0,0,0.2)"
        ];

        new Chart(ctx5, {
            type: "bar",
            data: {
                labels: xValues,
                datasets: [{
                    backgroundColor: barColors,
                    data: yValues
                }]
            },
            options: {
                legend: { display: false },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                }
            }
        });
    }
    return (
        <React.Fragment>
            <div id='graphs'>
                <canvas id="Chart1"></canvas>
                <canvas id="Chart2"></canvas>
                <canvas id="Chart3"></canvas>
                <canvas id="Chart4"></canvas>
                <canvas id="Chart5"></canvas>
            </div>
        </React.Fragment>
    );
}

export default DrawDetails;