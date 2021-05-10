import React from "react";
import FoodItem from "./FoodItem";

export default function FoodItems(props) {
    const itemsList = [];
    for (const key in props.itemsData){
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
  return (
    <div className='food-items mx-auto p-6 mt-12 rounded-lg shadow-lg'>
      {itemsList}
    </div>
  );
}
