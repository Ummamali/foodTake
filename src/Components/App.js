import React, { useState } from "react";
import ReactDOM from "react-dom";

// components
import Nav from "./Header/Nav";
import Backdrop from "./Header/Backdrop";
import Note from "./Header/Note";
import FoodItems from "./FoodItems/FoodItems";
import BillModal from "./Header/BillModal";
import OrderFormModal from "./Header/OrderFormModal";

// data
import itemsDataDefault from "../data";

// This is the root App component
export default function App(props) {
  const [itemsData, setItemsData] = useState(itemsDataDefault);
  const [modalActive, setModalActive] = useState({
    bill: false,
    orderForm: false,
  });
  function cancelModal(modalKey) {
    setModalActive((prev) => {
      const state = { ...prev };
      state[modalKey] = false;
      return state;
    });
  }
  function activateModal(modalKey) {
    setModalActive((prev) => {
      const state = { ...prev };
      state[modalKey] = true;
      return state;
    });
  }

  // this is an event handler
  function changeItemsData(e) {
    const key = e.target.dataset.key;
    const incrementAmount = parseInt(e.target.dataset.amount);
    setItemsData((prev) => {
      const state = { ...prev };
      state[key].amount += incrementAmount;
      return state;
    });
  }
  let total = 0;
  for (const key in itemsData) {
    total += itemsData[key].amount;
  }

  //   This will display the user form to checkout
  function checkoutHandler() {
    activateModal("orderForm");
    cancelModal("bill");
  }
  return (
    <div>
      <BillModal
        active={modalActive.bill}
        cancel={cancelModal.bind(null, "bill")}
        onCheckout={checkoutHandler}
        itemsData={itemsData}
        changeItemsData={changeItemsData}
      />
      <OrderFormModal
        active={modalActive.orderForm}
        cancel={cancelModal.bind(null, "orderForm")}
      />
      <Nav items={total} activateModal={activateModal.bind(null, "bill")} />
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById("independents")
      )}
      <div className="px-4 pb-8">
        <Note />
        <FoodItems itemsData={itemsData} setItemsData={setItemsData} />
      </div>
    </div>
  );
}
