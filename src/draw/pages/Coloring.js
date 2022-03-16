import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import LeftCanvas from './LeftCanvas';
import RightCanvas from './RightCanvas';
import './Coloring.css';
import Button from '@mui/material/Button';
import { Link, useHistory } from 'react-router-dom';
import Users from '../../user/pages/Users';
import Analysis from '../../analysis/pages/analysis';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const Coloring = (props) => {
    const location = useLocation();
    let leftCoordinates = [];
    let rightCoordinates = [];
    const history = useHistory();



    const handleLeftCoordinate = (x, y) => {
        leftCoordinates.push({ x, y });
        console.log("left", leftCoordinates);
    }

    const handleRightCoordinate = (x, y) => {
        rightCoordinates.push({ x, y });
        console.log("right", rightCoordinates);
    }

    // const handleFinish = () => {
    //     setLeft(leftCoordinates);
    //     setRight(rightCoordinates);
    //     history.push({state: {left: left, right:right}});
    //     setDone(true);
    // }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    /////////////////////////////////////////////////////////////////

    var counter = 0;
    var timeIndex;
    const x1 = [9, 41, 6, 78, -62, 65, 9, 41, 6, 78];
    const y1 = [8, -15, 48, 95, -18, 12, 8, -15, 48, 95];
    var mm = [];
    var point1x1 = 0;
    var point2x1 = 1;
    var point1y1 = 0;
    var point2y1 = 1;
    var pointM = 0;
    var change = 0;

    window.onload = function () {
        timeIndex = setInterval(frequency, 1000);
    }

    function frequency() {
        counter++;
        if (counter >= 5) {
            clearInterval(timeIndex);
        }
        //חיבור כל הערכים במערך X
        //let res1 = x1.reduce((total, item) => {return total + item}, 0);
        //document.getElementById("a").innerHTML += res1 + " ";

        //שיפוע
        let m = ((x1[point1x1] - x1[point2x1]) / (y1[point1y1] - y1[point2y1]));
        //document.getElementById("a").innerHTML += m + "    ";      
        //הכנסה למערך הישפועים 0 או 1 
        if (m >= 0) { mm.push(1); }
        if (m < 0) { mm.push(0); }

        // קידום האינדקסים של הנקודות 
        point1x1 += 2;
        point2x1 += 2;
        point1y1 += 2;
        point2y1 += 2;

        //שינוי כיוון
        if (mm.length >= 2) {
            if (mm[pointM] != mm[pointM + 1]) {
                change++;
            }
            pointM++;
        }
        document.getElementById("b").innerHTML += mm[pointM] + "    ";
        //document.getElementById("c").innerHTML += change;   

        document.getElementById("b").innerHTML += "The amount of changes in direction is: " + change;
    }

    /////////////////////////////////////////////////////////////////

    return (
        <div className='container'>
            <canvas id="canvas" width="300" height="700">
                <LeftCanvas handleCoordinate={handleLeftCoordinate} color={location.state[0]} />
            </canvas>
            <canvas id="canvass" width="300" height="700">
                <RightCanvas handleCoordinate={handleRightCoordinate} color={location.state[1]} />
            </canvas>
            {/* <Button variant="contained" color="primary" onClick={handleFinish}>
                DONE
            </Button>
            {done && history.replace('/analysis', right)} */}
            <div>
                <Button onClick={handleOpen}>DONE</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box className='modal'>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Text in a modal
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </Typography>
                    </Box>
                </Modal>
            </div>
            <div>
                <h2 id="a"></h2>
                <h2 id="b"></h2>
                <h4 id="c"></h4>
            </div>
        </div>
    )
};

export default Coloring;