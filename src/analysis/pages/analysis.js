import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

let video;

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
        // if (drawing) {
        //     video = document.querySelector("video")
        //     video.src = drawing[6].video
        //     console.log(video.src);
        //}
    })


    return (
        <div>
            <video className="video" width="600px" controls></video>

        </div>
    )
};

export default Analysis;
