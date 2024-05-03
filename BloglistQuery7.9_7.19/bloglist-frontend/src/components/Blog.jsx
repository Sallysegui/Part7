import { useState } from "react";
import { updateBlog, removeBlog } from "../request";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotificationDispatch } from "../../notificationContext";
//const newBlogsWithout = blogs.filter((item) => item.id === id);

const Blog = ({ blog, user }) => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  const removeBlogMutation = useMutation({
    mutationFn: removeBlog,
    onSuccess: () => {
      const id = blog.id;
      console.log(id);
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(
        ["blogs"],
        blogs.filter((item) => item.id != id)
      );
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

  const [visibleDet, setVisibleDet] = useState(false);

  const hideWhenVisible = { display: visibleDet ? "none" : "" };
  const showWhenVisible = { display: visibleDet ? "" : "none" };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleVisibilityDet = () => {
    setVisibleDet(!visibleDet);
  };

  // const deleteBlog = () => {
  //   removeBlog(blog.id, blog.title, blog.author);
  // };

  const handleDelete = async () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.title}`)) {
      // await removeBlog(blog.id);

      await removeBlogMutation.mutate(blog.id);

      //const newBlogsWithout = blogs.filter((item) => item.id === id);
      dispatch({
        type: "remove",
        payload: `${blog.title} has by ${blog.title} has been deleted`,
      });
      setTimeout(() => {
        dispatch({ type: "none", payload: "" });
      }, 4000);
    }
  };

  const updateBlogMutation = useMutation({
    mutationFn: updateBlog,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      const id = updatedBlog.id;
      const updatedBlogs = blogs.map((a) => (a.id !== id ? a : updatedBlog));
      queryClient.setQueryData(["blogs"], updatedBlogs);
    },
  });

  const handleLike = async () => {
    console.log(blog);
    updateBlogMutation.mutate({ ...blog });
    console.log("liked");
    console.log(blog);
    await dispatch({
      type: "liked",
      payload: `You have liked ${blog.title}!`,
    });
    setTimeout(() => {
      dispatch({ type: "none" });
    }, 5000);
  };

  return (
    <li style={blogStyle} className="bloging">
      <div className="blogTitle">
        {blog.title} {blog.author}
      </div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibilityDet}>show more</button>
      </div>
      <button style={showWhenVisible} onClick={toggleVisibilityDet}>
        Hide
      </button>
      <div style={showWhenVisible} className="togglableContent">
        Details:
        <div>{blog.url}</div>
        <div id="likesshow">
          likes:{blog.likes}
          <button onClick={handleLike}>like</button>
        </div>
        <div>user:{blog.user.name}</div>
        <div>
          {blog.user.name === user.name ? (
            <button onClick={handleDelete}>remove</button>
          ) : null}
        </div>
      </div>
    </li>
  );
};

export default Blog;
