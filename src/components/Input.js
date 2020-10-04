import React from "react";
import styled from "@emotion/styled";

const Input = ({ label, labelFor, type, placeholder, value, handler }) => {

  const Input = styled.input`
    padding: 1rem;
    width: 130px;
    display: block;
    margin: auto;
    border-radius: 3px;
    font-size: 0.8rem;
    background-color: #282c34;
    color: lime;
    font-size: 1.5rem;
    text-align: center;
    font-family: monospace;
  `;

  const Label = styled.div`
  text-align: center;
  margin: 10px;
  `
  return (
    <div>
      <Label htmlFor={labelFor}>set {label}</Label>
      <Input
        aria-label={labelFor}
        onChange={(e) => {
          // validate that input is a number
          if(Number.isInteger(parseInt(e.target.value)))
          handler(parseInt(e.target.value));
        }}
        onKeyDown={e => e.key === "Backspace" ? handler(0) : null}
        type={type}
        value={value}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
