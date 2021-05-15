import React from "react";
import FoodItem from "./FoodItem";

import loader from "../../media/imgs/loader_dark.gif";

export default function FoodItems(props) {
  let itemsList;
  if (props.itemsData === undefined) {
    itemsList = (
      <img
        src={loader}
        alt="Loading..."
        style={{ width: "50px" }}
        className="loader"
      />
    );
  } else if (props.itemsData === null) {
    itemsList = (
      <div className="text-center text-red-600 font-medium">
        <p>We were unable to load food items.</p>
        <small className="italic font-normal">Try reloading the page</small>
      </div>
    );
  } else {
    itemsList = [];
    for (const key in props.itemsData) {
      const item = props.itemsData[key];
      itemsList.push(
        <FoodItem
          name={item.name}
          abstract={item.abstract}
          price={item.price}
          amount={item.amount}
          setItemsData={props.setItemsData}
          key={key}
          id={key}
        />
      );
    }
  }
  return (
    <div className="food-items mx-auto p-6 mt-12 rounded-lg shadow-lg">
      {itemsList}
    </div>
  );
}
