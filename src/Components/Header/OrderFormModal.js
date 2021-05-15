import React from "react";
import FormGroup from "../Utils/FormGroup";
import Modal from "../Utils/Modal";

import { useState, useRef, useEffect } from "react";
import useRequest from "../../hooks/useRequest";

import loader from "../../media/imgs/loader_light.gif";

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
export default function OrderFormModal(props) {
  // the majic state about all the inputs and their invalidity
  const [inputValidity, setInputValidity] = useState(defaultInputValidity);
  const [isVisible, setIsVisible] = useState(false);
  const opCls = isVisible ? "opacity-100" : "";
  const inputRefs = {
    fName: useRef(),
    lName: useRef(),
    userEmail: useRef(),
    userLoc: useRef(),
  };
  const [postData, sendPost] = useRequest("POST");
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
      sendPost({
        route: "/order",
        body: { username: inputRefs.fName.current.value },
      });
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
        <button
          className="absolute top-8 right-8 text-gray-600"
          onClick={props.cancel}
        >
          <i className="fas fa-times"></i>
        </button>
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
          <div className="flex items-center mt-6">
            {postData.status === 2 ? null : (
              <button
                className="bg-primary-dark text-white text-opacity-80 px-10 py-3 rounded-sm shadow-sm flex items-center justify-center disable-opacity-80"
                disabled={postData.status === 1}
              >
                {postData.status === 1 ? (
                  <img
                    src={loader}
                    alt="Loading..."
                    style={{ width: "25px" }}
                    className="mr-1"
                  />
                ) : null}
                {postData.status === 1 ? (
                  <span className="italic">Ordering...</span>
                ) : (
                  <span>Place Order</span>
                )}
              </button>
            )}
            {getPostFeedback(postData.status)}
            <div className="leading-none text-gray-400 text-opacity-80 ml-auto">
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

// the function below just gives various feedback <p> on different post states this helper function has only been used in the submit button of above form
function getPostFeedback(status) {
  if (status === 2) {
    return (
      <p className="text-primary-light ml-2 text-2xl font-light">
        <i className="fas fa-check"></i> Your order has been placed
      </p>
    );
  } else if (status === 3 || status === 4) {
    return (
      <p className="text-red-500 ml-2 italic">
        <i className="fas fa-times"></i> Your order has not been placed
      </p>
    );
  } else {
    return null;
  }
}
