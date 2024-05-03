import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotificationDispatch } from "../../notificationContext";
//import Togglable from './togglableLogin'
import { setToken, loginBlog } from "../request";
import { useUserDispatch } from "../../loginContext";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();
  const userDispatch = useUserDispatch();

  const loginBlogMutation = useMutation({
    mutationFn: loginBlog,
    onSuccess: (user) => {
      console.log(user);
      window.localStorage.setItem("loggedBLogappUser", JSON.stringify(user));
      setToken(user.token);
      userDispatch({ type: "logged", payload: user });
    },
    onError: (error) => {
      const errorMessage = error.response.data.error;
      console.log(errorMessage);
      dispatch({ type: "error", payload: errorMessage });
      setTimeout(() => {
        dispatch({ type: "none" });
      }, 5000);
    },
  });

  const handleUsernameChange = ({ target }) => {
    setUsername(target.value);
  };
  const handlePasswordChange = ({ target }) => {
    setPassword(target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log({ username, password });
    loginBlogMutation.mutate({ username, password });
    await dispatch({ type: "logged", payload: `${username} has logged in!` });
    setTimeout(() => {
      dispatch({ type: "none", payload: "" });
    }, 4000);
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            username
            <input
              id="username"
              type="name"
              value={username}
              name="Username"
              onChange={handleUsernameChange}
              autoComplete="name"
            />
          </div>
          <div>
            password
            <input
              id="password"
              type="password"
              value={password}
              name="password"
              autoComplete="password"
              onChange={handlePasswordChange}
            />
          </div>
          <button id="login-button" type="submit">
            log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
