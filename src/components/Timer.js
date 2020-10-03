import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Input from "./Input";
const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [rest, setRest] = useState(10);
  const [rounds, setRounds] = useState(7);

  const toggle = () => setIsActive(!isActive);
  const reset = () => {
    setSeconds(0);
    setIsActive(false);
  };

  const handleSetSeconds = (secs) => setSeconds(secs);
  const handleSetRounds = (rounds) => setRounds(rounds);
  const handleSetRest = (rest) => setRest(rest);

  useEffect(() => {
    let interval = null;
    if (isActive && seconds !== 0) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } 
    
    else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, seconds]);

  const App = styled.button`
    width: 100vw;
    height: 100vh;
    background-color: #282c34;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
  `;

  const Time = styled.div`
    font-size: 3rem;
    padding: 2rem;
  `;

  const Button = styled.button`
    padding: 0.6rem 1.5rem;
    margin: 20px 0.4rem;
    border-radius: 3px;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 0.8rem;
    border-style: groove;

  `;
  return (
    <App>
      <Time>{seconds}s work</Time>
      <div className="row">
        <Input
          handler={handleSetSeconds}
          value={seconds}
          placeholder="set secs"
          type="text"
          labelFor="seconds"
          label="seconds"
        />
        <Time>{rest}s rest</Time>

        <Input
          handler={handleSetRest}
          value={rest}
          type="text"
          labelFor="rest"
          label="rest"
        />
        <Time>{rounds} rounds</Time>

        <Input
          handler={handleSetRounds}
          value={rounds}
          type="text"
          labelFor="rounds"
          label="rounds"
        />
        <Button
          className={`button button-primary button-primary-${
            isActive ? "active" : "inactive"
          }`}
          onClick={toggle}
          >
          {isActive ? "Pause" : "Start"}
        </Button>
        <Button className="button" onClick={reset}>
          Reset
        </Button>
      </div>
    </App>
  );
};

export default Timer;
