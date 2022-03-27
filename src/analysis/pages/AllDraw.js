import React, { useState, useEffect, useRef } from 'react';
import Cards from '../component/Cards';

const AllDraw = () => {
    const [isReady, setIsReady] = useState(false);
    const [drawing, setDrawing] = useState(false);

    useEffect(() => {
        const getDraw = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/drawing/', {
                });
                const responseData = await response.json();
                setDrawing(responseData.drawing);
                setIsReady(true);
            } catch (err) {
                console.log(err);
            }
        }
        getDraw();
        console.log(isReady)
    }, [isReady]);

    return (
        <React.Fragment>
            {drawing === undefined &&
                <div>wait</div>
            }
            {isReady && drawing.map((item, key) => {
                return(
                    <Cards item={item} key={key}/>
                )
            })}    
        </React.Fragment>
    )
}

export default AllDraw;