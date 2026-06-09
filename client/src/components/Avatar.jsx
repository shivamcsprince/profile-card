import React, { useState } from "react";

const Avatar = ({ src, name, size = 80 }) => {
  const [imgError, setImgError] = useState(false);

  const initials = name
    ? name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase()
    : "?";

  if (!src || imgError) {
    return <div className="avatar-initials">{initials}</div>;
  }

  return (
    <img
      src={src}
      alt={name}
      className="avatar"
      width={size}
      height={size}
      onError={() => setImgError(true)}
    />
  );
};

export default Avatar;
