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
  const [seconds, setSeconds] = useState({
    initialDuration: 30,
    currentDuration: 30,
  });
  const [isActive, setIsActive] = useState(false);
  const [rest, setRest] = useState({
    initialDuration: 10,
    currentDuration: 10,
  });
  const [rounds, setRounds] = useState({ initialRound: 3, currentRound: 3 });

  // TIMER LOGIC
  const WORK_PHASE = isActive && seconds.currentDuration !== 0;

  const REST_PHASE =
    isActive && rest.currentDuration !== 0 && seconds.currentDuration === 0;

  const ROUND_OVER =
    isActive &&
    seconds.currentDuration === 0 &&
    rest.currentDuration === 0 &&
    rounds.currentRound > 0;

  const WORKOUT_COMPLETE =
    isActive &&
    rounds.currentRound === 0 &&
    seconds.currentDuration === 0 &&
    rest.currentDuration === 0;

  const toggle = () => setIsActive(!isActive);
  const reset = () => {
    setIsActive(false);
    setSeconds((prevState) => ({
      ...prevState,
      currentDuration: prevState.initialDuration,
    }));
    setRest((prevState) => ({
      ...prevState,
      currentDuration: prevState.initialDuration,
    }));
    setRounds((prevState) => ({
      ...prevState,
      currentRound: prevState.initialRound,
    }));
  };

  const handleSetSeconds = (secs) => {
    setSeconds({ initialDuration: secs, currentDuration: secs });
  };
  const handleSetRounds = (rounds) =>
    setRounds({ initialRound: rounds, currentRound: rounds });
  const handleSetRest = (rest) =>
    setRest({ initialDuration: rest, currentDuration: rest });

  useEffect(() => {
    let interval = null;
    if (WORK_PHASE) {
      interval = setInterval(() => {
        setSeconds((prevState) => {
          return { ...prevState, currentDuration: prevState.currentDuration - 1 };
        });
      }, 1000);
    }
    if (REST_PHASE) {
      interval = setInterval(() => {
        setRest((prevState) => {
          return { ...prevState, currentDuration: prevState.currentDuration - 1 };
        });
      }, 1000);
    }
    if (ROUND_OVER) {
      setRounds((prevState) => ({
        ...prevState,
        currentRound: prevState.currentRound - 1,
      }));
      setSeconds((prevState) => ({
        ...prevState,
        currentDuration: prevState.initialDuration,
      }));
      setRest((prevState) => ({
        ...prevState,
        currentDuration: prevState.initialDuration,
      }));
    }
    if (WORKOUT_COMPLETE) {
      setIsActive(false);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, seconds, rest, rounds]);

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
  `;
  const Button = styled.button`
    padding: 0.6rem 1.5rem;
    margin: 40px 0;
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
      <h3>
        {rounds.currentRound} / {rounds.initialRound}
      </h3>
      <Phase>
        {isActive && seconds.currentDuration > 0 ? (
          <h1>WORK</h1>
        ) : isActive && rest.currentDuration > 0 ? (
          <h1>REST</h1>
        ) : !isActive &&
          rounds.currentRound === 0 &&
          rest.currentDuration === 0 &&
          seconds.currentDuration === 0 ? (
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
          value={(rounds.currentRound / rounds.initialRound) * 100}
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
              value={(seconds.currentDuration / seconds.initialDuration) * 100}
              strokeWidth={8}
              text={
                seconds.currentDuration !== 0 && seconds.currentDuration + "s"
              }
              styles={buildStyles({
                trailColor: "transparent",
              })}
            >
              <div style={{ width: "84%" }}>
                <CircularProgressbar
                  value={(rest.currentDuration / rest.initialDuration) * 100}
                  text={
                    seconds.currentDuration == 0 &&
                    rest.currentDuration !== 0 &&
                    rest.currentDuration + "s"
                  }
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
          value={seconds.currentDuration}
          placeholder="set secs"
          type="tel"
          labelFor="work"
          label="seconds"
        />
        <Input
          handler={handleSetRest}
          value={rest.currentDuration}
          type="tel"
          labelFor="rest"
          label="rest"
        />
        <Input
          handler={handleSetRounds}
          value={rounds.currentRound}
          type="tel"
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
