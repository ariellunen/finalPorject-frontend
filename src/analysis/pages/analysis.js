import React, { useState, useEffect } from 'react';

const Analysis = (props) => {
    let drawing;
    useEffect(async () => {
        try {
            const response = await fetch('http://localhost:3000/api/drawing/', {
            });
            const responseData = await response.json();
            drawing = responseData.drawing;
            console.log(drawing)

        } catch (err) {
            console.log(err);
        }
    })


    return (
        <div>
            gtyghyytrthhth
        </div>
    )
};

export default Analysis;
