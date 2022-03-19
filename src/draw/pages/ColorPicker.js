import React, { useState, useEffect } from 'react';
import Colors from '../component/Colors';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const ColorPicker = (props) => {
    const usersData = [
        {name: '', color: ''},
        {name: '', color: ''},
    ]
    const [counter, setCounter] = useState(0);
    const [users, setUsers] = useState(usersData);
    const [isReady, setIsReady] = useState(false);
    const history = useHistory();
    let data = [];

    useEffect(() => {
        setTimeout(() => {   
            fetchAPI();
        }, 2000);
    }, []);

    const fetchAPI = async() => {
        try{
            const response = await fetch('http://localhost:3000/api/users/', {
            });
            const responseData = await response.json();
            data.push(responseData)
            const len = data[0].users.length;
            usersData[0].name = data[0].users[len - 2].name;
            usersData[1].name = data[0].users[len-1].name;
            setIsReady(true);
        } catch(err) {
            console.log(err);
        }
    }


    const handleColor = (color) => {
        let temp = [...users];
        let temp_element = { ...temp[counter]};
        temp_element.color = color;
        temp[counter] = temp_element;
        setUsers(temp);
        setCounter(counter + 1);
        if(counter === 1){
            history.push({state: {users: users}});
        }
    }

    return (
        <div>
            {!isReady && 
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            }
            {isReady && counter === 2 && history.replace('/drawing/coloring', users)}
            {isReady && usersData[1].name !== undefined && counter < 2 && (
                <Colors handleColor={handleColor} name={users[counter]}/>
            )}
        </div>
    )
};

export default ColorPicker;