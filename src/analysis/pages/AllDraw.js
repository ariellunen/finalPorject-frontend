import React, { useState, useEffect, useRef } from 'react';
import Cards from '../component/Cards';


const AllDraw = () => {
    const [isReady, setIsReady] = useState(false);
    const [data, setData] = useState(false);

    useEffect(() => {
        const getDraw = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/drawing/', {
                });
                const responseData = await response.json();
                console.log(responseData.drawing)
                setData(responseData.drawing);
                setIsReady(true);
            } catch (err) {
                console.log(err);
            }
        }
        
        getDraw();

    }, [isReady]);

    return (
        <React.Fragment>
            {data === undefined &&
                <div>wait</div>
            }
            {isReady && data.map((item, key) => {
                return(
                    <Cards item={item} key={key}/>
                )
            })}    
        </React.Fragment>
    )
}

export default AllDraw;