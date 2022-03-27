import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Recovery from '../component/Recovery';

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
                const response = await fetch(`http://localhost:3000/api/users/${props.item.firstKide}`, {
                });
                const responseData = await response.json();
                console.log(responseData.user.name)
                setFirstKide(responseData.user.name);
            } catch (err) {
                console.log(err);
            }

            try {
                const response = await fetch(`http://localhost:3000/api/users/${props.item.secondKide}`, {
                });
                const responseData = await response.json();
                console.log(responseData.user.name)
                setSecondKide(responseData.user.name);
                setIsReady(true);

            } catch (err) {
                console.log(err);
            }
        }

        console.log(props.item.firstKide)
        getKide();

    }, [isReady]);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const card = (
        <React.Fragment>
            <div dir="rtl">
                <CardContent>
                    {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Word of the Day
                    </Typography> */}
                    <Typography variant="h4" component="div">
                    {firstKide}{bull}{secondKide}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        :תאריך ושעת התחלה
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        :תאריך ושעת סיום
                    </Typography>
                    {/* <Typography variant="body2">
                        {firstKide}
                        <br />
                        {secondKide}
                    </Typography> */}
                </CardContent>
            </div>
            <CardActions>
                <Button variant="outlined" onClick={handleOpen}>שחזור</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Recovery draw={props.item} />

                </Modal>
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