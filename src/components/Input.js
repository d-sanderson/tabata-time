import React from "react";
import styled from "@emotion/styled";

const Input = ({ label, labelFor, type, placeholder, value, handler }) => {
  const Input = styled.input`
    width: 35px;
    padding: 1rem;
    height: 35px;
    width: 130px;
    display: block;
font-family: "Trebuchet MS", Helvetica, sans-serif
    margin: auto;
    border-radius: 3px;
    font-size: 0.8rem;
    background-color: #282c34;
    color: lime;
    font-size: 1.5rem;
    font-size: 1.5rem;
    text-align: center;
    font-wedight: bold;
    font-family: monospace;
  `;

  const Label = styled.h3`
  margin: 40px 0 0 0;
  display: grid;
  place-items: center;
  `;
  return (
    <div>
      <Label>{labelFor}</Label>
      <Input
        aria-label={labelFor}
        onChange={(e) => {
          if (Number.isInteger(parseInt(e.target.value)))
            handler(parseInt(e.target.value));
        }}
        type={type}
        value={value}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
