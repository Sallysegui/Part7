import { useState, useEffect, useContext } from "react";
import Blog from "./components/Blog";
import Notification from "./components/notification";
import LoginForm from "./components/loginForm";
import CreateNewBlog from "./components/blogForm";
import UserContext from "../loginContext";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBlogs, setToken, loginBlog, getUsers, getUser } from "./request";

const App = () => {
  const [user, userDispatch] = useContext(UserContext);
  console.log(user);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBLogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      userDispatch({ type: "logged", payload: user });
      setToken(user.token);
    }
  }, []);

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  // console.log(JSON.parse(JSON.stringify(result)));

  if (result.isLoading) {
    return <div>loading data...</div>;
  } else if (result.isError) {
    return (
      <span>anecdote service not available due to problems in server </span>
    );
  }
  const blogs = result.data.sort((a, b) => b.likes - a.likes);

  // const resultUser = useQuery({
  //   queryKey: ["user"],
  //   queryFn: getUser,
  //   refetchOnWindowFocus: false,
  //   retry: 1,
  // });

  // console.log(JSON.parse(JSON.stringify(users)));

  // const user = resultUser.data;
  // console.log(user);

  // const handleLogin = async ({ username, password }) => {
  //   console.log(username);
  //   event.preventDefault();
  //   const user = await userBlog({
  //     username,
  //     password,
  //   });
  //   // window.localStorage.setItem("loggedBLogappUser", JSON.stringify(user));
  //   // setToken(user.token);
  //   // setUser(user);
  // };

  const showBlogs = () => (
    <div>
      <h2>Blogs</h2>
      <div>{user.name} is logged in</div>
      <div>{logOut()}</div>
      <div>
        <CreateNewBlog />
      </div>
      <ul className="blogcontainer">
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} />
        ))}
      </ul>
    </div>
  );

  const logOut = () => {
    return (
      <div>
        <button
          onClick={() => {
            window.localStorage.removeItem("loggedBlogappUser");
            userDispatch({ type: "logout" });
          }}
        >
          Log Out
        </button>
      </div>
    );
  };

  return (
    <div>
      <Notification />
      <div>{!user ? <LoginForm /> : showBlogs()}</div>
      <div></div>
    </div>
  );
};
export default App;
