import { useState, useRef } from "react";
import { useNotificationDispatch } from "../../notificationContext";
import { createBlog } from "../request";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Togglable from "../components/togglableLogin";

const CreateNewBlog = ({}) => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();
  const blogFormRef = useRef();

  const newBlogMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(["blogs"], blogs.concat(newBlog));
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

  const addBlogForm = async (newBlog) => {
    newBlogMutation.mutate(newBlog);
    blogFormRef.current.toggleVisibility();
  };

  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });

  const addBlog = (event) => {
    event.preventDefault();
    addBlogForm(newBlog);
    dispatch({
      type: "aCreated",
      payload: `${newBlog.title} has by ${newBlog.author} has been created`,
    });
    setTimeout(() => {
      dispatch({ type: "none", payload: "" });
    }, 4000);
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
