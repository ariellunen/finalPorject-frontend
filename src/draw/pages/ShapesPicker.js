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
let child = [];
let temp;
let temp_element;
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

    const handleShape = (shape, url) => {
        selectedShape = shape;
        sessionStorage.setItem("selectedShape", selectedShape);
        urlShape = url;
        console.log(urlShape)

    }
    const usersData = [
        { name: '', color: '' },
        { name: '', color: '' },
    ]

    const [users, setUsers] = useState(usersData);
    const [isReady, setIsReady] = useState(false);
    const [firstColor, setFirstColor] = useState(null);
    const [SecondColor, setSecondColor] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            fetchAPI();
        }, 2000);
    }, []);

    const fetchAPI = async () => {
        first = JSON.parse(localStorage.getItem('firstKide'));
        second = JSON.parse(localStorage.getItem('secondtKide'));
        console.log("first", first.name)
        console.log("Child", first, second)
        setIsReady(true);
    }

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
            {isReady && first.name !== undefined && <Box component="main" sx={{ display: 'flex', marginTop: '8px', placeContent: 'center' }}>
                <Box sx={{ textAlignLast: 'center', width: 1240, height: 470, borderTop: 'solid', borderRight: 'solid', borderLeft: 'solid', borderBottom: 'solid', textAlign: '-webkit-center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ width: 50, height: 50 }} alt={first.name} src={`http://localhost:3000/${first.image}`} />
                        <Typography>{first.name}</Typography>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography>{second.name}</Typography>
                        <Avatar sx={{ width: 50, height: 50 }} alt={second.name} src={`http://localhost:3000/${second.image}`} />
                        </div>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', placeContent: 'center', justifyContent: 'space-evenly', marginTop: 8 }}>
                        <Shapes handleShape={handleShape} />
                    </Box>
                </Box>
            </Box>}
            {selectedShape === null && <Button disabled component={Link} to="/drawing/coloring" sx ={{right: '5px', position: 'absolute'}}>המשך</Button>}
            {selectedShape !== null && <Button type='submit' component={Link} to="/drawing/coloring" sx ={{right: '5px', position: 'absolute'}}>המשך</Button>}

            {!isReady && <CircularProgress />}

        </React.Fragment>
    )
};

export default ShapesPicker;