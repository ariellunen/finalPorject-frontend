
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Shapes from '../component/Shapes';



const ShapesPicker = (props) => {
    let selectedShape;
    const location = useLocation();
    const history = useHistory();
    const [counter, setCounter] = useState(0);

    const handleShape = (shape) => {
        selectedShape = shape;
        sessionStorage.setItem("selectedShape", selectedShape);
        setCounter(counter + 1);
    }

    return (
        <React.Fragment>
            {counter === 1 && history.replace('/drawing/coloring', location)}
            <Shapes handleShape={handleShape} />
        </React.Fragment>
    )
};

export default ShapesPicker;