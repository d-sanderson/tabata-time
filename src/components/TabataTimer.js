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
  const [rest, setRest] = useState({ initialDuration: 10, currentDuration: 10 });
  const [rounds, setRounds] = useState({ initialRound: 3, currentRound: 3 });

  const toggle = () => setIsActive(!isActive);
  const reset = () => {
    setIsActive(false);
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
    if (isActive && seconds.currentDuration !== 0) {
      interval = setInterval(() => {
        setSeconds((seconds) => {
          return { ...seconds, currentDuration: seconds.currentDuration - 1 };
        });
      }, 1000);
    }
    if (
      isActive &&
      rest.currentDuration !== 0 &&
      seconds.currentDuration === 0
    ) {
      interval = setInterval(() => {
        setRest((rest) => {
          return { ...rest, currentDuration: rest.currentDuration - 1 };
        });
      }, 1000);
    }
    if (
      isActive &&
      seconds.currentDuration === 0 &&
      rest.currentDuration === 0 &&
      rounds.currentRound > 0
    ) {
 setRounds((prevState) => ({...prevState, currentRound: prevState.currentRound - 1}))
 setSeconds(seconds => ({...seconds, currentDuration: seconds.initialDuration}))
 setRest(seconds => ({...rest, currentDuration: rest.initialDuration}))

    }
    //WORKOUT COMPLETE
    if (
      isActive &&
      rounds.currentRound === 0 &&
      seconds.currentDuration === 0 &&
      rest.currentDuration === 0
    ) {
      setIsActive(false);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, seconds, rest]);

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
      <h3>
        {rounds.currentRound} / {rounds.initialRound}
      </h3>
      <Phase>
        {isActive && seconds.currentDuration > 0 ? (
          <h1>WORK</h1>
        ) : isActive && rest.currentDuration > 0 ? (
          <h1>REST</h1>
        ) : !isActive && rounds.currentRound === 0 && rest.currentDuration === 0 && seconds.currentDuration === 0 ? (
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
          text={
            rest.currentRound !== 0 && seconds.currentDuration === 0
              ? rest.currentDuration + "s"
              : null
          }
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
              text={seconds !== 0 && seconds.currentDuration + "s"}
              styles={buildStyles({
                trailColor: "transparent",
              })}
            >
              <div style={{ width: "84%" }}>
                <CircularProgressbar
                  value={(rest.currentDuration / rest.initialDuration) * 100}
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
