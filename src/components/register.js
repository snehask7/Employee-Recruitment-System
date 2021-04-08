import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
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
        form: {
            width: "100%", 
            marginTop: theme.spacing(1),
            color: "white"
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
        textField: {
            width: '70%',
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingBottom: 0,
            marginTop: 0,
            fontWeight: 300
        },
        input: {
            fontColor: 'white'
        }
    }));

    const [state, setState] = useState({
        Email: '',
        Password: '',
        FirstName:'',
        LastName:'',
        Phone:''
    })

    const { Email, Password,FirstName,LastName,Phone } = state;
    const [loginSpinner, setSpinner] = useState(true)

    useEffect(() => {
    }, [])


    const handleChange = (name) => (event) => {

        setState({ ...state, [name]: event.target.value });  //spread operator
    }

    const handleSubmit = event => {
        setSpinner(false)
        event.preventDefault();
        //axios post and then redirect to signup
    };
    const classes = useStyles();


    return (
        <body style={{ background: '#a6f6f1' }}>
            <Container component="main" maxWidth="sm" >
                <div className={classes.paper} style={{ marginTop: '8rem', height: '40rem', backgroundColor: 'white', padding: '3rem', borderRadius: '20px' }}>
                    <h1 >Register</h1>
                    <form novalidate className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                            variant="outlined"
                            margin="normal"
                            id="outlined"
                            label="First Name"
                            required={true}
                            onChange={handleChange('FirstName')}
                            type="text"
                            fullWidth
                            isRequired="true"
                            value={FirstName}
                            InputLabelProps={{
                                fontSize: 80
                            }}
                            />
                           <TextField
                            variant="outlined"
                            margin="normal"
                            id="outlined"
                            required
                            label="Last Name"
                            onChange={handleChange}
                            type="text"
                            fullWidth
                            value={LastName}
                            InputLabelProps={{
                                fontSize: 30
                            }}
                            onChange={handleChange('LastName')} 
                           />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            id="outlined"
                            label="Email"
                            required
                            onChange={handleChange}
                            type="text"
                            fullWidth
                            value={Email}
                            InputLabelProps={{
                                fontSize: 50
                            }}
                            onChange={handleChange('Email')} />
                          <TextField
                            variant="outlined"
                            margin="normal"
                            id="outlined"
                            required
                            label="Phone"
                            onChange={handleChange}
                            type="text"
                            fullWidth
                            value={Phone}
                            InputLabelProps={{
                                fontSize: 50
                            }}
                            onChange={handleChange('Phone')} />
                        <TextField
                            required
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            value={Password}
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
                                Register
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
