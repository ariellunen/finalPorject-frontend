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
import Box from '@mui/material/Box';

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
    console.log('jiiiii')
    const storedData = JSON.parse(localStorage.getItem('Item'));
    const names = JSON.parse(localStorage.getItem('Names'));

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

        //מפריד את המערך של התדירות לציר של תדירויות וציר של שניות
        for (let i = 0; i < storedData.changesL.length; i++) { arrLx.push(storedData.changesL[i].x); }
        for (let i = 0; i < storedData.changesR.length; i++) { arrRx.push(storedData.changesR[i].x); }

        let avgL, avgR;
        let arrayL = [], arrayR = [];
        let totalL, totalR;

        for (let i = 0; i < storedData.secondTotal; i++) {
            let x = arrLx.filter((v) => (v === i)).length;
            avgL = 0;
            if (x != 0) {
                totalL = 0;
                for (let j = 0; j < storedData.changesL.length; j++) {
                    if (storedData.changesL[j].x === i) {
                        let number = Number(storedData.changesL[j].y)
                        totalL += number;
                    }
                }
                avgL = (totalL / x).toFixed(2);
            }
            arrayL.push({ ces: i, change: x, avg: avgL });
        }

        for (let i = 0; i < storedData.secondTotal; i++) {
            let x = arrRx.filter((v) => (v === i)).length;
            avgR = 0;
            if (x != 0) {
                totalR = 0;
                for (let j = 0; j < storedData.changesR.length; j++) {
                    if (storedData.changesR[j].x === i) {
                        let number = Number(storedData.changesR[j].y)
                        totalR += number;
                    }
                }
                avgR = (totalR / x).toFixed(2);
            }
            arrayR.push({ ces: i, change: x, avg: avgR });
        }

        let cync = [];
        for (let i = 0; i < arrayL.length; i++) {
            child1.push(arrayL[i].avg);
            child2.push(arrayR[i].avg);
            if (((Math.abs(arrayL[i].avg - arrayR[i].avg)) < 2) && ((arrayL[i].avg != 0) && (arrayR[i].avg !== 0))) {
                if (arrayL[i].avg > arrayR[i].avg) {
                    cync.push(arrayL[i].avg)
                }
                else { cync.push(arrayR[i].avg) }
            }
            else { cync.push(0) }
        }

        //ציר האיקס עבור זמן השניות הכולל
        for (let i = 0; i < storedData.secondTotal; i++) {
            xValues.push(i)
        }

        //מילוי נקודות הסנכרון
        new Chart(ctx1, {
            type: "line",
            data: {
                labels: xValues,
                datasets: [{
                    label: 'ראה מקומות סנכרון',
                    data: cync,
                    fill: true
                }, {
                    label: names[0].name,
                    data: child1,
                    borderColor: storedData.colorFirst,
                    fill: false,
                }, {
                    label: names[1].name,
                    data: child2,
                    borderColor: storedData.colorSecond,
                    fill: false
                }]
            },
            options: {
                legend: { display: true },
                title: {
                    display: false,
                    text: `זמן הצביעה בין ${names[0].name} לבין ${names[1].name} נמשך ${storedData.secondTotal} שניות `,
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
                    text: `${names[0].name}`,
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
                    text: `${names[1].name}`,
                    fontSize: 20
                },
                scales: {
                    xAxes: [{ ticks: { min: 0 } }]
                }
            }
        });
    }
    const Chart4 = () => {
        let x = 0, y = 0, z = 0;
        let counX = 0, counY = 0, counZ = 0;
        for (let i = 0; i < storedData.coordinate.length; i++) {
            if (storedData.coordinate[i].l.line === '20') { counX++ }
            else if (storedData.coordinate[i].l.line === '12') { counY++ }
            else if (storedData.coordinate[i].l.line === '4') { counZ++ }
        }
        x = ((100 * counX) / storedData.coordinate.length).toFixed(3);
        y = ((100 * counY) / storedData.coordinate.length).toFixed(3);
        z = ((100 * counZ) / storedData.coordinate.length).toFixed(3);

        let xValues = ["עבה", "רגיל", "דק"];
        let yValues = [x, y, z];
        let barColors = [a, b, c];

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
                    text: `עובי קו ${names[0]}`,
                    fontSize: 20
                }
            }

        });
    }
    const Chart5 = () => {
        let x = 0, y = 0, z = 0;
        let counX = 0, counY = 0, counZ = 0;
        for (let i = 0; i < storedData.coordinate.length; i++) {
            if (storedData.coordinate[i].r.line === '20') { counX++ }
            else if (storedData.coordinate[i].r.line === '12') { counY++ }
            else if (storedData.coordinate[i].r.line === '4') { counZ++ }
        }
        x = ((100 * counX) / storedData.coordinate.length).toFixed(3);
        y = ((100 * counY) / storedData.coordinate.length).toFixed(3);
        z = ((100 * counZ) / storedData.coordinate.length).toFixed(3);

        let xValues = ["עבה", "רגיל", "דק"];
        let yValues = [x, y, z];
        let barColors = [d, e, f];

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
                    text: `עובי קו ${names[1]}`,
                    fontSize: 20
                }
            }
        });
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    console.log(names[0].name)
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
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
                <Typography variant="h4" sx={{ margin: 'auto' }}>זמן הצביעה בין {names[0].name} לבין {names[1].name} נמשך {storedData.secondTotal} שניות</Typography>
                <CardActions>
                    <IconButton>
                        <ReplayIcon fill={'black'} onClick={handleOpen} sx={{ height: '100px', width: '100px' }} />
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
            </Box>
            {/* <div style={{ display: 'flex'  }}> */}
            <div style={{ width: '100%' }}>
                {/* <Typography variant="h3" component="div">{firstKide} ו{secondKide}</Typography> */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: 'solid', borderBottomColor: 'darkgrey', margin: 'auto' }}>
                    <div id='cync'>
                        <canvas id="Chart1"></canvas>
                    </div>
                    <Typography variant="h4">תדירות וסנכרון</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between', borderBottom: 'solid', borderBottomColor: 'darkgrey', margin: 'auto' }}>
                    <div id='sec'>
                        <canvas id="Chart2"></canvas>
                        <canvas id="Chart3"></canvas>
                    </div>
                    <Typography variant="h4" >מספר נגיעות במסך</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: 'solid', borderBottomColor: 'darkgrey', margin: 'auto' }}>
                    <div id='lineWidth'>
                        <canvas id="Chart4"></canvas>
                        <canvas id="Chart5"></canvas>
                    </div>
                    <Typography variant="h4" >עובי קו</Typography>
                </Box>
            </div>
            {/* <div style={{backgroundColor: 'red', width: '100px', height: 100}}></div> */}
            {/* </div> */}
        </React.Fragment>
    );
}

export default DrawDetails;