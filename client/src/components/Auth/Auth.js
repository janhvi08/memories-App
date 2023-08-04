import React, {useState} from 'react';
import {Avatar, Button, Paper, Grid, Typography, Container, responsiveFontSizes} from '@material-ui/core';
import {GoogleLogin} from 'react-google-login';
import {useDispatch} from 'react-redux'; 
import {useNavigate} from 'react-router-dom';

import Icon from './Icon';
import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined'
import useStyles from './styles';
import Input from './Input';
import {signin, signup} from '../../actions/auth';
import {AUTH} from '../../constants/actionTypes'

const initialState = {firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

const SignUp = () => {
    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();
    const history = useNavigate();
    const classes = useStyles();

    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    const switchMode = () => {
        setForm(initialState);
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignup){
            dispatch(signup(form, history));
        }
        else {
            dispatch(signin(form, history));
        }
    };

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
           dispatch({type: 'AUTH', data: {result, token}});
           
           history.push('/')
        } catch (error) {
            console.log(error);
        }
    };

    const googleError = () => {
        console.log("Google Sign In was unsuccessful. Try Again Later");
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value});
    }

  return (
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing ={2}>
                    {
                        isSignup && (
                            <>
                                <Input name="firstname" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastname" label="Last Name" handleChange={handleChange} half />
                            </>
                        )}
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                    { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    {isSignup ? 'Sign Up' : 'Sign In'}
                </Button>
                <GoogleLogin 
                    clientId="986085501567-ngmgadir2sffuu47fkflj3h5lkk6ihjj.apps.googleusercontent.com"
                    render={(renderProps) => (
                        <Button 
                            className={classes.googleButton} 
                            color='primary' 
                            fullWidth 
                            onClick={renderProps.onClick} 
                            disabled={renderProps.disabled} 
                            startIcon={<Icon />} 
                            variant="contained" 
                        >
                            Google Sign In
                        </Button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleError}
                    cookiePolicy="single_host_origin"
                />
                <Grid container justifyContent = "flex-end">
                    <Grid item>
                        <Button onClick={switchMode}>
                            {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>
  );
};

export default AUTH;