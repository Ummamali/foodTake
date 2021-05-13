import React from "react";
import FormGroup from "../Utils/FormGroup";
import Modal from "../Utils/Modal";

export default function OrderForm(props) {
  return (
    <Modal active={props.active} cancel={props.cancel}>
      <div className="bg-white w-big-card py-12 px-8 rounded-sm">
        <div>
          <h2 className="text-3xl text-black text-opacity-80 font-medium">
            Order Information
          </h2>
          <p className="text-black text-opacity-50 text-sm">
            Provide some information about yourself
          </p>
        </div>
        <form>
          <FormGroup label="Name" type="text" />
        </form>
      </div>
    </Modal>
  );
}
