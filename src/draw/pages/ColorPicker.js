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
let child = [];
let temp;
let temp_element;
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

    const [counter, setCounter] = useState(0);
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
        console.log("first", first.name)
        console.log("Child", first, second)
        setIsReady(true);
    }

    const handleColor = (color, type, url) => {
        console.log(type)
        if (type === 'first') {
            setFirstColor(color)
            urlFirst = url;
            let temp = [...users];
            let temp_element = { ...temp[0] };
            temp_element.color = color;
            temp[0] = temp_element;
            setUsers(temp);

        } else {
            setSecondColor(color)
            urlSecond = url
            console.log(url)
            let temp = [...users];
            let temp_element = { ...temp[1] };
            temp_element.color = color;
            temp[1] = temp_element;
            setUsers(temp);
        }
        console.log(users)
    }

    const handleClick = () => {
        localStorage.setItem('firstColor', JSON.stringify(firstColor));
        localStorage.setItem('secondColor', JSON.stringify(SecondColor));
        history.push({ state: { users: users } });
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
                <Box sx={{ textAlignLast: 'center', width: 620, height: 470, borderRight: 'dotted', borderTop: 'solid', borderLeft: 'solid', borderBottom: 'solid', textAlign: '-webkit-center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar sx={{ width: 50, height: 50 }} alt={first.name} src={`http://localhost:3000/${first.image}`} />
                            <Typography>{first.name}</Typography>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', margin: 'auto' }}>
                            <Avatar sx={{ width: 50, height: 50, marginRight: 1 }} alt={urlFirst} src={`${urlFirst}`} />
                            <Typography>:הצבע הנבחר הוא</Typography>
                        </div>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', placeContent: 'center', justifyContent: 'space-evenly' }}>
                        <Colors handleColor={handleColor} type={'first'} />
                    </Box>
                </Box>
                <Box sx={{ textAlignLast: 'center', width: 620, height: 470, borderRight: 'solid', borderTop: 'solid', borderBottom: 'solid', textAlign: '-webkit-center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', margin: 'auto'}}>
                            <Avatar sx={{ width: 50, height: 50, marginRight: 1 }} alt={SecondColor} src={`${urlSecond}`} />
                            <Typography>:הצבע הנבחר הוא</Typography>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Typography>{second.name}</Typography>
                            <Avatar sx={{ width: 50, height: 50 }} alt={second.name} src={`http://localhost:3000/${second.image}`} />
                        </div>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', placeContent: 'center', justifyContent: 'space-evenly' }}>
                        <Colors handleColor={handleColor} type={'second'} />
                    </Box>
                </Box>
            </Box>}
            {firstColor === null && SecondColor === null && <Button disabled component={Link} to="/drawing/shapes" sx ={{right: '5px', position: 'absolute'}}>המשך</Button>}
            {firstColor !== null && SecondColor === null && <Button disabled component={Link} to="/drawing/shapes" sx ={{right: '5px', position: 'absolute'}}>המשך</Button>}
            {firstColor === null && SecondColor !== null && <Button disabled component={Link} to="/drawing/shapes" sx ={{right: '5px', position: 'absolute'}}>המשך</Button>}
            {firstColor !== null && SecondColor !== null && <Button onClick={handleClick} type='submit' component={Link} to="/drawing/shapes" sx ={{right: '5px', position: 'absolute'}}>המשך</Button>}

            {!isReady && <CircularProgress />}

        </React.Fragment>
    )
};

export default ColorPicker;