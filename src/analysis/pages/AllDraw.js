import React, { useState, useEffect, useRef } from 'react';
import Cards from '../component/Cards';
import Box from '@mui/material/Box';

const AllDraw = () => {
    const [isReady, setIsReady] = useState(false);
    const [data, setData] = useState(false);
    useEffect(() => {
        const getDraw = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/drawing/', {
                });
                const responseData = await response.json();
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
                return (
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        p: 1,
                        m: 1,
                        bgcolor: 'background.paper',
                        borderRadius: 1,
                    }}>
                        <Cards item={item} key={key} index={key} />
                    </Box>
                )
            })}
        </React.Fragment>
    )
}

export default AllDraw;