import React, { useState, useEffect } from "react";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styled from "@emotion/styled";
import Input from "./Input";
const TabataTimer = () => {
  const [seconds, setSeconds] = useState(30);
  const [isActive, setIsActive] = useState(false);
  const [rest, setRest] = useState(10);
  const [rounds, setRounds] = useState(8);

  const toggle = () => setIsActive(!isActive);
  const reset = () => {
    setSeconds(30);
    setRest(10);
    setRounds(7);
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
    if (isActive && rest !== 0 && seconds === 0) {
      interval = setInterval(() => {
        setRest((rest) => rest - 1);
      }, 1000);
    }
    if (isActive && seconds === 0 && rest === 0 && rounds > 0) {
      setRounds((rounds) => rounds - 1);
      setSeconds(30);
      setRest(10);
    }
    //WORKOUT COMPLETE
    if (isActive && rounds === 0 && seconds === 0 && rest === 0) {
      setIsActive(false);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, seconds, rounds, rest]);

  const App = styled.div`
    width: 100vw;
    height: 100vh;
    font-family: Arial;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
    background: #303a41;
  `;
  const Container = styled.div`
    width: 250px;
    background: #303a41;
    border-radius: 130px;
    transform: box-shadow ease-in-out;

    box-shadow: ${isActive
      ? `
      -14px -14px 40px 0px #fff9,
      -8px -8px 10px 0px #fff9,
      14px 14px 40px 0px #0002,
      16px 16px 10px 0px #0001,
      inset 0px 0px 0px 0px #fff9,
      inset 0px 0px 0px 0px #0001,
      inset 0px 0px 0px 0px #fff9,
      inset 0px 0px 0px 0px #0001;`
      : `
      -7px -7px 20px 0px #fff9,
      -4px -4px 5px 0px #fff9,
      7px 7px 20px 0px #0002,
      4px 4px 5px 0px #0001,
      inset 0px 0px 0px 0px #fff9,
      inset 0px 0px 0px 0px #0001,
      inset 0px 0px 0px 0px #fff9,
      inset 0px 0px 0px 0px #0001;`};
  `;
  const Button = styled.button`
    padding: 0.6rem 1.5rem;
    margin: 80px 0.4rem;
    border-radius: 3px;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 0.8rem;
    border-style: groove;
    background-color: white;
    color: black;
  `;

  const Phase = styled.div`
    margin: 0 0 40px 0;
  `;
  const Flex = styled.div`
    display: flex;
    flex-direction: row;
  `;
  return (
    <App>
      <h3>{rounds} / 8</h3>
      <Phase>
        {isActive && seconds > 0 ? (
          <h1>WORK</h1>
        ) : isActive && rest > 0 ? (
          <h1>REST</h1>
        ) : !isActive && rounds === 0 && rest === 0 && seconds === 0 ? (
          <h1>DONE</h1>
        ) : (
          <h1>BEGIN</h1>
        )}
      </Phase>
      {/* {isActive && (
        <Time>
          <Number>{seconds}</Number>s work
        </Time>
      )} */}

      <Container>
        <CircularProgressbarWithChildren
          value={(rounds / 8) * 90}
          text={rest !== 0 && seconds === 0 ? rest + "s" : null}
          strokeWidth={8}
          styles={buildStyles({
            pathColor: "yellow",
            trailColor: "transparent",
          })}
        >
          {/*
          Width here needs to be (100 - 2 * strokeWidth)% 
          in order to fit exactly inside the outer progressbar.
        */}
          <div style={{ width: "84%" }}>
            <CircularProgressbarWithChildren
              value={(seconds / 30) * 70}
              strokeWidth={8}
              text={seconds !== 0 && seconds + "s"}
              styles={buildStyles({
                trailColor: "transparent",
              })}
            >
              <div style={{ width: "84%" }}>
                <CircularProgressbar
                  value={(rest / 10) * 50}
                  styles={buildStyles({
                    pathColor: "green",
                    trailColor: "transparent",
                  })}
                />
              </div>
            </CircularProgressbarWithChildren>
          </div>
        </CircularProgressbarWithChildren>
      </Container>

      <Flex>
        <Input
          handler={handleSetSeconds}
          value={seconds}
          placeholder="set secs"
          type="button"
          labelFor="work"
          label="seconds"
        />
        <Input
          handler={handleSetRest}
          value={rest}
          type="button"
          labelFor="rest"
          label="rest"
        />
        <Input
          handler={handleSetRounds}
          value={rounds}
          type="button"
          labelFor="rounds"
          label="rounds"
        />
      </Flex>

      <Flex>
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
      </Flex>
    </App>
  );
};

export default TabataTimer;
