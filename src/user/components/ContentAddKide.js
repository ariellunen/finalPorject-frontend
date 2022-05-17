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
import { AuthContext } from '../../shared/context/auth-context';
import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import '../pages/Auth.css';
import { useHistory } from 'react-router-dom';
import { TextField } from '@mui/material';

const ContentAddKide = () => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [isLoginMode, setIsLoginMode] = useState(true);
    const history = useHistory();

    // const [formState, inputHandler, setFormData] = useForm(
    //     {
    //         name: {
    //             value: '',
    //             isValid: false
    //         },
    //     },
    //     false
    // );

    const authSubmitHandler = async event => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/users/signupChild/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name
                })
            });

            const responseData = await response.json();
            console.log(responseData);
            history.replace('/admin')

        } catch (err) {
            console.log(err);
        }
    }
    const [name, setName] = useState('');
    const onChangeName = (e) => {
        setName(e.target.value);
    }

    return (
        <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
            <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {/* <ErrorModal error={error} onClear={clearError} /> */}
                    <Card className="authentication">
                        <hr />
                        <form onSubmit={authSubmitHandler}>
                            <TextField
                                onChange={onChangeName}
                                value={name}
                                element="input"
                                id="name"
                                type="text"
                                label="Your Name"
                                // validators={[VALIDATOR_REQUIRE()]}
                                errorText="Please enter a name."
                            // onInput={inputHandler}
                            />

                            {/* <Input
                                element="input"
                                id="email"
                                type="email"
                                label="E-Mail"
                                validators={[VALIDATOR_EMAIL()]}
                                errorText="Please enter a valid email address."
                                onInput={inputHandler}
                            />
                            <Input
                                element="input"
                                id="password"
                                type="password"
                                label="Password"
                                validators={[VALIDATOR_MINLENGTH(6)]}
                                errorText="Please enter a valid password, at least 6 characters."
                                onInput={inputHandler}
                            /> */}
                            <Button type="submit">
                                SIGNUP
                            </Button>
                        </form>
                    </Card>
                </Grid>
            </Typography>
        </Paper>
    );

}

export default ContentAddKide;