import React, { useEffect, useState } from 'react';
import Chart from 'chart.js';
import './DrawDetails.css';
import { fontSize } from '@mui/material/node_modules/@mui/system';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import { Link } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import { useLocation } from 'react-router-dom';

/*...*/

let ctx1;
let ctx2;
let ctx3;
let ctx4;
let ctx5;

let yValuesSec2 = [];
let sec2;
let yValuesSec3 = [];
let sec3;

const DrawDetails = (props) => {
    console.log(props.data);
    console.log(props.index);
    const location = useLocation();
    const data = location;
    const storedData = JSON.parse(localStorage.getItem('Item'));
    const Names = JSON.parse(localStorage.getItem('Names'));
    console.log(storedData);

    useEffect(() => {
        yValuesSec2.push(3.017);
        yValuesSec2.push(2.449);
        sec2 = yValuesSec2.length;
        yValuesSec3.push(3.017);
        yValuesSec3.push(2.449);
        yValuesSec3.push(5.7);
        yValuesSec3.push(2.3);
        yValuesSec3.push(4);
        sec3 = yValuesSec3.length;

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
        let xValues = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20];
        let child1 = [1.5, 2.7, 0, 0, 2.3, 6.5, 4.2, 0, 1.5, 5.2, 0, 0, 0, 1, 2, 3.2, 3.2, 1.5, 1.5, 0.2, 1.5, 2.7, 0, 0, 2.3, 6.5, 4.2, 0, 1.5, 5.2, 0, 0, 0, 1, 2, 3.2, 3.2, 1.5, 1.5, 0.2]
        let child2 = [0.3, 0, 0, 5.2, 1.2, 6.3, 2.4, 0, 0, 1.2, 1.5, 1.9, 3.7, 6.7, 0, 0, 2.9, 6.7, 0, 1.3, 0.3, 0, 0, 5.2, 1.2, 6.3, 2.4, 0, 0, 1.2, 1.5, 1.9, 3.7, 6.7, 0, 0, 2.9, 6.7, 0, 1.3]
        new Chart(ctx1, {
            type: "line",
            data: {
                labels: xValues,
                datasets: [{
                    label: Names[1],
                    data: child1,
                    borderColor: "red",
                    fill: true,
                }, {
                    label: Names[0],
                    data: child2,
                    borderColor: "blue",
                    fill: false
                }]
            },
            options: {
                legend: { display: true },
                title: {
                    display: true,
                    text: `סנכרון בין ${Names[0]} לבין ${Names[1]}`,
                    fontSize: 20
                }
            }
        });
    }
    const Chart2 = () => {
        let xValues = [];
        let namber = 1;
        if (sec2 < sec3) {
            for (let i = 0; i < sec3; i++) {
                xValues.push(namber);
                namber++
            }
        }
        else {
            for (let i = 0; i < yValuesSec2.length; i++) {
                xValues.push(namber);
                namber++
            }
        }
        let barColors = "red";
        new Chart(ctx2, {
            type: "horizontalBar",
            data: {
                labels: xValues,
                datasets: [{
                    backgroundColor: barColors,
                    data: yValuesSec2
                }]
            },
            options: {
                legend: { display: false },
                title: {
                    display: true,
                    text: "משך זמן לחיצה - לינוי",
                    fontSize: 20
                },
                scales: {
                    xAxes: [{ ticks: { min: 0 } }]
                }
            }
        });
    }
    const Chart3 = () => {
        let xValues = [];
        let namber = 1;
        if (sec2 < sec3) {
            for (let i = 0; i < yValuesSec3.length; i++) {
                xValues.push(namber);
                namber++
            }
        }
        else {
            for (let i = 0; i < sec2; i++) {
                xValues.push(namber);
                namber++
            }
        }
        let barColors = "blue";
        new Chart(ctx3, {
            type: "horizontalBar",
            data: {
                labels: xValues,
                datasets: [{
                    backgroundColor: barColors,
                    data: yValuesSec3
                }]
            },
            options: {
                legend: { display: false },
                title: {
                    display: true,
                    text: "משך זמן לחיצה - טל",
                    fontSize: 20
                },
                scales: {
                    xAxes: [{ ticks: { min: 0 } }]
                }
            }
        });
    }
    const Chart4 = () => {
        // let xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
        // let yValues = [55, 49, 44, 24, 15];
        let xValues = ["עבה", "רגיל", "דק"];
        let yValues = [55, 49, 44];
        let barColors = [
            "rgba(255,0,0,1)",
            "rgba(255,70,70,0.94)",
            "rgba(255,94,94,0.83)"
        ];

        new Chart(ctx4, {
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
                    text: "עובי קו - לינוי",
                    fontSize: 20
                }
            }
            
        });
    }
    const Chart5 = () => {
        let xValues = ["עבה", "רגיל", "דק"];
        let yValues = [5.9, 10, 14];
        let barColors = [
            "rgba(23, 0, 255, 1)",
            "rgba(0,78,255,0.8)",
            "rgba(0,109,255,0.55)"
        ];

        new Chart(ctx5, {
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
                    text: "עובי קו - טל",
                    fontSize: 20
                }
            }
        });
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <React.Fragment>
            <CardActions>
                <Button variant="outlined" onClick={handleOpen}>שחזור</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <DrawDetails draw={props.item} index={props.index} />

                </Modal>
            </CardActions>
            <div id='graphs'>
                <div id='cync'>
                    <canvas id="Chart1"></canvas>
                </div>
                <div id='sec'>
                    <canvas id="Chart2"></canvas>
                    <canvas id="Chart3"></canvas>
                </div>
                <div id='lineWidth'>
                    <canvas id="Chart4"></canvas>
                    <canvas id="Chart5"></canvas>
                </div>
            </div>
        </React.Fragment>
    );
}

export default DrawDetails;