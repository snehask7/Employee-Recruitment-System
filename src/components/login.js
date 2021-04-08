import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import '../assets/styles/Login.css';
const Login = props => {

    const useStyles = makeStyles((theme) => ({
        paper: {
            marginTop: theme.spacing(8),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: "100%", 
            marginTop: theme.spacing(1),
            color: "white"
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
        textField: {
            width: '90%',
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingBottom: 0,
            marginTop: 0,
            fontWeight: 500
        },
        input: {
            fontColor: 'white'
        }
    }));

    const [state, setState] = useState({
        Email: '',
        Password: ''
    })

    const { Email, Password } = state;
    const [loginSpinner, setSpinner] = useState(true)

    useEffect(() => {
    }, [])

    const handleChange = (name) => (event) => {

        setState({ ...state, [name]: event.target.value });  //spread operator
    }

    const handleSubmit = event => {
        setSpinner(false)
        event.preventDefault();
        
    };
    const classes = useStyles();

    return (
        <body >
            <Container component="main" maxWidth="xs" >
                <div className={classes.paper} style={{ marginTop: '10rem', height: '30rem', backgroundColor: 'white', padding: '3rem', borderRadius: '20px' }}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <h1 >Sign In</h1>

                    <form className={classes.form} onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            id="outlined"
                            label="Email"
                            required
                            type="text"
                            fullWidth
                            value={Email}
                            onChange={handleChange('Email')} />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="password"
                            label="Password"
                            required
                            type="password"
                            id="password"
                            value={Password}
                            autoComplete="current-password"
                            onChange={handleChange('Password')}
                        />
                        <div class="d-flex align-items-center">
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                style={{ width: '60%', marginLeft: '20%' }}
                                className={classes.submit}
                            >
                                Sign In
            </Button>
                            <Spinner style={{ marginLeft: '2em', color: 'black' }} hidden={loginSpinner} animation="border" />
                        </div>
                    </form>
                </div>
            </Container>

        </body>
    );
};

export default Login;
