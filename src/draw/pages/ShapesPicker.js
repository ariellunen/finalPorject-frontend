
import { Button } from 'bootstrap';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Shapes from '../component/Shapes';

const ShapesPicker = (props) => {
    const location = useLocation();
    const history = useHistory();
    const usersData = [
        { shape: '' },
    ]
    const [counter, setCounter] = useState(0);
    const [users, setUsers] = useState(usersData);

    const handleShape = (shape) => {
        let temp = [...users];
        let temp_element = { ...temp[counter] };
        temp_element.shape = shape;
        temp[counter] = temp_element;
        setUsers(temp);
        setCounter(counter + 1);
        if (counter === 1) {
            history.push({ state: { users: users } });
        }
        // switch (temp_element.shape) {
        //     case 'circle':
        //         console.log("circle");
        //         break;
        //     case 'triangular':
        //         console.log("triangular");
        //         break;
        //     case 'square':
        //         console.log("square");
        //         break;
        // }
    }

    return (
        <React.Fragment>
            {counter === 1 && history.replace('/drawing/coloring', location)}
            <Shapes handleShape={handleShape} />
        </React.Fragment>
    )
};

export default ShapesPicker;