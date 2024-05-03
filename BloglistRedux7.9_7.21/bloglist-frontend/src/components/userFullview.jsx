import { useSelector } from "react-redux";

const UserFullview = () => {
  const userView = useSelector((state) => state.userView);
  if (!userView) {
    return null;
  }
  return (
    <div>
      <h1>{userView.name}</h1>
      <h4>Added blogs</h4>
      <ul>
        {userView.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserFullview;
