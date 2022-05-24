import React, { useState, useContext } from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '../../shared/components/UIElements/Card';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';

const ContentDefin = (props) => {
    const [on, setOn] = useState(false)

    const handleSwitch = () => {
        if(on === true){
            props.handlePermissionOn()
        } else{
            props.handlePermissionOff()
        }
    }
    return (
        <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
            <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Card className="authentication">
                        <FormGroup>
                            <FormControlLabel control={<Switch defaultChecked onChange={(e) => {setOn(e.target.checked)}}/>} label="הרשאת גישה לכל המשתמשים" />
                        </FormGroup>
                    </Card>
                </Grid>
                <Button variant="contained" onClick={handleSwitch}>Save</Button>

            </Typography>
        </Paper>
    )
}

export default ContentDefin;