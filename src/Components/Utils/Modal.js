import React from "react";
import ReactDOM from "react-dom";

export default function Modal(props) {
  return ReactDOM.createPortal(
    <div
      className="h-screen w-screen fixed top-0 left-0"
      style={{ zIndex: "100" }}
    >
      <div
        className="absolute top-0 left-0 h-full w-full bg-black bg-opacity-80"
        onClick={props.cancel}
      ></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {props.children}
      </div>
    </div>,
    document.getElementById("modal")
  );
}
