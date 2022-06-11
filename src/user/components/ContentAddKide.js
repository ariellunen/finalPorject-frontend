import React, { useState, useContext } from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Input from '../../shared/components/FormElements/Input';
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import Card from '../../shared/components/UIElements/Card';
import { useHttpClient } from '../../shared/hooks/http-hook';
import '../pages/Auth.css';
import { useHistory } from 'react-router-dom';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import { CameraFeed } from '../../shared/components/FormElements/CameraFeed';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
const ContentAddKide = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [imageUp, setImageUp] = useState();
    const history = useHistory();

    const [formState, inputHandler, setFormData] = useForm(
        {
            name: {
                value: '',
                isValid: false,
            },
            image: {
                value: '',
                isValid: false,
            }
        },
        false,
    );

    const authSubmitHandler = async event => {
        event.preventDefault();
        console.log(formState.inputs);
        try {
            const formData = new FormData();
            formData.append('name', formState.inputs.name.value);
            formData.append('image', formState.inputs.image.value);
            const responseData = await sendRequest(
                'http://localhost:3000/api/users/signupChild/',
                'POST',
                formData,
            );
            console.log(responseData);
            history.replace('/admin')

        } catch (err) {
            console.log(err);
        }
    }
    const [name, setName] = useState('');

    const uploadImage = async dataURL => {
        var blobBin = atob(dataURL.split(',')[1]);
        var array = [];
        for (var i = 0; i < blobBin.length; i++) {
            array.push(blobBin.charCodeAt(i));
        }
        var file = new Blob([new Uint8Array(array)], { type: 'image/png' });

        const formData = new FormData();
        formData.append('name', formState.inputs.name.value);
        formData.append('image', file);
        console.log(file)

        const responseData = await fetch(
            'http://localhost:3000/api/users/signupChild/',
            {
                method: 'POST',
                body: formData,
            }
        );
        console.log(responseData);
        // Connect to a seaweedfs instance
    };

    const [alignment, setAlignment] = useState('upload');

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };


    return (
        <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
            <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {/* <ErrorModal error={error} onClear={clearError} /> */}
                    <Card className="authentication">
                        <hr />
                        <form onSubmit={authSubmitHandler}>
                            <Input
                                element="input"
                                id="name"
                                type="text"
                                label="שם הילד\ה"
                                validators={[VALIDATOR_REQUIRE()]}
                                errorText="Please enter a name."
                                onInput={inputHandler}
                            />
                            {alignment === 'takeImage' && <CameraFeed sendFile={uploadImage} />}
                            {alignment === 'upload' && <ImageUpload center id="image" onInput={inputHandler} />}
                            <ToggleButtonGroup
                                color="primary"
                                value={alignment}
                                exclusive
                                onChange={handleChange}
                            >
                                <ToggleButton value="upload">העלאת תמונה</ToggleButton>
                                <ToggleButton value="takeImage">צילום תמונה</ToggleButton>
                            </ToggleButtonGroup>

                            {/* <Button type="submit" disabled={!formState.isValid}>
                                {'SIGNUP'}
                            </Button> */}
                            <Button type="submit">
                                {'SIGNUP'}
                            </Button>
                        </form>
                    </Card>
                </Grid>
            </Typography>
        </Paper>
    );

}

export default ContentAddKide;