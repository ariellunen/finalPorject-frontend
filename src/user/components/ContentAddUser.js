import React, { useState } from 'react';
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
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { useHttpClient } from '../../shared/hooks/http-hook';
import '../pages/Auth.css';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

const StyledFormControlLabel = styled((props) => <FormControlLabel {...props} />)(
    ({ theme, checked }) => ({
        '.MuiFormControlLabel-label': checked && {
            color: theme.palette.primary.main,
        },
    }),
);

function MyFormControlLabel(props) {
    const radioGroup = useRadioGroup();

    let checked = false;

    if (radioGroup) {
        checked = radioGroup.value === props.value;
    }

    return <StyledFormControlLabel checked={checked} {...props} />;
}

MyFormControlLabel.propTypes = {
    value: PropTypes.any,
};


const ContentAddUser = () => {
    const { error, clearError } = useHttpClient();
    const [userType, setUserType] = useState();

    const [formState, inputHandler] = useForm(
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
            const response = await fetch(`${process.env.REACT_APP_BECKEND_URL}/users/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value,
                    name: formState.inputs.name.value,
                    userType: userType
                })
            });

            const responseData = await response.json();
            console.log(responseData);
            // history.replace('/admin')
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
            <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <ErrorModal error={error} onClear={clearError} />
                    <Card className="authentication">
                        <Typography>הוספת משתמש חדש</Typography>
                        <hr />
                        <form onSubmit={authSubmitHandler}>
                            <Input
                                element="input"
                                id="name"
                                type="text"
                                label="שם המדריך\פסיכולוג"
                                validators={[VALIDATOR_REQUIRE()]}
                                errorText="יש להזין שם משתמש"
                                onInput={inputHandler}
                            />

                            <Input
                                element="input"
                                id="email"
                                type="email"
                                label="אימייל"
                                validators={[VALIDATOR_EMAIL()]}
                                errorText="יש להזין כתובת אימייל תקינה"
                                onInput={inputHandler}
                            />
                            <Input
                                element="input"
                                id="password"
                                type="password"
                                label="סיסמה"
                                validators={[VALIDATOR_MINLENGTH(6)]}
                                errorText="יש להזין סיסמא (לפחות 6 ספרות)"
                                onInput={inputHandler}
                            />
                            <RadioGroup name="use-radio-group" defaultValue="specialist" onChange={(event, value) => { setUserType(value) }}>
                                <MyFormControlLabel value="specialist" label="פסיכולוג\ית" control={<Radio />} />
                                <MyFormControlLabel value="instruction" label="מדריכ\ה" control={<Radio />} />
                            </RadioGroup>
                            <Button type="submit" disabled={!formState.isValid}>
                                הרשמה
                            </Button>
                        </form>
                    </Card>
                </Grid>
            </Typography>
        </Paper>
    );

}

export default ContentAddUser;