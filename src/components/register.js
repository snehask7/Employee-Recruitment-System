import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import '../assets/styles/Login.css';

const Register = props => {
  let history = useHistory();

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
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    phone: ''
  })

  const { email, password, firstname, lastname, phone } = state;
  const [loginSpinner, setSpinner] = useState(true)

  useEffect(() => {
  }, [])


  const handleChange = (name) => (event) => {

    setState({ ...state, [name]: event.target.value });  //spread operator
  }

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API}/signup`, state)
      .then(response => {
        if (response.status == 200) {
          alert('Registered Successfully!')
          history.push({
            pathname: `/`,
          });
        }
        else {
          alert('Could not register! Please try again')
        }
      })
      .catch(error => {
        alert('Could not register! Please try again')
      });
  };
  const classes = useStyles();


  return (
    <body style={{ background: '#a6f6f1' }}>
      <Container component="main" maxWidth="sm" >
        <div className={classes.paper} style={{ marginTop: '5rem', height: '40rem', backgroundColor: 'white', padding: '3rem', borderRadius: '20px' }}>
          <h1 >Register</h1>
          <form novalidate className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              id="outlined"
              label="First Name"
              required={true}
              onChange={handleChange('firstname')}
              type="text"
              fullWidth
              isRequired="true"
              value={firstname}
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
              type="text"
              fullWidth
              value={lastname}
              InputLabelProps={{
                fontSize: 30
              }}
              onChange={handleChange('lastname')}
            />
            <TextField
              variant="outlined"
              margin="normal"
              id="outlined"
              label="Email"
              required
              type="text"
              fullWidth
              value={email}
              InputLabelProps={{
                fontSize: 50
              }}
              onChange={handleChange('email')} />
            <TextField
              variant="outlined"
              margin="normal"
              id="outlined"
              required
              label="Phone"
              type="text"
              fullWidth
              value={phone}
              InputLabelProps={{
                fontSize: 50
              }}
              onChange={handleChange('phone')} />
            <TextField
              required
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={handleChange('password')}
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
            </div>
          </form>
        </div>
      </Container>

    </body>
  );
};

export default Register;
