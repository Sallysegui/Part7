import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { newNotification } from "../reducers/notificationReducer";
import { createBlog } from "../reducers/blogReducer";
import Togglable from "../components/togglableLogin";


const CreateNewBlog = () => {
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });
  const dispatch = useDispatch();
  const blogFormRef = useRef();

  const addBlog = (event) => {
    event.preventDefault();
    blogFormRef.current.toggleVisibility();
    dispatch(createBlog(newBlog));
    
    const notificationObject = {
      message: `${newBlog.title} by ${newBlog.author} was added sucessfullyyyy`,
      typeMessage: "success",
    };
    dispatch(newNotification(notificationObject, 5));
    setNewBlog({ title: "", author: "", url: "" });
  };

  return (
    <div>
      <Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
        <form onSubmit={addBlog}>
          <div className="addTitle">
            Title:
            <input
              id="title"
              value={newBlog.title}
              name="newBlog.title"
              placeholder="title"
              onChange={({ target }) =>
                setNewBlog({ ...newBlog, title: target.value })
              }
              className="title"
            />
          </div>
          <div>
            Author:
            <input
              id="author"
              value={newBlog.author}
              name="newBlog.author"
              onChange={({ target }) =>
                setNewBlog({ ...newBlog, author: target.value })
              }
            />
          </div>
          <div>
            Url:
            <input
              id="url"
              value={newBlog.url}
              name="newBlog.url"
              onChange={({ target }) =>
                setNewBlog({ ...newBlog, url: target.value })
              }
            />
          </div>
          <br />
          <button id="createBlog_button" type="submit">
            create
          </button>
        </form>
      </Togglable>
    </div>
  );
};

export default CreateNewBlog;
