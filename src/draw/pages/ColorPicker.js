import React, { useState } from 'react';
import Colors from '../component/Colors';
import { useHistory } from 'react-router-dom';

const ColorPicker = (props) => {
    const DUMMY_USERS = [
        {name: 'Ariel', color: ''},
        {name: 'Halel', color: ''},
    ]
    const [counter, setCounter] = useState(0);
    const [users, setUsers] = useState(DUMMY_USERS);
    const history = useHistory();

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
            {counter === 2 && history.replace('/drawing/coloring', users)}
            {counter < 2 && (
                <Colors handleColor={handleColor} name={users[counter]}/>
            )}
        </div>
    )
};

export default ColorPicker;