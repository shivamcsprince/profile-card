import React, { useEffect, useState } from "react";

const Toast = ({ message, type = "success", onClose, duration = 2800 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 30);
    const hideTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 400);
    }, duration);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [duration, onClose]);

  const icon = type === "success" ? "✓" : "✕";

  return (
    <div className={`toast toast-${type} ${visible ? "toast-visible" : ""}`}>
      <span>{icon}</span>
      {message}
    </div>
  );
};

export default Toast;
