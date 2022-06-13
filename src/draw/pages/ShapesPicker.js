import React, { useState, useEffect } from 'react';
import ColorsLeft from '../component/Colors';
import Colors from '../component/Colors';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import NavLink from '../../user/components/NavLinks';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import { useLocation } from 'react-router-dom';
import Shapes from '../component/Shapes';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
let child = [];
let first, second;
let urlShape;
const breadcrumbs = [
    <Typography key="1" color="text.primary" component={Link} to='/'>
        תפריט ראשי
    </Typography>,
    <Typography key="2" color="text.primary" component={Link} to='/form'>
        בחירת ילדים
    </Typography>,
    <Typography key="2" color="text.primary" component={Link} to='/drawing/color'>
        בחירת צבע
    </Typography>,
    <Typography key="3" color="text.primary">
        בחירת צורה
    </Typography>,
];

let selectedShape;
const ShapesPicker = (props) => {
    const location = useLocation();
    const history = useHistory();
    const [counter, setCounter] = useState(0);
    const [shape, setShape] = useState(null);

    const handleShape = (shape, url) => {
        selectedShape = shape;
        setShape(shape)
        sessionStorage.setItem("selectedShape", selectedShape);
        urlShape = url;

    }
    const usersData = [
        { name: '', color: '' },
        { name: '', color: '' },
    ]

    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            fetchAPI();
        }, 2000);
    }, []);

    const fetchAPI = async () => {
        first = JSON.parse(localStorage.getItem('firstKide'));
        second = JSON.parse(localStorage.getItem('secondKide'));
        console.log("first", first.name)
        console.log("Child", first, second)
        setIsReady(true);
    }

    return (
        <React.Fragment>
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
            {!isReady && <CircularProgress sx={{ position: 'fixed', top: '50%', left: '50%', height: '100px', width: '100px' }} />}
            {isReady && first.name !== undefined && <Box dir='ltr' component="main" sx={{ display: 'flex', marginTop: '8px', placeContent: 'center' }}>
                <Box sx={{bgcolor: 'white', textAlignLast: 'center', width: 1240, height: 470, borderTop: 'solid', borderRight: 'solid', borderLeft: 'solid', borderBottom: 'solid', textAlign: '-webkit-center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ alignItems: 'center' }}>
                            <Avatar sx={{ width: 50, height: 50, marginLeft: '10px' }} alt={first.name} src={`http://localhost:3000/${first.image}`} />
                            <Typography sx={{ marginLeft: '10px' }}>{first.name}</Typography>
                        </div>
                        <div style={{ alignItems: 'center' }}>
                            <Avatar sx={{ width: 50, height: 50, marginLeft: '10px' }} alt={second.name} src={`http://localhost:3000/${second.image}`} />
                            <Typography sx={{ marginLeft: '10px' }}>{second.name}</Typography>
                        </div>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', placeContent: 'center', justifyContent: 'space-evenly', marginTop: 8 }}>
                        <Shapes handleShape={handleShape} />
                    </Box>
                </Box>
                {shape === null && <Button sx={{ right: '5px', position: 'absolute', bottom: '4px' }} type='submit' disabled endIcon={<ArrowRightAltIcon sx={{ marginLeft: '-30px', height: '30px', width: '80px' }} />}>המשך</Button>}
                {shape !== null && <Button endIcon={<ArrowRightAltIcon sx={{ marginLeft: '-30px', height: '30px', width: '80px' }} />} sx={{ right: '5px', position: 'absolute', bottom: '4px' }} type='submit' component={Link} to="/drawing/coloring" >המשך</Button>}
            </Box>}

        </React.Fragment>
    )
};

export default ShapesPicker;