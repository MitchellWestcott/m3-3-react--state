import React from "react";
import styled from "styled-components";
import Header from "./Header";
import Button from "./Button";
import Deadman from "./DeadMan";
import DeadLetters from "./DeadLetters";
import TheWord from "./TheWord";
import Keyboard from "./Keyboard";
import GameOverModal from "./GameOverModal";
import {useState} from 'react';
import { colors, contentWidth } from "./GlobalStyles";
import words from "../data/words.json";

const initialGameState = { started: false, over: false, win: false, paused: false };

const App = () => {
  const [game, setGame] = useState(initialGameState);
  const [word, setWord] = useState({str:""});
  const [wrongGuesses, setWrongGuesses] = useState([]);
  const [usedLetters, setUsedLetters] = useState([]);

  const handleStart = () => {
    ((!game.started) ? setGame({...game, started: !game.started}) : setGame({...game, paused: !game.paused}))
    if (!word.str){getNewWord()};
  };
  
  const handleRestart = () => {
    getNewWord();
    setWrongGuesses([]);
    setUsedLetters([]);
    setGame({...initialGameState, started: true});
  }

  const Game = (win) => {
    setGame({...game, over: true, win: true})
  };


  const handleGuess = (letter) => {
    const splitWord = word.str.split("");
    setUsedLetters([...usedLetters, letter]);
    // console.log(letter);

    if(splitWord.includes(letter)) {
      // console.log("hit")
      splitWord.forEach((w, index) => {
        if(letter === w) {
          const newWord = {...word};
          newWord.revealed[index] = letter;
          setWord(newWord);
            }
            })} else {
              const newWrongGuess = [...wrongGuesses];
              newWrongGuess.push(letter);
              setWrongGuesses(newWrongGuess);
  }
}
  
  const getNewWord = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    const revealed = [];

    for (let i = 0; i < randomWord.length; i++) {
      revealed.push("");
    }

    setWord(
        {
        str: randomWord,
        revealed: revealed
        }
    )
  };

  return (
    <Wrapper>
      {/* <GameOverModal /> */}
      <Header />
      <Nav>
        <Button onClickFunc={handleStart}>{game.started ? (!game.paused ? "Pause" : "Continue") : "Start"}</Button>
        <Button onClickFunc={handleRestart}>Reset</Button>
      </Nav>
      {game.started && (
      <>
        <Container>
          <Deadman />
          <RightColumn>
            <DeadLetters wrongGuesses = {wrongGuesses}/>
            <TheWord word = {word}/>
          </RightColumn>
        </Container>
        <Keyboard usedLetters = {usedLetters} handleGuess={handleGuess}/>
      </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${colors.blue};
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
  height: 100vh;
  padding: 0 0 64px 0;
`;
const Nav = styled.div`
  max-width: ${contentWidth};
  display: flex;
  height: 80px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
  max-width: ${contentWidth};
  min-width: 320px;
  position: relative;
  padding: 20px 0;

  @media (min-width: 600px) {
    flex-direction: row;
  }
`;
const RightColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
`;

export default App;
