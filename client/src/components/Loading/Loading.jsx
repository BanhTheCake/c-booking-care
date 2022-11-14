import React from "react";
import './Loading.scss'

const Loading = ({ size = '48px' }) => {
  return <div style={{ width: size }} className="loader-container">
    <span className="loader"></span>
  </div>;
};

export default Loading;
