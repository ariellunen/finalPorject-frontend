import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Chart from 'chart.js';
let ctx5;
let ctx4;

const Chart3 = (props) => {
    useEffect(() => {
        ctx4 = document.getElementById('Chart4').getContext('2d');
        ctx5 = document.getElementById('Chart5').getContext('2d');
        chart5()
        chart4()
    }, [])

    const chart4 = () => {
        let x = 0, y = 0, z = 0;
        let counX = 0, counY = 0, counZ = 0;
        for (let i = 0; i < props.storedData.coordinate.length; i++) {
            if (props.storedData.coordinate[i].l.line === 20 && props.storedData.coordinate[i].l.x !== -1 && props.storedData.coordinate[i].l.y !== -1) {
                console.log(props.storedData.coordinate[i].l.line)
                counX++
            }
            else if (props.storedData.coordinate[i].l.line === 12) {
                console.log(props.storedData.coordinate[i].l.line)

                counY++
            }
            else if (props.storedData.coordinate[i].l.line === 4) {
                console.log(props.storedData.coordinate[i].l.line)
                counZ++
            }
        }

        console.log('20 - 45 times', counY)
        console.log('12 - 25', counX)
        console.log('4 - 125', counZ, props.storedData.coordinate.length)
        x = ((100 * counX) / props.storedData.coordinate.length).toFixed(3);
        y = ((100 * counY) / props.storedData.coordinate.length).toFixed(3);
        z = ((100 * counZ) / props.storedData.coordinate.length).toFixed(3);

        let xValues = ["עבה", "רגיל", "דק"];
        let yValues = [x, y, z];
        let barColors = [props.a, props.b, props.c];

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
                    display: false,
                    text: `עובי קו ${props.names[0]}`,
                    fontSize: 20
                }
            }

        });
    }

    const chart5 = () => {
        let x = 0, y = 0, z = 0;
        let counX = 0, counY = 0, counZ = 0;
        for (let i = 0; i < props.storedData.coordinate.length; i++) {
            if (props.storedData.coordinate[i].r.line === 20) { counX++ }
            else if (props.storedData.coordinate[i].r.line === 12) { counY++ }
            else if (props.storedData.coordinate[i].r.line === 4) { counZ++ }
        }
        x = ((100 * counX) / props.storedData.coordinate.length).toFixed(3);
        y = ((100 * counY) / props.storedData.coordinate.length).toFixed(3);
        z = ((100 * counZ) / props.storedData.coordinate.length).toFixed(3);

        let xValues = ["עבה", "רגיל", "דק"];
        let yValues = [x, y, z];
        let barColors = [props.d, props.e, props.f];

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
                    display: false,
                    text: `עובי קו ${props.names[1]}`,
                    fontSize: 20
                }
            }
        });
    }


    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: 'auto', width: 1240, height: 470 }}>
            <div id='lineWidth'>
                <div class="chart-container" style={{ position: 'relative',  width: '120vh' }}>
                    <canvas id="Chart4"  style={{ marginRight: '111px',  marginLeft: '-171px' }}></canvas>
                </div>
                <div class="chart-container" style={{ position: 'relative', width: '120vh' }}>
                    <canvas id="Chart5" style={{ marginRight: '111px',  marginLeft: '-171px' }}></canvas>
                </div>
            </div>
        </Box>
    )
}

export default Chart3;
