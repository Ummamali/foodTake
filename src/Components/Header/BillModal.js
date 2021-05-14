import React from "react";
import Modal from "../Utils/Modal";

export default function BillModal(props) {
  let total = 0;
  let itemsList = [];
  for (const key in props.itemsData) {
    const item = props.itemsData[key];
    if (item.amount > 0) {
      itemsList.push(
        <BillItem
          name={item.name}
          amount={item.amount}
          price={item.price}
          key={key}
          id={key}
          changeItemsData={props.changeItemsData}
        />
      );
      total += item.price * item.amount;
    }
  }
  return (
    <Modal cancel={props.cancel}>
      <div className="small-card p-6 rounded">
        <div>{itemsList}</div>
        <div className="flex items-center justify-between px-2 py-3 text-lg">
          <h3 className="text-gray-600">Total Amount</h3>
          <p className="text-primary-light font-bold">{total.toFixed(2)}/-</p>
        </div>
        <div className="flex flex-row-reverse mt-4">
          <button
            className="btn bg-primary-light text-white text-opacity-70 tracking-wide rounded font-light"
            onClick={props.onCheckout}
            disabled={total === 0}
          >
            Order
          </button>
          <button className="btn text-gray-600" onClick={props.cancel}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}

// This is a helper component
function BillItem(props) {
  return (
    <div className="bill-item flex items-center justify-between line-down py-3 px-2">
      <div>
        <h2 className="text-2xl text-gray-900 leading-none mb-4">
          {props.name}
        </h2>
        <h3 className="text-primary-light font-medium">{props.price}/-</h3>
      </div>
      <div className="flex items-center">
        <div className="border border-gray-400 p-2 leading-none rounded-sm text-gray-700 font-bold mr-12">
          <p>
            <small>x</small>
            {props.amount}
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            className="box-btn"
            onClick={props.changeItemsData}
            data-key={props.id}
            data-amount="1"
          >
            +
          </button>
          <button
            className="box-btn"
            onClick={props.changeItemsData}
            data-key={props.id}
            data-amount="-1"
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
}
