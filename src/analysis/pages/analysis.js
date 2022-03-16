import React from 'react';
import { useLocation } from 'react-router-dom';

const Analysis = (props) => {
    const location = useLocation();
    console.log(location)
    console.log(props)
    return (
        <div></div>
    )
};

export default Analysis;
