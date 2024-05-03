// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
import { userFullview } from "../reducers/userViewReducer";
import { useDispatch } from "react-redux";

const UserShow = ({ user }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(userFullview(user));
  };

  return (
    <div>
      <div onClick={handleClick}>
        {user.name}
        {user.blogs.length}
      </div>
    </div>
  );
};

export default UserShow;
