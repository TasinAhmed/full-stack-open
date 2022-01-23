import React from "react";

const Notification = ({ error = false, msg }) => {
  if (!msg) return null;

  if (error) {
    return <div className="error">{msg}</div>;
  } else {
    return <div className="success">{msg}</div>;
  }
};

export default Notification;
