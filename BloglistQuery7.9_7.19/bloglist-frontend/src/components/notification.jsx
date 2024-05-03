import { useNotificationValue } from "../../notificationContext";

const Notification = () => {
  const notification = useNotificationValue();
  console.log(notification);
  const style = {
    // color: info.type === "error" ? "red" : "green",
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (!notification === true) return null;

  return (
    <div style={style}>
      {/* <div style={style} className={info.type}> */}
      {notification}
    </div>
  );
};

export default Notification;
