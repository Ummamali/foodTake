import React from "react";
import FormGroup from "../Utils/FormGroup";
import Modal from "../Utils/Modal";

import { useState, useRef, useEffect } from "react";

const defaultInputValidity = {
  fName: undefined,
  lName: undefined,
  userEmail: undefined,
  userLoc: undefined,
};

const inputInvalidators = {
  fName: isEmpty,
  lName: isEmpty,
  userEmail: isNotEmail,
  userLoc: isEmpty,
};

// validators
function isEmpty(value) {
  return value.trim().length === 0;
}

function isNotEmail(value) {
  return !value.includes("@");
}
function inputIsInvalid(inputKey, value) {
  return inputInvalidators[inputKey](value);
}
export default function OrderForm(props) {
  // the majic state about all the
  const [inputValidity, setInputValidity] = useState(defaultInputValidity);
  const [isVisible, setIsVisible] = useState(false);
  const opCls = isVisible ? "opacity-100" : "";
  const inputRefs = {
    fName: useRef(),
    lName: useRef(),
    userEmail: useRef(),
    userLoc: useRef(),
  };
  function submitHandler(e) {
    e.preventDefault();
    let formIsValid = true;
    for (const key in inputValidity) {
      if (inputIsInvalid(key, inputRefs[key].current.value)) {
        formIsValid = false;
        break;
      }
    }
    if (formIsValid) {
      console.log("Form is Valid");
    } else {
      for (const key in inputValidity) {
        validate(key);
      }
    }
  }

  function validate(inputKey) {
    setInputValidity((prev) => {
      const state = { ...prev };
      state[inputKey] = inputIsInvalid(
        inputKey,
        inputRefs[inputKey].current.value
      );
      return state;
    });
  }

  function setValidityToUndefined(inputKey) {
    setInputValidity((prev) => {
      const state = { ...prev };
      state[inputKey] = undefined;
      return state;
    });
  }

  // effects
  useEffect(() => {
    setIsVisible(true);
  }, []);
  return (
    <Modal cancel={props.cancel}>
      <div
        className={
          "bg-white w-big-card py-12 px-12 rounded-sm opacity-0 transOp " +
          opCls
        }
      >
        <div className="mb-4">
          <h2 className="text-3xl text-black text-opacity-80 font-medium">
            Order Information
          </h2>
          <p className="text-black text-opacity-50 text-sm">
            Provide some information about yourself
          </p>
        </div>
        <form onSubmit={submitHandler}>
          <div className="flex space-x-3">
            <FormGroup
              label="First Name"
              type="text"
              id="fName"
              className="flex-1"
              errMsg="You provided invalid Message"
              isInvalid={inputValidity.fName}
              ref={inputRefs.fName}
              onBlur={validate.bind(null, "fName")}
              onFocus={setValidityToUndefined.bind(null, "fName")}
            />
            <FormGroup
              label="Last Name"
              type="text"
              id="lName"
              className="flex-1"
              errMsg="Invalid Last Name has been provided"
              isInvalid={inputValidity.lName}
              ref={inputRefs.lName}
              onBlur={validate.bind(null, "lName")}
              onFocus={setValidityToUndefined.bind(null, "lName")}
            />
          </div>
          <FormGroup
            label="Email"
            type="email"
            id="userEmail"
            className="mt-4"
            errMsg="Invalid Last Name has been provided"
            isInvalid={inputValidity.userEmail}
            ref={inputRefs.userEmail}
            onBlur={validate.bind(null, "userEmail")}
            onFocus={setValidityToUndefined.bind(null, "userEmail")}
          />
          <FormGroup
            label="Location"
            type="text"
            id="userLoc"
            className="mt-4"
            errMsg="Invalid Last Name has been provided"
            isInvalid={inputValidity.userLoc}
            ref={inputRefs.userLoc}
            onBlur={validate.bind(null, "userLoc")}
            onFocus={setValidityToUndefined.bind(null, "userLoc")}
          />
          <div className="flex justify-between items-center mt-6">
            <button className="bg-primary-dark text-white text-opacity-80 px-16 py-3 rounded-sm shadow-sm">
              Place Order
            </button>
            <div className="leading-none text-gray-400 text-opacity-80">
              <p className="text-sm">&copy; Service By Protonium</p>
              <small style={{ fontSize: "12px" }}>
                This is just for catchy design
              </small>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
}
