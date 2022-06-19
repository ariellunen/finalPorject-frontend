import React, { useEffect, useState } from 'react';
import './DrawDetails.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Recovery from '../component/Recovery';
import NavLink from '../../user/components/NavLinks';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chart1 from '../component/Chart1';
import Chart2 from '../component/Chart2';
import Chart3 from '../component/Chart3';
let yValuesSec2 = [];
let sec2;
let yValuesSec3 = [];
let sec3;

let a, b, c, d, e, f;

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
    const storedData = JSON.parse(localStorage.getItem('Item'));
    const names = JSON.parse(localStorage.getItem('Names'));

    useEffect(() => {
        yValuesSec2 = [];
        yValuesSec3 = [];
        for (let i = 0; i < storedData.secondsL.length; i++) {
            yValuesSec2.push(storedData.secondsL[i]);
            console.log(storedData.secondsL[i], yValuesSec2)

        }
        sec2 = yValuesSec2.length;
        for (let i = 0; i < storedData.secondsR.length; i++) {
            yValuesSec3.push(storedData.secondsR[i]);
        }
        sec3 = yValuesSec3.length;
        console.log(storedData)

        PaintBrushL();
        PaintBrushR();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            default:
                a = "rgba(169, 72, 255, 1)";
                b = "rgba(195, 127, 255, 0.85)";
                c = "rgba(206, 176, 244, 0.46)";
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
            default:
                a = "rgba(169, 72, 255, 1)";
                b = "rgba(195, 127, 255, 0.85)";
                c = "rgba(206, 176, 244, 0.46)";
                break;
        }
    }
    const [line, setLine] = useState('outlined')
    const [touch, setTouch] = useState('outlined')
    const [replay, setReplay] = useState('outlined')
    const [sync, setSync] = useState('contained')

    const handleClick = (e) => {
        console.log(e.target.id)
        if (e.target.id === 'sync') {
            setLine('outlined')
            setTouch('outlined')
            setReplay('outlined')
            setSync('contained')
        } else if (e.target.id === 'line') {
            setLine('contained')
            setTouch('outlined')
            setReplay('outlined')
            setSync('outlined')
        }
        else if (e.target.id === 'replay') {
            setLine('outlined')
            setTouch('outlined')
            setReplay('contained')
            setSync('outlined')
        } else {
            setLine('outlined')
            setTouch('contained')
            setReplay('outlined')
            setSync('outlined')
        }
    }

    return (
        <React.Fragment >
            <NavLink />
            <Stack spacing={2} dir='ltr'>
                <Breadcrumbs
                    sx={{ marginTop: 1, marginLeft: 3 }}
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                >
                    {breadcrumbs}
                </Breadcrumbs>
            </Stack>
            <div style={{ width: 1240, margin: '0 auto' }}>
                <Stack sx={{ marginLeft: '10px' }} direction="row">
                    <Button id='sync' onClick={handleClick} sx={{ borderTopLeftRadius: '15px', marginLeft: '10px', borderTopRightRadius: '15px', borderBottomLeftRadius: '0px', borderBottomRightRadius: '0px' }} variant={sync}>תדירות \ סנכרון</Button>
                    <Button id='touch' onClick={handleClick} sx={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px', borderBottomLeftRadius: '0px', borderBottomRightRadius: '0px', marginLeft: '10px', }} variant={touch}>נגיעות במסך</Button>
                    <Button id='line' onClick={handleClick} sx={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px', borderBottomLeftRadius: '0px', borderBottomRightRadius: '0px', marginLeft: '10px', }} variant={line}>עובי קו</Button>
                    <Button id='replay' onClick={handleClick} sx={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px', borderBottomLeftRadius: '0px', borderBottomRightRadius: '0px', marginLeft: '10px', }} variant={replay}>שחזור</Button>
                </Stack>
                <Box dir='ltr' component="main" sx={{ display: 'flex', placeContent: 'center' }}>
                    <Box sx={{ bgcolor: 'white', textAlignLast: 'center', width: 1240, height: 470, borderRight: '1px solid lightgrey', borderTop: '1px solid #1976d2', borderLeft: '1px solid lightgrey', borderBottom: '1px solid lightgrey', textAlign: '-webkit-center' }}>
                        {replay === 'contained' && <Recovery storedData={storedData} />}
                        {sync === 'contained' && <Chart1 names={names} storedData={storedData} />}
                        {touch === 'contained' && <Chart2 names={names} storedData={storedData} yValuesSec3={yValuesSec3} yValuesSec2={yValuesSec2} sec2={sec2} sec3={sec3} />}
                        {line === 'contained' && <Chart3 names={names} storedData={storedData} a={a} b={b} c={c} e={e} d={d} f={f} />}
                    </Box>
                </Box>
            </div>
            <Box dir='ltr' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
            </Box>
        </React.Fragment>
    );
}

export default DrawDetails;