import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { newNotification } from "./notificationReducer";
const loginSlice = createSlice({
  name: "loginReducer",
  initialState: [],
  reducers: {
    initializeUser(state, action) {
      console.log(action.payload);
      return action.payload;
    },

    setUserLogin(state, action) {
      console.log(action.payload);
      return action.payload;
    },

    logoutUser(state, action) {
      return null;
    },
  },
});

export const { setUserLogin, initializeUser, logoutUser } = loginSlice.actions;

export const loginStart = (credentials) => {
  return async (dispatch) => {
    const errorObject = {
      message: "wrong credentials",
      typeMessage: "error",
    };
    try {
      const user = await loginService.login(credentials);
      const userObject = { token: user.token, name: user.name };
      console.log(userObject);
      if (userObject) {
        window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
        blogService.setToken(userObject.token);
        dispatch(setUserLogin(userObject));
      }
    } catch (err) {
      console.log(err);
      dispatch(newNotification(errorObject, 4));
    }
  };
};

export const iniciateUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    console.log(loggedUserJSON);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      console.log(user);
      dispatch(initializeUser(user));
      blogService.setToken(user.token);
    }
  };
};

export const removeUser = () => {
  return async (dispatch) => {
    window.localStorage.clear();
    dispatch(logoutUser());
  };
};

export default loginSlice.reducer;
