import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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
        let a = 0, b = 0, c = 0;
        let counX = 0, counY = 0, counZ = 0;
        for (let i = 0; i < props.storedData.coordinate.length; i++) {
            if (props.storedData.coordinate[i].l.x !== -1) {
                if (props.storedData.coordinate[i].l.line === 20) { counX++ }
                else if (props.storedData.coordinate[i].l.line === 12) { counY++ }
                else if (props.storedData.coordinate[i].l.line === 4) { counZ++ }
            }
        }

        let totalL = counX + counY + counZ;
        a = ((100 * counX) / totalL).toFixed(3);
        b = ((100 * counY) / totalL).toFixed(3);
        c = ((100 * counZ) / totalL).toFixed(3);

        let xValues = ["עבה", "רגיל", "דק"];
        let yValues = [a, b, c];
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
        let counXr = 0, counYr = 0, counZr = 0;
        for (let i = 0; i < props.storedData.coordinate.length; i++) {
            if (props.storedData.coordinate[i].r.x !== -1) {
                if (props.storedData.coordinate[i].r.line === 20) { counXr++ }
                else if (props.storedData.coordinate[i].r.line === 12) { counYr++ }
                else if (props.storedData.coordinate[i].r.line === 4) { counZr++ }
            }
        }

        let totalR = counXr + counYr + counZr;
        x = ((100 * counXr) / totalR).toFixed(3);
        y = ((100 * counYr) / totalR).toFixed(3);
        z = ((100 * counZr) / totalR).toFixed(3);

        let xValues = ["עבה", "רגיל", "דק"];
        let yValuesR = [x, y, z];
        let barColors = [props.d, props.e, props.f];

        new Chart(ctx5, {
            type: "doughnut",
            data: {
                labels: xValues,
                datasets: [{
                    backgroundColor: barColors,
                    data: yValuesR
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

    const printOnPage = () => {
        window.print();
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: 'auto', width: 1240, height: 470 }}>
            <Button sx={{ marginTop: "auto" }} onClick={printOnPage}>הדפסה</Button>
            <div id='lineWidth'>
                <div class="chart-container" style={{ position: 'relative', width: '120vh' }}>
                    <canvas id="Chart4" style={{ marginRight: '111px', marginLeft: '-171px' }}></canvas>
                </div>
                <div class="chart-container" style={{ position: 'relative', width: '120vh' }}>
                    <canvas id="Chart5" style={{ marginRight: '111px', marginLeft: '-171px' }}></canvas>
                </div>
            </div>
        </Box>
    )
}

export default Chart3;
