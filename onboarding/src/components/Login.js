import React, { useState } from "react";
import {
  Button,
  Typography,
  Container,
  Avatar,
  makeStyles,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Form from "react-bootstrap/Form";
import Navigatepaths from './HOCComponent/Navigatepaths';

function Login(props) {

  const useStyles = makeStyles(
    (theme) => (
      {
        main: {
          marginTop: theme.spacing(10),
          marginLeft: theme.spacing(40)
        },
        paper: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: 'white',
          borderRadius: '15px'
        },
        avatar: {
          margin: theme.spacing(1),
          backgroundColor: theme.palette.secondary.main,
        },
        form: {
          width: 'auto', // Fix IE 11 issue.
          marginTop: theme.spacing(3),
          marginLeft: theme.spacing(2),
          marginRight: theme.spacing(2)
        },
        submit: {
          margin: theme.spacing(2, 4, 6)
        },
      }
    )
  );
  const classes = useStyles();
  const [username, setuser] = useState("");
  const [password, setPassword] = useState("");
  const [logindata, setlogin] = useState([])

  function validateForm() {
    if (username.length > 0 && password.length > 0) {
      fetch('http://localhost:4000/logindata', {
        method: 'get',
        headers: {
          'Content-type': 'application/json'
        }
      }).then(res => res.json()).then(
        data => {
          setlogin(data)
        }
      )
    }
  }

  function handleSubmit(event) {
    let data;
    event.preventDefault();
    logindata.length > 0 ? (
      logindata.map((item) => {
        item.username === username && item.password === password ? (
          data = gotohome(item)
        ) : (
            data = gotologin()
          )
        return data
      }
      )
    ) : (
        console.log("not of length 1")
      )
  }

  const gotohome = (item) => {
    alert("Validated");
    localStorage.setItem("name", item.username);
    props.history.push("/home");
  }

  const gotologin = () => {
    alert("Not Validated")
    props.history.push("/login");
  }

  return (
    <Container component="main" maxWidth="sm" className={classes.main}>

      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login School Admin
        </Typography>
        <Form className={classes.form} onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="username">
            <Form.Control autoFocus placeholder="username" type="username" value={username} onChange={(e) => setuser(e.target.value)} />
          </Form.Group>
          <br />
          <Form.Group size="lg" controlId="password">
            <Form.Control type="password" value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <Button type="submit" variant="contained" color="primary" className={classes.submit}
            disabled={validateForm()}>Sign In </Button>
          <Button type="submit" variant="contained" className={classes.submit} >Reset</Button>
        </Form>
      </div>
    </Container>
  );
}

export default Navigatepaths(Login)