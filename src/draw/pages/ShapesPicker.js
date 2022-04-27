
import React, { useState, useEffect } from 'react';
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
        console.log( temp_element.shape)
        temp[counter] = temp_element;
        setUsers(temp);
        setCounter(counter + 1);
        if (counter === 1) {
            history.push({ state: { users: users } });
        }
    }

    return (
        <React.Fragment>
            {/* <button onClick={() => { history.replace('/drawing/coloring', location) }}>next</button> */}
            {counter === 1 && history.replace('/drawing/coloring', location)}
            <Shapes handleShape={handleShape} />
        </React.Fragment>
    )
};

export default ShapesPicker;