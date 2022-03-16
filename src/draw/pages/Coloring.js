import React, {useState} from 'react';
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
    const [done, setDone] = useState(false);
    const [left, setLeft] = useState(null);
    const [right, setRight] = useState(null);


    const handleLeftCoordinate = (x,y) => {
        leftCoordinates.push({x,y});
        // console.log("left",leftCoordinates);
    }

    const handleRightCoordinate = (x,y) => {
        rightCoordinates.push({x,y});
        console.log("right",rightCoordinates);
    }

    const handleFinish = () => {
        setLeft(leftCoordinates);
        setRight(rightCoordinates);
        history.push({state: {left: left, right:right}});
        setDone(true);
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    return (
        <div className='container'>
            <canvas id="canvas" width="300" height="700">
                <LeftCanvas handleCoordinate={handleLeftCoordinate} color={location.state[0]}/>
            </canvas>
            <canvas id="canvass" width="300" height="700">
                <RightCanvas handleCoordinate={handleRightCoordinate} color={location.state[1]}/>
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
        </div>

    )
};

export default Coloring;