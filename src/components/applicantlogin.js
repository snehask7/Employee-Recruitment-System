import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';
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
            width: "100%", // Fix IE 11 issue.
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
        },
        notchedOutline: {
            borderWidth: "1px",
            borderColor: "white !important"
        }

    }));

    const [state, setState] = useState({
        Email: '',
        Password: ''
    })

    const { Email, Password } = state;
    const [loginSpinner, setSpinner] = useState(true)

    useEffect(() => {
        var DisplayName = Cookies.get("DisplayName");
        if (DisplayName !== "")
            window.location.reload()
        Cookies.set("DisplayName", "");
    }, [])

    const fetchDetails = () => {
        Cookies.set("UserID", "");
        var userID = Cookies.get("UserID");
        axios.get(`${process.env.REACT_APP_API}/getLogin`, {
            params: {
                userID
            }
        }
        )
            .then(response => {
                const UserID = response.data[0].UserID;
                Cookies.set('UserID', UserID)
                window.location.reload()

            })
            .catch(err => alert(err));
    }



    const handleChange = (name) => (event) => {

        setState({ ...state, [name]: event.target.value });  //spread operator
    }

    const handleSubmit = event => {
        setSpinner(false)
        event.preventDefault();
        console.table({ Email, Password });
        axios
            .post(`${process.env.REACT_APP_API}/login`, { Email, Password })
            .then(response => {
                if (response.data !== 0) {
                    Cookies.set("ID", response.data);
                    fetchDetails();
                    props.history.push({
                        pathname: `/applicantdashboard`,
                    });
                }
                else {
                    alert('Invalid Credentials!'); 
                    setSpinner(true)
                    setState({...state,Password:''})
                }

            })
            .catch(error => {
                alert(error);
            });
    };
    const classes = useStyles();


    return (
        <body style={{ background: '#a6f6f1' }}>
            <Container component="main" maxWidth="xs" >
                <div className={classes.paper} style={{ marginTop: '10rem', height: '30rem', backgroundColor: 'white', padding: '3rem', borderRadius: '20px' }}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <h1 >Sign In</h1>

                    <Form className={classes.form} onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            id="outlined"
                            label={<h5>Email*</h5>}
                            onChange={handleChange}
                            type="text"
                            fullWidth
                            value={Email}
                            // InputProps={{
                            //     style: {
                            //         color: "white"
                            //     },
                            //     classes: {
                            //         notchedOutline: classes.notchedOutline
                            //     }
                            // }}
                            InputLabelProps={{
                                shrink: true,
                                // style: { color: '#fff' },
                                fontSize: 30
                            }}
                            onChange={handleChange('Email')} />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="password"
                            label={<h5>Password*</h5>}
                            type="password"
                            id="password"
                            value={Password}
                            InputLabelProps={{
                                shrink: true,
                                // style: { color: '#fff' },
                            }}
                            autoComplete="current-password"
                            onChange={handleChange('Password')}
                        // InputProps={{
                        //     style: {
                        //         color: "white"
                        //     },
                        //     classes: {
                        //         notchedOutline: classes.notchedOutline
                        //     }
                        // }}
                        />
                        <div class="d-flex align-items-center">
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                style={{ width: '60%', marginLeft: '20%' }}
                                className={classes.submit}
                                onClick={handleSubmit}
                            >
                                Sign In
            </Button>
                            <Spinner style={{ marginLeft: '2em', color: 'black' }} hidden={loginSpinner} animation="border" />
                        </div>
                        <h5  style={{color:'black',textAlign:'center'}}>New user? <Link to="/register"><span style={{color:'#31326f'}}>Sign Up</span></Link></h5>

                    </Form>
                </div>
            </Container>

        </body>
    );
};

export default Login;
