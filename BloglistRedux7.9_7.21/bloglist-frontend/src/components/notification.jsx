import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => {
    if (!state) {
      return null;
    }
    return state.notification;
  });

  const style = {
    // color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  // console.log(notification);
  return (
    <div
      style={
        notification
          ? {
              display: "block",
              color: notification.typeMessage === "error" ? "red" : "green",
            }
          : { display: "none" }
      }
    >
      {notification ? <div style={style}>{notification.message}</div> : null}
    </div>
  );
};

export default Notification;
