import React from "react";

export default function FormGroup(props) {
  let inputLabel = null;
  if (props.label !== undefined) {
    inputLabel = (
      <label htmlFor={props.id} className="group-label">
        {props.label}
      </label>
    );
  }
  return (
    <div>
      {inputLabel}
      <input type={props.type} className="group-input" />
    </div>
  );
}
