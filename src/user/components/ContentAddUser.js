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

const ContentAddUser = () => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [isLoginMode, setIsLoginMode] = useState(true);

    const [formState, inputHandler, setFormData] = useForm(
        {
            email: {
                value: '',
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            }
        },
        false
    );

    const authSubmitHandler = async event => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value,
                    name: formState.inputs.name.value,
                    userType: 'instruction'
                })
            });

            const responseData = await response.json();
            console.log(responseData);
        } catch (err) {
            console.log(err);
        }
    }

    const [isKide, setIsKide] = useState(false);
    const handleKide = () => {
        setIsKide(true);
    }

    const handleUsers = () => {
        setIsKide(false);
    }
    let form;
    if (isKide) {
        form = (
            <React.Fragment>
                <Grid item xs={6}>
                    <Button variant="contained" onClick={handleKide}>ילד\ה</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="outline" onClick={handleUsers}>פסיכולוג\מדריך</Button>
                </Grid>
                <ErrorModal error={error} onClear={clearError} />
                <Card className="authentication">
                    <hr />
                    <form onSubmit={authSubmitHandler}>
                        <Input
                            element="input"
                            id="name"
                            type="text"
                            label="Your Name"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please enter a name."
                            onInput={inputHandler}
                        />

                        <Input
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
                        />
                        <Button type="submit" disabled={!formState.isValid}>
                            SIGNUP
                        </Button>
                    </form>
                </Card>
            </React.Fragment>
        )

    }
    else {
        form = (
            <React.Fragment>
                <Grid item xs={6}>
                    <Button variant="outlined" onClick={handleKide}>ילד\ה</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" onClick={handleUsers}>פסיכולוג\מדריך</Button>
                </Grid>
                <ErrorModal error={error} onClear={clearError} />
                <Card className="authentication">
                    <hr />
                    <form onSubmit={authSubmitHandler}>
                        <Input
                            element="input"
                            id="name"
                            type="text"
                            label="Your Name"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please enter a name."
                            onInput={inputHandler}
                        />

                        <Input
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
                        />
                        <Button type="submit" disabled={!formState.isValid}>
                            SIGNUP
                        </Button>
                    </form>
                </Card>
            </React.Fragment>
        )
    }
    return (
        <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
            <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {form}
                </Grid>
            </Typography>
        </Paper>
    );

}

export default ContentAddUser;