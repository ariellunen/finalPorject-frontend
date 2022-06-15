import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Chart from 'chart.js';
let ctx2;
let ctx3;
const Chart2 = (props) => {
    useEffect(() => {
        ctx3 = document.getElementById('Chart3').getContext('2d');
        ctx2 = document.getElementById('Chart2').getContext('2d');
        chart2()
        chart3();
    }, [])

    const chart2 = () => {
        let xValues = [];
        let namber = 1;
        console.log(props.sec2)
        if (props.sec2 < props.sec3) {
            for (let i = 0; i < props.sec3; i++) {
                xValues.push(namber);
                namber++
            }
        }
        else {
            for (let i = 0; i < props.yValuesSec2.length; i++) {
                xValues.push(namber);
                namber++
            }
        }
        let barColors = props.storedData.colorFirst;
        new Chart(ctx2, {
            type: "horizontalBar",
            data: {
                labels: xValues,
                datasets: [{
                    backgroundColor: barColors,
                    data: props.yValuesSec2
                }]
            },
            options: {
                legend: { display: false },
                title: {
                    display: true,
                    text: `${props.names[0].name}`,
                    fontSize: 20
                },
                scales: {
                    xAxes: [{ ticks: { min: 0 } }]
                }
            }
        });
    }
    const chart3 = () => {
        let xValues = [];
        let namber = 1;
        if (props.sec2 < props.sec3) {
            for (let i = 0; i < props.yValuesSec3.length; i++) {
                xValues.push(namber);
                namber++
            }
        }
        else {
            for (let i = 0; i < props.sec2; i++) {
                xValues.push(namber);
                namber++
            }
        }
        let barColors = props.storedData.colorSecond;
        new Chart(ctx3, {
            type: "horizontalBar",
            data: {
                labels: xValues,
                datasets: [{
                    backgroundColor: barColors,
                    data: props.yValuesSec3
                }]
            },
            options: {
                legend: { display: false },
                title: {
                    display: true,
                    text: `${props.names[1].name}`,
                    fontSize: 20
                },
                scales: {
                    xAxes: [{ ticks: { min: 0 } }]
                }
            }
        });
    }


    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: 'solid', borderBottomColor: 'darkgrey', margin: 'auto', width: 1240, height: 470 }}>
            <div id='sec'>
                <div class="chart-container" style={{ position: 'relative', width: '100vh' }}>
                    <canvas id="Chart2" style={{ marginRight: '111px', marginLeft: 0 }}></canvas>
                </div>
                <div class="chart-container" style={{ position: 'relative', width: '100vh' }}>
                    <canvas id="Chart3" style={{ marginRight: '111px', marginLeft: 0 }}></canvas>
                </div>

            </div>
        </Box>
    )
}

export default Chart2;
