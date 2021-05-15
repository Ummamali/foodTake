import React, { useEffect, useRef } from "react";

export default function Nav(props) {
  const amountBoardRef = useRef();
  useEffect(() => {
    amountBoardRef.current.classList.add("bounce");
    amountBoardRef.current.addEventListener("animationend", () => {
      amountBoardRef.current.classList.remove("bounce");
    });
  }, [props.items]);
  return (
    <nav className="bg-primary-dark text-white">
      <div className="contain flex items-center justify-between px-4 py-3">
        <h2 className="logo">
          <i className="fas fa-drumstick-bite"></i>FoodTake
        </h2>
        <button
          className="flex items-center bg-primary-light py-1.5 px-6 rounded-full cursor-pointer shadow-sm"
          onClick={props.activateModal}
          ref={amountBoardRef}
          disabled={!props.hasLoaded}
        >
          <h3 className="text-white text-opacity-70">
            <i className="fas fa-shopping-cart"></i> Your Cart
          </h3>
          <div className="bg-primary-dark px-2 rounded-full text-white text-opacity-70 font-medium ml-3 tracking-wide">
            {props.items}
          </div>
        </button>
      </div>
    </nav>
  );
}
