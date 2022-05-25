import React, { useState, useEffect } from 'react';
import Colors from '../component/Colors';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import NavLink from '../../user/components/NavLinks';

let child = [];
let temp;
let temp_element;
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
        let first = JSON.parse(localStorage.getItem('firstKide'));
        let second = JSON.parse(localStorage.getItem('secondtKide'));
        console.log("first",first.name)
        console.log("Child",first, second)
        setIsReady(true);
        temp = [...users];
        console.log(temp)
        temp_element = { ...temp[0] };
        console.log(temp_element)
        temp_element.name = first.name;
        console.log(temp_element.name)
        temp[0] = temp_element;
        setUsers(temp);
        temp = [...users];
        temp_element = { ...temp[1] };
        temp_element.name = second.name;
        temp[1] = temp_element;
        setUsers(temp);
    }

    const handleColor = (color, type) => {
        console.log(type)
        if(type==='first'){
            setFirstColor(color)
            let temp = [...users];
            let temp_element = { ...temp[0] };
            temp_element.color = color;
            temp[0] = temp_element;
            setUsers(temp);

        } else {
            setSecondColor(color)
            let temp = [...users];
            let temp_element = { ...temp[1] };
            temp_element.color = color;
            temp[1] = temp_element;
            setUsers(temp);
        }
        console.log(users)
    }
    console.log("users",users)

    const handleClick = () => {
        localStorage.setItem('firstColor', JSON.stringify(firstColor));
        localStorage.setItem('secondColor', JSON.stringify(SecondColor));

        history.push({ state: { users: users } });

    }
    let first = 'first';
    let second = 'second';
    return (
        <React.Fragment>
        <NavLink />
        {isReady && <Box component="main" sx={{ display: 'flex', marginTop: '40px', placeContent: 'center' }}>
            <Box sx={{ textAlignLast: 'center', width: 620, height: 470, borderRight: 'dotted', borderTop: 'solid', borderLeft: 'solid', borderBottom: 'solid', textAlign: '-webkit-center' }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', placeContent: 'center', justifyContent: 'space-evenly' }}>
                    <Colors handleColor={handleColor} type={first}/>
                </Box>
                
            </Box>
            <Box sx={{ textAlignLast: 'center', width: 620, height: 470, borderRight: 'solid', borderTop: 'solid', borderBottom: 'solid', textAlign: '-webkit-center' }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', placeContent: 'center', justifyContent: 'space-evenly' }}>
                    <Colors handleColor={handleColor} type={second}/>
                </Box>
            </Box>
        </Box>}
        {firstColor === null && SecondColor === null && <Button variant="contained" disabled component={Link} to="/drawing/shapes">המשך</Button>}
        {firstColor !== null && SecondColor === null && <Button variant="contained" disabled component={Link} to="/drawing/shapes">המשך</Button>}
        {firstColor === null && SecondColor !== null && <Button variant="contained" disabled component={Link} to="/drawing/shapes">המשך</Button>}
        {firstColor !== null && SecondColor !== null &&<Button variant="contained" onClick={handleClick} type='submit' component={Link} to="/drawing/shapes">המשך</Button>}
    </React.Fragment>
    )
};

export default ColorPicker;

// import React, { useEffect, useState } from 'react';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import { Link } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
// import Autocomplete from '@mui/material/Autocomplete'
// import NavLink from '../../user/components/NavLinks';
// import { green } from '@mui/material/colors';
// import IconButton from '@mui/material/IconButton';
// import SearchIcon from '@mui/icons-material/Search';
// import Avatar from '@mui/material/Avatar';
// import Stack from '@mui/material/Stack';
// import AvatarGroup from '@mui/material/AvatarGroup';
// let first, second;
// let child = [];

// const ColorPicker = (props) => {
//     const usersData = [
//         { name: '', color: '' },
//         { name: '', color: '' },
//     ]

//     const [counter, setCounter] = useState(0);
//     const [users, setUsers] = useState(usersData);
//     const [isReady, setIsReady] = useState(false);
//     const history = useHistory();
//     const [firstColor, setFirstColor] = useState
//     useEffect(() => {
//         setTimeout(() => {
//             fetchAPI();
//         }, 2000);
//     }, []);


//     const fetchAPI = async () => {
//         first = JSON.parse(localStorage.getItem('firstKide'));
//         second = JSON.parse(localStorage.getItem('secondtKide'));
//         child.push(first)
//         child.push(second)
//         console.log(first, second, child)
//         setIsReady(true);
//     }

//     const handleColor = (color) => {
//         let temp = [...users];
//         let temp_element = { ...temp[counter] };
//         temp_element.color = color;
//         temp[counter] = temp_element;
//         setUsers(temp);
//         setCounter(counter + 1);
//         if (counter === 1) {
//             history.push({ state: { users: users } });
//         }
//     }

//     console.log(firstColor)
//     return (
        // <React.Fragment>
        //     <NavLink />
        //     {isReady && <Box component="main" sx={{ display: 'flex', marginTop: '40px', placeContent: 'center' }}>
        //         <Box sx={{ textAlignLast: 'center', width: 620, height: 470, borderRight: 'dotted', borderTop: 'solid', borderLeft: 'solid', borderBottom: 'solid', textAlign: '-webkit-center' }}>
        //             <Box sx={{ display: 'flex', flexWrap: 'wrap', placeContent: 'center', justifyContent: 'space-evenly' }}>
        //                 {ColorsOptions.map((color) => {
        //                     return <Avatar onClick={() => setFirstColor(color)} sx={{ width: 100, height: 100 }} alt={color.color} src={`http://localhost:3000/${color.url}`} />
        //                 })}
        //             </Box>
                    
        //         </Box>
        //         <Box sx={{ textAlignLast: 'center', width: 620, height: 470, borderRight: 'solid', borderTop: 'solid', borderBottom: 'solid', textAlign: '-webkit-center' }}>
        //             <Box sx={{ display: 'flex', flexWrap: 'wrap', placeContent: 'center', justifyContent: 'space-evenly' }}>
        //                 {/* {children.slice(0, 8).map((child) => {
        //                     return <Avatar onClick={() => setSecondKide(child)} sx={{ width: 100, height: 100 }} alt={child.name} src={`http://localhost:3000/${child.image}`} />
        //                 })} */}
        //             </Box>
        //         </Box>
        //     </Box>}
        //     {/* <Button variant="contained" type='submit' component={Link} to="/drawing/color">המשך</Button> */}
        // </React.Fragment>
//     )
// };

// export default ColorPicker;