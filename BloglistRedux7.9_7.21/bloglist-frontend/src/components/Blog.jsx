// import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addStateABlog } from "../reducers/oneBlogReducer";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addStateABlog(blog.id));
  };

  return (
    <>
      {/* <Table striped>
        <tbody> */}
      <td>
        <Link to={`/blogs/${blog.id}`} onClick={handleClick}>
          {blog.title}
        </Link>
      </td>
      <td>
        <Link to={`/blogs/${blog.id}`} onClick={handleClick}>
          {blog.author}
        </Link>
      </td>
      {/* </tbody>
      </Table> */}
    </>
  );
};

export default Blog;
