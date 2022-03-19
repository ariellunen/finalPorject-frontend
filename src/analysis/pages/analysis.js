import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Analysis = (props) => {
    let drawing;
    useState(async () => {
        try{
            const response = await fetch('http://localhost:3000/api/drawing/', {
            });
            const responseData = await response.json();
            drawing = responseData.drawing;
            console.log(drawing)

        } catch(err) {
            console.log(err);
        }
    }, )
    return (
        <div></div>
    )
};

export default Analysis;
