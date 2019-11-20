import React from "react";
import { Avatar } from "@material-ui/core";

const AvatarWrapper = props => {
  const { isImg, src, ...others } = props;

  if (isImg) {
    return <Avatar alt="avatar" src={src} {...others} />;
  } else {
    return (
      <Avatar alt="avatar" {...others}>
        {src.split(" ").map((n)=>n[0]).join("")}
      </Avatar>
    );
  }
};

export default AvatarWrapper;
