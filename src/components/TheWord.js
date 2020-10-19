import React from "react";
import styled from "styled-components";


const TheWord = (props) => {
  // console.log(word);
  //const {word} = props
  //return <Wrapper>{word.revealed.map(l) => {return "___ "}}</Wrapper>
  const {word} = props;
  return (
    <Wrapper>
      {word.revealed.map((letter) => {
        return (
          <Span line = {!letter}>
            {letter}
          </Span>
        )
      })}
    </Wrapper>
  );
};
//   return (
//   <Wrapper>{word.revealed.map((letter) => {
//     return <Span line={ (letter === "") ? true : false }>{letter}</Span>
//   })}</Wrapper>;
  
// }


const Wrapper = styled.p`
  font-size: 20px;
  font-weight: 700;
  margin: 0 auto;
  display: flex;
`;
const Span = styled.span`
  display: block;
  border-bottom: ${(props) => (props.line ? "2px solid white" : "none")};
  width: 30px;
  margin: 0 3px;
  text-align: center;
`;

const Paragraph = styled.p`
  margin: 0 3px;
`

export default TheWord;
