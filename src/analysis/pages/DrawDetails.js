import React, { useEffect, useState } from 'react';
import Chart from 'chart.js';
import './DrawDetails.css';
import { fontSize } from '@mui/material/node_modules/@mui/system';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import { Link } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import { useLocation } from 'react-router-dom';
import Recovery from '../component/Recovery';
import NavLink from '../../user/components/NavLinks';
import ReplayIcon from '@mui/icons-material/Replay';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from "@material-ui/core/IconButton";

let ctx1;
let ctx2;
let ctx3;
let ctx4;
let ctx5;

let yValuesSec2 = [];
let sec2;
let yValuesSec3 = [];
let sec3;

let a, b, c, d, e, f;

let counterTotal;

const breadcrumbs = [
    <Typography key="1" color="text.primary" component={Link} to='/'>
        תפריט ראשי
    </Typography>,
    <Typography key="2" color="text.primary" component={Link} to='/analysis'>
        כל הציורים
    </Typography>,
    <Typography key="3" color="text.primary">
        ניתוח הציור
    </Typography>,
];

const DrawDetails = (props) => {
    console.log(props.data);
    console.log(props.index);
    const location = useLocation();
    const data = location;
    const storedData = JSON.parse(localStorage.getItem('Item'));
    const Names = JSON.parse(localStorage.getItem('Names'));
    console.log(storedData);

    useEffect(() => {
        for (let i = 0; i < storedData.secondsL.length; i++) {
            yValuesSec2.push(storedData.secondsL[i]);
        }
        sec2 = yValuesSec2.length;
        for (let i = 0; i < storedData.secondsL.length; i++) {
            yValuesSec3.push(storedData.secondsR[i]);
        }
        sec3 = yValuesSec3.length;
        PaintBrushL();
        PaintBrushR();

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

    const PaintBrushL = () => {
        switch (storedData.colorFirst) {
            case 'DarkViolet':
                a = "rgba(169, 72, 255, 1)";
                b = "rgba(195, 127, 255, 0.85)";
                c = "rgba(206, 176, 244, 0.46)";
                break;
            case 'pink':
                a = "rgba(255, 72, 173, 1)";
                b = "rgba(255, 44, 160, 0.46)";
                c = "rgba(253, 130, 198, 0.46)";
                break;
            case 'orange':
                a = "rgba(255, 140, 0, 1)";
                b = "rgba(255, 209, 81, 1)";
                c = "rgba(255, 212, 91, 0.46)";
                break;
            case 'LightSkyBlue':
                a = "rgba(0, 222, 227, 1)";
                b = "rgba(0, 222, 227, 0.46)";
                c = "rgba(108, 252, 255, 0.57)";
                break;
            case 'LimeGreen':
                a = "rgba(11, 185, 0, 1)";
                b = "rgba(11, 185, 0, 0.47)";
                c = "rgba(11, 185, 0, 0.33)";
                break;
            case 'red':
                a = "rgba(225, 0, 0, 1)";
                b = "rgba(255, 0, 0, 0.85)";
                c = "rgba(255, 0, 0, 0.57)";
                break;
            case 'Sienna':
                a = "rgba(86, 0, 0, 0.78)";
                b = "rgba(86, 0, 0, 0.58)";
                c = "rgba(86, 0, 0, 0.38)";
                break;
            case 'blue':
                a = "rgba(22, 0, 145, 1)";
                b = "rgba(22, 0, 145, 0.68)";
                c = "rgba(22, 0, 145, 0.38)";
                break;
            case 'Yellow':
                a = "rgba(255, 234, 0, 1)";
                b = "rgba(255, 234, 0, 0.57)";
                c = "rgba(255, 234, 0, 0.35)";
                break;
        }
    }
    const PaintBrushR = () => {
        switch (storedData.colorSecond) {
            case 'DarkViolet':
                d = "rgba(169, 72, 255, 1)";
                e = "rgba(195, 127, 255, 0.85)";
                f = "rgba(206, 176, 244, 0.46)";
                break;
            case 'pink':
                d = "rgba(255, 72, 173, 1)";
                e = "rgba(255, 44, 160, 0.46)";
                f = "rgba(253, 130, 198, 0.46)";
                break;
            case 'orange':
                d = "rgba(255, 140, 0, 1)";
                e = "rgba(255, 209, 81, 1)";
                f = "rgba(255, 212, 91, 0.46)";
                break;
            case 'LightSkyBlue':
                d = "rgba(0, 222, 227, 1)";
                e = "rgba(0, 222, 227, 0.46)";
                f = "rgba(108, 252, 255, 0.57)";
                break;
            case 'LimeGreen':
                d = "rgba(11, 185, 0, 1)";
                e = "rgba(11, 185, 0, 0.47)";
                f = "rgba(11, 185, 0, 0.33)";
                break;
            case 'red':
                d = "rgba(225, 0, 0, 1)";
                e = "rgba(255, 0, 0, 0.85)";
                f = "rgba(255, 0, 0, 0.57)";
                break;
            case 'Sienna':
                d = "rgba(86, 0, 0, 0.78)";
                e = "rgba(86, 0, 0, 0.58)";
                f = "rgba(86, 0, 0, 0.38)";
                break;
            case 'blue':
                d = "rgba(22, 0, 145, 1)";
                e = "rgba(22, 0, 145, 0.68)";
                f = "rgba(22, 0, 145, 0.38)";
                break;
            case 'Yellow':
                d = "rgba(255, 234, 0, 1)";
                e = "rgba(255, 234, 0, 0.57)";
                f = "rgba(255, 234, 0, 0.35)";
                break;
        }
    }

    const Chart1 = () => {
        let xValues = [];
        let child1 = [];
        let child2 = [];
        let arrLx = [];
        let arrRx = [];
        let arrLy = [];
        let arrRy = [];
        for (let i = 0; i < storedData.changesL.length; i++) {
            arrLx.push(storedData.changesL[i].time);
            arrLy.push(storedData.changesL[i].change);
        }
        for (let i = 0; i < storedData.changesR.length; i++) {
            arrRx.push(storedData.changesR[i].time);
            arrRy.push(storedData.changesR[i].change);
        }
        console.log(arrLx);
        console.log(arrRx);
        console.log(arrLy);
        console.log(arrRy);

        let counterL = 1;
        let counterR = 1;
        for (let i = 0; i < arrLx.length - 1; i++) {
            if (arrLx[i] != arrLx[i + 1]) { counterL++ }
        }
        for (let i = 0; i < arrRx.length - 1; i++) {
            if (arrRx[i] != arrRx[i + 1]) { counterR++ }
        }
        if (arrLy.length === 0) { counterL = 0 }
        if (arrRy.length === 0) { counterR = 0 }
        counterTotal = counterR + counterL;

        let arrayR = [];
        for (let i = 1; i < 21; i++) {
            let x = arrRx.filter((v) => (v === i)).length;
            arrayR.push(x)
        }

        let arrayL = [];
        for (let i = 1; i < 21; i++) {
            let x = arrLx.filter((v) => (v === i)).length;
            arrayL.push(x)
        }
        console.log(arrayL);
        console.log(arrayR);

        for (let i = 0; i < 20; i++) {
            if (arrayL[i] !== 0 || arrayR[i] !== 0) {
                if (arrayL[i] && arrayR[i]) {
                    counterTotal--;
                }
            }
        }

        for (let i = 0; i < storedData.secondTotal; i++) {
            child1.push(i);
        } for (let i = 0; i < storedData.secondTotal; i++) {
            child2.push(i);
        }

        // child1 = [1.5, 2.7, 0, 0, 2.3, 6.5, 4.2, 0, 1.5, 5.2, 0, 0, 0, 1, 2, 3.2, 3.2, 1.5, 1.5, 0.2, 1.5, 2.7, 0, 0, 2.3, 6.5, 4.2, 0, 1.5, 5.2, 0, 0, 0, 1, 2, 3.2, 3.2, 1.5, 1.5, 0.2]
        // child2 = [0.3, 0, 0, 5.2, 1.2, 6.3, 2.4, 0, 0, 1.2, 1.5, 1.9, 3.7, 6.7, 0, 0, 2.9, 6.7, 0, 1.3, 0.3, 0, 0, 5.2, 1.2, 6.3, 2.4, 0, 0, 1.2, 1.5, 1.9, 3.7, 6.7, 0, 0, 2.9, 6.7, 0, 1.3]
        // new Chart(ctx1, {
        //     type: "line",
        //     data: {
        //         labels: xValues,
        //         datasets: [{
        //             label: Names[1],
        //             data: child1,
        //             borderColor: storedData.colorFirst,
        //             fill: true,
        //         }, {
        //             label: Names[0],
        //             data: child2,
        //             borderColor: storedData.colorSecond,
        //             fill: false
        //         }]
        //     },
        //     options: {
        //         legend: { display: true },
        //         title: {
        //             display: true,
        //             text: `סנכרון בין ${Names[0]} לבין ${Names[1]}`,
        //             fontSize: 20
        //         }
        //     }
        // });

        new Chart(ctx1, {
            type: "scatter",
            data: {
                datasets: [{
                    label: Names[1],
                    pointRadius: 4,
                    pointBackgroundColor: storedData.colorFirst,
                    data: storedData.changesL
                }, {
                    label: Names[0],
                    pointRadius: 6,
                    pointBackgroundColor: storedData.colorSecond,
                    data: storedData.changesR
                }]
            },
            options: {
                legend: { display: true },
                legend: { display: true },
                title: {
                    display: true,
                    text: `זמן הצביעה בין ${Names[0]} לבין ${Names[1]} נמשך ${storedData.secondTotal} שניות `,
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
        let barColors = storedData.colorFirst;
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
                    text: `משך זמן לחיצה ${Names[1]}`,
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
        let barColors = storedData.colorSecond;
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
                    text: `משך זמן לחיצה ${Names[0]}`,
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
        let barColors = [a, b, c];
        console.log(barColors);

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
                    text: `עובי קו ${Names[1]}`,
                    fontSize: 20
                }
            }

        });
    }
    const Chart5 = () => {
        let xValues = ["עבה", "רגיל", "דק"];
        let yValues = [5.9, 10, 14];
        let barColors = [d, e, f];
        console.log(barColors);

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
                    text: `עובי קו ${Names[0]}`,
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
            <NavLink />
            <Stack spacing={2} >
                <Breadcrumbs
                    sx={{ marginTop: 1, marginLeft: 3 }}
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                >
                    {breadcrumbs}
                </Breadcrumbs>
            </Stack>
            <CardActions>
                <IconButton xs={{ marginTop: 100 }}>
                    <ReplayIcon onClick={handleOpen} fontSize={'large'} />
                </IconButton>
                {/* <Button variant="outlined" onClick={handleOpen}>שחזור</Button> */}
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Recovery storedData={storedData} />

                </Modal>
            </CardActions>
            <div style={{display: 'flex' }}>
            <div id='graphs'>
                <div id='cync'>
                    <canvas id="Chart1"></canvas>
                </div>
                <div id='sec'>
                    <canvas id="Chart3"></canvas>
                    <canvas id="Chart2"></canvas>
                </div>
                <div id='lineWidth'>
                    <canvas id="Chart5"></canvas>
                    <canvas id="Chart4"></canvas>
                </div>
            </div>
            {/* <div style={{backgroundColor: 'red', width: '100px', height: 100}}></div> */}
            </div>
        </React.Fragment>
    );
}

export default DrawDetails;