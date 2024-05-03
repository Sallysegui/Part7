import { useSelector } from "react-redux";
import UserShow from "./userShow";
import UserFullview from "./userFullview";
// import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UsersShow = () => {
  const userView = useSelector((state) => {
    if (!state) {
      return null;
    }
    return state.userView;
  });

  const users = useSelector((state) => {
    if (!state) {
      return null;
    }
    return state.users;
  });
  // console.log(userView);

  return (
    <div>
      <h2>Users</h2>
      <h2>Blogs created</h2>
      {/* 
      {!userView ? (
        users.map((user) => (
          <Link to={`users/${user.id}`}>
            <UserShow key={user.id} user={user} />
          </Link>
        ))
      ) : (
        <UserFullview userView={userView} />
      )} */}

      {users.map((user) => (
        <Link key={user.id} to={`/users/:${user.id}`}>
          <UserShow key={user.id} user={user} />
        </Link>
      ))}
      <div></div>
    </div>
  );
};

export default UsersShow;
