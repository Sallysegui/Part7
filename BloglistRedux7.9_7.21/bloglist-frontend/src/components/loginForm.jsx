// import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { newNotification } from "../reducers/notificationReducer";
import { loginStart } from "../reducers/loginReducer";
import { Form, Button } from "react-bootstrap";
import TextField from "@mui/material/TextField";

const LoginForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleUsernameChange = ({ target }) => {
    setUsername(target.value);
  };
  const handlePasswordChange = ({ target }) => {
    setPassword(target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const notificationObject = {
      message: `${username} has logged in`,
      typeMessage: "success",
    };
    dispatch(newNotification(notificationObject, 5));
    dispatch(loginStart({ username, password }));
  };

  return (
    <div>
      <div>
        <Form onSubmit={handleSubmit}>
          <TextField
            id="filled-basic"
            label="Filled"
            variant="filled"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
            autoComplete="name"
          />
          <TextField
            id="filled-basic"
            label="Filled"
            type="password"
            variant="filled"
            value={password}
            name="password"
            autoComplete="password"
            onChange={handlePasswordChange}
          />

          <Button type="submit">log in</Button>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
