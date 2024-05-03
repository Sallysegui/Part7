import { useDispatch } from "react-redux";
import { newNotification } from "../reducers/notificationReducer";
import { addLikes } from "../reducers/blogReducer";
import { deletingBlog } from "../reducers/blogReducer";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addStateABlog } from "../reducers/oneBlogReducer";
import CommentForm from "../components/comentForm";

const BlogView = () => {
  const dispatch = useDispatch();
  const id = useParams().id;
  const blogs = useSelector((state) => state.blogs);
  // const blogView = useSelector((state) => state.blogView);
  // if (!blogView) {
  //   return null;
  // }
  const blogView = blogs.find((n) => n.id === String(id));

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const addLike = () => {
    dispatch(addLikes(blogView.id, blogView));
    const notificationObject = {
      message: `you have liked ${blogView.title}`,
      typeMessage: "success",
    };
    dispatch(newNotification(notificationObject, 5));
    dispatch(addStateABlog(id));
  };

  const deleteBlog = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      console.log(blog.id);
      dispatch(deletingBlog(blog.id));
      const notificationObject = {
        message: `you have deleted ${blog.title}`,
        typeMessage: "success",
      };
      dispatch(newNotification(notificationObject, 5));
    }
  };

  const comments = () => {
    if (!blogView) {
      return null;
    }
    console.log(blogView.comments);
    return (
      <div>
        {blogView.comments.map((comment) => (
          <div>{comment}</div>
        ))}
      </div>
    );
  };

  console.log(blogView.comments);
  return (
    <div>
      <h2 className="blogTitle">{blogView.title}</h2>
      <div>{blogView.url}</div>
      <div>
        {blogView.likes} likes <button onClick={addLike}>like</button>
      </div>
      <div>added by {blogView.author}</div>
      <CommentForm blog={blogView} />
      <div>{comments()}</div>
    </div>
  );
};

export default BlogView;
