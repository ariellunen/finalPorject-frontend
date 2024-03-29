import React, { useState, useEffect } from 'react';
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
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
let first, second;
let urlFirst, urlSecond;
const breadcrumbs = [
    <Typography key="1" color="text.primary" component={Link} to='/'>
        תפריט ראשי
    </Typography>,
    <Typography key="2" color="text.primary" component={Link} to='/form'>
        בחירת ילדים
    </Typography>,
    <Typography key="2" color="text.primary">
        בחירת צבע
    </Typography>,
];
const ColorPicker = (props) => {
    const usersData = [
        { name: '', color: '' },
        { name: '', color: '' },
    ]

    const [users, setUsers] = useState(usersData);
    const [isReady, setIsReady] = useState(false);
    const history = useHistory();
    const [firstColor, setFirstColor] = useState(null);
    const [SecondColor, setSecondColor] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            fetchAPI();
        }, 2000);
    }, []);

    const fetchAPI = async () => {
        first = JSON.parse(localStorage.getItem('firstKide'));
        second = JSON.parse(localStorage.getItem('secondKide'));
        setIsReady(true);
    }
    const handleColor = (color, type, url) => {
        if (type === 'first') {
            if (SecondColor !== null && SecondColor === color) { }
            else {
                setFirstColor(color)
                urlFirst = url;
                let temp = [...users];
                let temp_element = { ...temp[0] };
                temp_element.color = color;
                temp[0] = temp_element;
                setUsers(temp);
            }
        } else {
            if (firstColor !== null && firstColor === color) { }
            else {
                setSecondColor(color)
                urlSecond = url
                let temp = [...users];
                let temp_element = { ...temp[1] };
                temp_element.color = color;
                temp[1] = temp_element;
                setUsers(temp);
            }
        }
    }

    const handleClick = () => {
        localStorage.setItem('firstColor', JSON.stringify(firstColor));
        localStorage.setItem('secondColor', JSON.stringify(SecondColor));
        history.push({ state: { users: users } });
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
            {isReady && first.name !== undefined && second.name !== undefined && <Box dir='ltr' Box component="main" sx={{ bgcolor: 'white', display: 'flex', marginTop: '8px', placeContent: 'center' }}>
                <Box sx={{ textAlignLast: 'center', width: 620, height: 470, borderRight: 'dotted', borderTop: 'solid', borderLeft: 'solid', borderBottom: 'solid', textAlign: '-webkit-center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ alignItems: 'center' }}>
                            <Avatar sx={{ width: 50, height: 50, marginLeft: '10px' }} alt={first.name} src={`${first.image}`} />
                            <Typography sx={{ marginLeft: '10px' }}>{first.name}</Typography>
                        </div>
                        <div style={{
                            alignItems: 'center', marginLeft: '10px', marginTop: '-20px'
                        }}>
                            <Avatar sx={{ width: 50, height: 50 }} alt={urlFirst} src={`${urlFirst}`} />
                            {/* <Typography>:הצבע הנבחר הוא</Typography> */}
                        </div>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', placeContent: 'center', justifyContent: 'space-evenly' }}>
                        <Colors handleColor={handleColor} type={'first'} />
                    </Box>
                </Box>
                <Box sx={{ textAlignLast: 'center', width: 620, height: 470, borderRight: 'solid', borderTop: 'solid', borderBottom: 'solid', textAlign: '-webkit-center' }}>
                    <Box sx={{ justifyContent: 'right', display: 'flex', alignItems: 'center' }}>
                        <div style={{
                            alignItems: 'center', marginRight: '10px', marginTop: '-20px'
                        }}>
                            <Avatar sx={{ width: 50, height: 50 }} alt={SecondColor} src={`${urlSecond}`} />
                            {/* <Typography>:הצבע הנבחר הוא</Typography> */}
                        </div>
                        <div style={{ alignItems: 'center' }}>
                            <Avatar sx={{ width: 50, height: 50, marginRight: '10px' }} alt={second.name} src={`${second.image}`} />
                            <Typography sx={{ marginLeft: '10px' }}>{second.name}</Typography>
                        </div>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', placeContent: 'center', justifyContent: 'space-evenly' }}>
                        <Colors handleColor={handleColor} type={'second'} />
                    </Box>
                </Box>
                {firstColor === null && SecondColor === null && <Button sx={{ right: '5px', position: 'absolute', bottom: '4px' }} type='submit' disabled endIcon={<ArrowRightAltIcon sx={{ marginLeft: '-30px', height: '30px', width: '80px' }} />}>המשך</Button>}
                {firstColor !== null && SecondColor === null && <Button sx={{ right: '5px', position: 'absolute', bottom: '4px' }} type='submit' disabled endIcon={<ArrowRightAltIcon sx={{ marginLeft: '-30px', height: '30px', width: '80px' }} />}>המשך</Button>}
                {firstColor === null && SecondColor !== null && <Button sx={{ right: '5px', position: 'absolute', bottom: '4px' }} type='submit' disabled endIcon={<ArrowRightAltIcon sx={{ marginLeft: '-30px', height: '30px', width: '80px' }} />}>המשך</Button>}
                {firstColor !== null && SecondColor !== null && <Button onClick={handleClick} type='submit' component={Link} to="/drawing/shapes" sx={{ right: '5px', position: 'absolute', bottom: '4px' }} endIcon={<ArrowRightAltIcon sx={{ marginLeft: '-30px', height: '30px', width: '80px' }} />}>המשך</Button>}
            </Box>}

        </React.Fragment>
    )
};

export default ColorPicker;
