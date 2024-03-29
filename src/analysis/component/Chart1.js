import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chart from 'chart.js';
let ctx1;

const Chart1 = (props) => {
    useEffect(() => {
        chart1()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let chart1 = () => {
        ctx1 = document.getElementById('Chart1').getContext('2d');
        let xValues = [];
        let child1 = [];
        let child2 = [];
        let arrLx = [];
        let arrRx = [];
        let tempL = 0;
        let tempR = 0;

        for (let i = 0; i < props.storedData.changesL.length; i++) { arrLx.push(props.storedData.changesL[i].x); }
        for (let i = 0; i < props.storedData.changesR.length; i++) { arrRx.push(props.storedData.changesR[i].x); }

        let avgL, avgR;
        let arrayL = [], arrayR = [];
        let totalL, totalR;

        for (let i = 0; i < props.storedData.secondTotal; i++) {
            let x = arrLx.filter((v) => (v === i)).length;
            avgL = 0;
            if (x !== 0) {
                totalL = 0;
                for (let j = 0; j < props.storedData.changesL.length; j++) {
                    if (props.storedData.changesL[j].x === i) {
                        let number = Number(props.storedData.changesL[j].y)
                        totalL += number;
                    }
                }
                avgL = (totalL / x).toFixed(2);
                tempL = avgL;
                arrayL.push({ ces: i, change: x, avg: avgL });

            }
            else {
                arrayL.push({ ces: i, change: 1, avg: tempL / 2 });
            }
        }

        for (let i = 0; i < props.storedData.secondTotal; i++) {
            let x = arrRx.filter((v) => (v === i)).length;
            avgR = 0;
            if (x !== 0) {
                totalR = 0;
                for (let j = 0; j < props.storedData.changesR.length; j++) {
                    if (props.storedData.changesR[j].x === i) {
                        let number = Number(props.storedData.changesR[j].y)
                        totalR += number;
                    }
                }
                avgR = (totalR / x).toFixed(2);
                tempR = avgR;
                arrayR.push({ ces: i, change: x, avg: avgR });
            }
            else {
                arrayR.push({ ces: i, change: 1, avg: tempR / 2 });
            }
        }

        let cync = [];
        for (let i = 0; i < arrayL.length; i++) {
            child1.push(Number(arrayL[i].avg));
            child2.push(Number(arrayR[i].avg));
            if (((Math.abs(child1[i] - child2[i])) < 2) && ((child1[i] !== 0) && (child2[i] !== 0))) {
                if (child1[i] >= child2[i]) {
                    cync.push(child1[i])
                }
                else { cync.push(child2[i]) }
            }
            else { cync.push(0) }

        }
        for (let i = 0; i < props.storedData.secondTotal; i++) {
            xValues.push(i)
        }
        new Chart(ctx1, {
            type: "line",
            data: {
                labels: xValues,
                datasets: [{
                    label: 'ראה מקומות סנכרון',
                    data: cync,
                    fill: true
                }, {
                    label: props.names[0].name,
                    data: child1,
                    borderColor: props.storedData.colorFirst,
                    fill: false,
                }, {
                    label: props.names[1].name,
                    data: child2,
                    borderColor: props.storedData.colorSecond,
                    fill: false
                }]
            },
            options: {
                legend: { display: true },
                title: {
                    display: true,
                    text: `זמן הצביעה בין ${props.names[0].name} לבין ${props.names[1].name} נמשך ${props.storedData.secondTotal} שניות `,
                    fontSize: 20
                }
            }
        });
    }

    const printOnPage = () => {
        window.print();
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: 'solid', borderBottomColor: 'transparent', }}>
            <Button sx={{ marginTop: "auto" }} onClick={printOnPage}>הדפסה</Button>
            <div id='cync' style={{ margin: '0 auto' }}>
                <canvas id="Chart1"></canvas>
            </div>
        </Box>
    )
}

export default Chart1;
