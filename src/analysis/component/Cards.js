import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
// import Recovery from '../component/Recovery';
import DrawDetails from '../pages/DrawDetails';
import { Link } from 'react-router-dom';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

const Cards = (props) => {
    const [firstKide, setFirstKide] = useState(false);
    const [secondKide, setSecondKide] = useState(false);
    const [isReady, setIsReady] = useState(false);
    useEffect(() => {
        const getKide = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/users/children/${props.item.firstKide}`, {
                });
                const responseData = await response.json();
                setFirstKide(responseData.child.name);
            } catch (err) {
                console.log(err);
            }

            try {
                const response = await fetch(`http://localhost:3000/api/users/children/${props.item.secondKide}`, {
                });
                const responseData = await response.json();
                // console.log(responseData)
                setSecondKide(responseData.child.name);
                setIsReady(true);

            } catch (err) {
                console.log(err);
            }
        }

        getKide();
    }, [isReady]);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    console.log(props.item);
    const [data, setData] = useState(props.item)    
    console.log("data",props.item.firstKide, props.item.secondKide)
    let arr = []
    arr.push(firstKide)
    arr.push(secondKide)
    localStorage.setItem('Item', JSON.stringify(props.item));
    localStorage.setItem('Names', JSON.stringify(arr));

    const card = (
        <React.Fragment>
            <div dir="rtl">
                <CardContent>
                    <Typography sx={{ fontSize: 19 }} color="text.secondary" gutterBottom>
                        {props.item.timeStarted.slice(0, 10)}
                    </Typography>
                    <Typography variant="h4" component="div">
                        {firstKide}{bull}{secondKide}
                    </Typography>
                    <br />
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        שעת התחלה
                        &nbsp;
                        {props.item.timeStarted.slice(11, -6)}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        שעת סיום
                        &nbsp;
                        {props.item.timeDone.slice(11, -6)}
                    </Typography>
                    {/* <Typography variant="body2">
                        {firstKide}
                        <br />
                        {secondKide}
                    </Typography> */}
                </CardContent>
            </div>
            <CardActions>
                {/* <Button variant="outlined" onClick={handleOpen}>שחזור</Button> */}
                {/* <Button variant="contained" type='submit' component={Link} to="/analysis/details"
                state={props.item} index={props.index}>ניתוח</Button> */}
                <Button variant="contained" type='submit' component={Link} to="/analysis/details" state={data} index={props.index}>ניתוח</Button> 
                <Link to="/analysis/details" state={data}>Link Text</Link>


                {/* <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <DrawDetails draw={props.item} index={props.index} />

                </Modal> */}
            </CardActions>
        </React.Fragment>
    );

    return (
        <React.Fragment>

            {isReady && <Box sx={{ minWidth: 275, width: '75%' }}>
                <Card style={{ marginTop: 10 }} variant="outlined">{card}</Card>
            </Box>}
        </React.Fragment>

    );
}

export default Cards;