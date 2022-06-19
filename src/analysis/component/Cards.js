import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

const Cards = (props) => {
    const [firstKide, setFirstKide] = useState(false);
    const [secondKide, setSecondKide] = useState(false);
    const [isReady, setIsReady] = useState(false);
    useEffect(() => {
        const getKide = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BECKEND_URL}/users/children/${props.item.firstKide}`, {
                });
                const responseData = await response.json();
                setFirstKide(responseData.child);
            } catch (err) {
                console.log(err);
            }

            try {
                const response = await fetch(`${process.env.REACT_APP_BECKEND_URL}/users/children/${props.item.secondKide}`, {
                });
                const responseData = await response.json();
                setSecondKide(responseData.child);
                setIsReady(true);
            } catch (err) {
                console.log(err);
            }
        }

        getKide();
    }, [isReady, props]);
    let arr = []
    arr.push(firstKide)
    arr.push(secondKide)

    const card = (
        <React.Fragment>
            <div dir="rtl">
                <CardContent>
                    <Typography sx={{ margin: 0, fontSize: 27}} component="div">
                        <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Avatar
                                    sx={{ width: 70, height: 70 }}
                                    alt={'left'}
                                    src={`${process.env.REACT_APP_ASSET_URL}/${firstKide.image}`}
                                />
                                {firstKide.name}
                            </Box>
                            <Box sx={{ textAlign: 'center' }}>
                                <Avatar
                                    sx={{ width: 70, height: 70 }}
                                    alt={'left'}
                                    src={`${process.env.REACT_APP_ASSET_URL}/${secondKide.image}`}
                                />
                                {secondKide.name}
                            </Box>
                            
                        </Box>
                    </Typography>
                    <Divider />

                    <br />
                    <Typography sx={{ margin: 0, fontSize: 18 }} color="text.secondary" gutterBottom>
                        {props.item.timeStarted.slice(0, 10).split("-").reverse().join('/')}
                    </Typography>
                    <Typography sx={{ margin: 0, fontSize: 18 }} color="text.secondary">
                        שעת התחלה:
                        &nbsp;
                        {props.item.timeStarted.slice(11, -6)}
                    </Typography>
                    <Typography sx={{ margin: 0, fontSize: 18 }} color="text.secondary">
                        שעת סיום:
                        &nbsp;
                        {props.item.timeDone.slice(11, -6)}
                    </Typography>
                </CardContent>
                <CardActions sx={{ flexDirection: 'row-reverse', justifyContent: 'center' }}>
                    <Button type='submit' sx={{ bgcolor: '#4454a3', width: '94%', color:'white' }} onClick={(() => {
                        localStorage.setItem('Item', JSON.stringify(props.item));
                        localStorage.setItem('Names', JSON.stringify(arr));
                    })} component={Link} to="/analysis/details" index={props.index}>ניתוח</Button>

                </CardActions>
            </div>
        </React.Fragment>
    );

    return (
        <React.Fragment>
            {isReady && <Box sx={{ minWidth: 275, width: '100%' }}>
                <Card style={{ marginTop: 10, borderRadius: 10 }} variant="outlined">{card}</Card>
            </Box>}
        </React.Fragment>

    );
}

export default Cards;