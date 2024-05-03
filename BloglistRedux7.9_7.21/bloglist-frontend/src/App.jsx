import { useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/notification";
import LoginForm from "./components/loginForm";
import CreateNewBlog from "./components/blogForm";
import UsersShow from "./components/users";
import { initializeBlog } from "./reducers/blogReducer";
import { iniciateUser } from "./reducers/loginReducer";
import { removeUser } from "./reducers/loginReducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Nav, Navbar, Button } from "react-bootstrap";
import { initializeUsers } from "./reducers/usersReducer";
import UserFullview from "./components/userFullview";
import BlogView from "./components/blogView";
import { Table } from "react-bootstrap";
import { Container } from "@mui/material";

import {
  Routes,
  Route,
  useParams,
  Link,
  useNavigate,
  useMatch,
} from "react-router-dom";

const App = () => {
  const blogs = useSelector((state) => {
    if (!state) {
      return null;
    }
    return state.blogs;
  });

  const userLogged = useSelector((state) => {
    if (!state) {
      return null;
    } else {
      if (!state.login) {
        return null;
      }
      return state.login;
    }
  });
  console.log(userLogged);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlog());
    dispatch(iniciateUser());
    dispatch(initializeUsers());
  }, []);

  const Userlogging = () => {
    console.log(userLogged);
    if (userLogged) {
      return (
        <div>
          <div> {userLogged.name} is logged in</div>
          <Button onClick={logOut}>Log out </Button>
          {/* <div> </div > */}
        </div>
      );
    } else if (!userLogged) {
      return (
        <div>
          <LoginForm />
        </div>
      );
    }
  };
  const ShowBlogs = () => {
    if (!userLogged) {
      return null;
    }
    return (
      <div>
        <div>
          <CreateNewBlog />
        </div>
        <Table bordered>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id}>
                <Blog key={blog.id} blog={blog} user={userLogged} />
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  };

  const logOut = () => {
    console.log("logout");
    dispatch(removeUser());
    window.localStorage.removeItem("loggedBlogAppUser");
  };

  const padding = {
    padding: 5,
  };
  return (
    <Container>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">
                home
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/blogs">
                blogs
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">
                users
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {/* {userLogged ? (
                <em> {userLogged.name} logged in </em>
              ) : (
                <Link style={padding} to="/login">
                  login
                </Link>
              )} */}

              {/* <div>{userLogged ? <ShowBlogs /> : null}</div> */}
            </Nav.Link>
            {/* <button
              type="submit"
              onClick={() => {
                logOut();
              }}
            >
              logout
            </button> */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Notification />
      <Userlogging />
      <h2>Blog app</h2>

      {/* <Userlogging /> */}
      <div>{!userLogged === null ? <ShowBlogs /> : null}</div>

      <Routes>
        <Route path="/" element={<ShowBlogs />} />
        <Route path="/users/:id" element={<UserFullview />} />
        <Route path="/users" element={<UsersShow />} />
        <Route path="/blogs/:id" element={<BlogView />} />
        <Route path="/blogs" element={<ShowBlogs />} />
      </Routes>
    </Container>
  );
};
export default App;
