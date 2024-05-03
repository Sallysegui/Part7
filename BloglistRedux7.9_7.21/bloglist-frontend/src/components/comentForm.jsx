import { useState } from "react";
import { useDispatch } from "react-redux";
import { newNotification } from "../reducers/notificationReducer";
import { addComment } from "../reducers/blogReducer";
import { addStateABlog } from "../reducers/oneBlogReducer";

const CommentForm = ({ blog }) => {
  const [newComment, setNewComment] = useState("");
  const dispatch = useDispatch();

  const createComment = (event) => {
    event.preventDefault();
    console.log(blog);
    const newBlogComment = {
      ...blog,
      comments: blog.comments.concat(newComment),
    };

    console.log(newBlogComment);
    dispatch(addComment(newBlogComment.id, newBlogComment));

    const notificationObject = {
      message: `You have added the new comment ${newComment}`,
      typeMessage: "success",
    };
    dispatch(newNotification(notificationObject, 5));
    setNewComment("");
    dispatch(addStateABlog(blog.id));
  };

  return (
    <div>
      <h3>Comments</h3>
      <form onSubmit={createComment}>
        <div className="addComment">
          Add comment:
          <input
            value={newComment}
            name="comment"
            placeholder="comment"
            onChange={({ target }) => setNewComment(target.value)}
            className="title"
          />
        </div>

        <br />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default CommentForm;
