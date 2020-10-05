import React from "react";
import styled from "@emotion/styled";

const Input = ({ label, labelFor, type, placeholder, value, handler }) => {
  const Input = styled.button`
    width: 35px;
    height: 35px;
    margin: 80px 20px 0 20px;
font-family: "Trebuchet MS", Helvetica, sans-serif
    font-size: 1.5rem;
    font-wedight: bold;
    display: inline-block;
    border-radius: 50%;
    background-color: #f2f0f6;
    box-shadow: -10px -10px 20px 0px rgba(255,255,255,0.05), 10px 10px 20px 0px rgba(0,0,0,0.2)
  }
  `;

  const Label = styled.div`
    text-align: center;
    margin: 10px;
  `;
  return (
    <div>
      <Input
        aria-label={labelFor}
        onClick= {(e) => {
          const duration = prompt(`Enter ${labelFor} duration`);
          if (Number.isInteger(parseInt(duration)))
          handler(parseInt(duration));
        }}
        type={type}
        value={value}
        placeholder={placeholder}
      >{labelFor[0].toUpperCase()}</Input>
    </div>
  );
};

export default Input;
