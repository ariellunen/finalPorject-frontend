import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
// import Button from '../../shared/components/FormElements/Button'
import Button from '@material-ui/core/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

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
                setFirstKide(responseData.child);
            } catch (err) {
                console.log(err);
            }

            try {
                const response = await fetch(`http://localhost:3000/api/users/children/${props.item.secondKide}`, {
                });
                const responseData = await response.json();
                setSecondKide(responseData.child);
                setIsReady(true);

            } catch (err) {
                console.log(err);
            }
        }

        getKide();
    }, [isReady]);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState(props.item)
    let arr = []
    arr.push(firstKide)
    arr.push(secondKide)

    const handleClick = () => {
        
    }

    const card = (
        <React.Fragment>
            <div dir="rtl">
                <CardContent>
                    <Typography variant="h4" component="div">
                        <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Avatar
                                    sx={{ width: 80, height: 80 }}
                                    alt={'left'}
                                    src={`http://localhost:3000/${firstKide.image}`}
                                />
                                {firstKide.name}
                            </Box>
                            <Box sx={{ textAlign: 'center' }}>
                                <Avatar
                                    sx={{ width: 80, height: 80 }}
                                    alt={'left'}
                                    src={`http://localhost:3000/${secondKide.image}`}
                                />
                                {secondKide.name}
                            </Box>
                        </Box>
                    </Typography>
                    <br />
                    <Typography sx={{ margin: 0, fontSize: 20 }} color="text.secondary" gutterBottom>
                        {props.item.timeStarted.slice(0, 10).split("-").reverse().join('/')}
                    </Typography>
                    <Typography sx={{ margin: 0, fontSize: 20 }} color="text.secondary">
                        שעת התחלה:
                        &nbsp;
                        {props.item.timeStarted.slice(11, -6)}
                    </Typography>
                    <Typography sx={{ margin: 0, fontSize: 20 }} color="text.secondary">
                        שעת סיום:
                        &nbsp;
                        {props.item.timeDone.slice(11, -6)}
                    </Typography>
                    <Typography sx={{ margin: 0, fontSize: 20 }} color="text.secondary">
                        צורה:
                        &nbsp;
                        {props.item.shape}
                    </Typography>
                </CardContent>
                <CardActions sx={{ flexDirection: 'row-reverse' }}>
                    <Button variant="contained" type='submit' onClick={(() => {
                        console.log(props.item)
                    localStorage.setItem('Item', JSON.stringify(props.item));
                    localStorage.setItem('Names', JSON.stringify(arr));
                })} component={Link} to="/analysis/details" state={data} index={props.index}>ניתוח</Button>
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