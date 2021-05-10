import React, { useState, useEffect } from "react";

export default function FoodItem(props) {
  const [itemAmount, setItemAmount] = useState(props.amount);
  function commitAmount(){
    const amount = parseInt(itemAmount);
    if (amount >= 0 && !isNaN(amount)){
      props.setItemsData(prev => {
        const state = {...prev};
        state[props.id].amount = parseInt(amount);
        return state;
      });
    }else{
      console.log('Invalid data given');
    }
  }

  // if prop.amount changes
  useEffect(()=>{
    setItemAmount(props.amount);
  }, [props.amount]);

  return (
    <div className="food-item flex items-center justify-between food-item py-4 px-2">
      <div className='header'>
        <div className='mb-2.5'>
            <h3 className="text-xl font-medium text-gray-800 leading-none mb-1">
            {props.name}
            </h3>
            <p className='text-sm leading-none text-gray-700 text-opacity-80 italic'>{props.abstract}</p>
        </div>
        <h2 className='text-lg text-primary-dark font-bold'>{props.price}/-</h2>
      </div>
      <div>
        <div className='flex mb-2'>
          <label htmlFor={`amount-${props.name}`} className='block text-gray-700 mr-3 font-medium'>Amount</label>
          <input
            type="number"
            className='box-input'
            id={`amount-${props.name}`}
            value={itemAmount}
            onChange={(e) => {setItemAmount(e.target.value)}}
          />
        </div>
        <button className='bg-light text-white text-opacity-80 py-1 px-4 w-full rounded-sm' onClick={commitAmount}>
            <i className="fas fa-plus mr-1"></i>Add
        </button>
      </div>
    </div>
  );
}
