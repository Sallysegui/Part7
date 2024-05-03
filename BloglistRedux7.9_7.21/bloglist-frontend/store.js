import { configureStore } from "@reduxjs/toolkit";

import blogReducer from "./src/reducers/blogReducer";
import notificationReducer from "./src/reducers/notificationReducer";
import loginReducer from "./src/reducers/loginReducer";
import usersReducer from "./src/reducers/usersReducer";
import userViewReducer from "./src/reducers/userViewReducer";
import blogViewReducer from "./src/reducers/oneBlogReducer";

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    login: loginReducer,
    notification: notificationReducer,
    users: usersReducer,
    userView: userViewReducer,
    blogView: blogViewReducer,
  },
});

export default store;
