import React, { forwardRef } from "react";

const FormGroup = forwardRef((props, ref) => {
  let inputLabel = null;
  if (props.label !== undefined) {
    inputLabel = (
      <label htmlFor={props.id} className="group-label">
        {props.label}
      </label>
    );
  }
  let errorMsg = null;
  let addCls = "";
  if (props.isInvalid === true) {
    errorMsg = <small className="text-red-500 italic">{props.errMsg}</small>;
    addCls = "is-invalid";
  }
  return (
    <div className={props.className}>
      {inputLabel}
      <input
        type={props.type}
        className={"group-input " + addCls}
        id={props.id}
        ref={ref}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
        autoComplete="off"
      />
      {errorMsg}
    </div>
  );
});

export default FormGroup;
