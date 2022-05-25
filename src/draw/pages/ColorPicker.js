import React, { useState, useEffect } from 'react';
import Colors from '../component/Colors';
import { useHistory } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

let first, second;
let child = [];
const ColorPicker = (props) => {
    const usersData = [
        { name: '', color: '' },
        { name: '', color: '' },
    ]

    const [counter, setCounter] = useState(0);
    const [users, setUsers] = useState(usersData);
    const [isReady, setIsReady] = useState(false);
    const history = useHistory();

    useEffect(() => {
        setTimeout(() => {
            fetchAPI();
        }, 2000);
    }, []);


    const fetchAPI = async () => {
        first = JSON.parse(localStorage.getItem('firstKide'));
        second = JSON.parse(localStorage.getItem('secondtKide'));
        child.push(first)
        child.push(second)
        console.log(first, second, child)
        setIsReady(true);
    }


    const handleColor = (color) => {
        let temp = [...users];
        let temp_element = { ...temp[counter] };
        temp_element.color = color;
        temp[counter] = temp_element;
        setUsers(temp);
        setCounter(counter + 1);
        if (counter === 1) {
            history.push({ state: { users: users } });
        }
    }

    return (
        <div>
            {!isReady &&
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            }
            {isReady && counter === 2 && history.replace('/drawing/shapes', users)}
            {isReady && usersData[1].name !== undefined && counter < 2 && (
                <Colors handleColor={handleColor} name={child[counter].name} />
            )}
        </div>
    )
};

export default ColorPicker;