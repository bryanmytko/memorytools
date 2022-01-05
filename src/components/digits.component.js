import React, { useState } from 'react';
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import { useKey } from "rooks";

const DEFAULT_LENGTH = 10;

const Slider = (props) => (
  <Nouislider range={{ min: 0, max: 100 }} start={[20, 80]} step={1} onSlide={props.onSlide} connect />
);

const Digits = () => {
  const [min, setMin] = useState(20);
  const [max, setMax] = useState(80);
  const [length, setLength] = useState(DEFAULT_LENGTH);
  const [showReady, setShowReady] = useState(false);
  const [showFillIn, setShowFillIn] = useState(false);
  const [randomNumber, setRandomNumber] = useState('');
  const [fillInNumber, setFillInNumber] = useState('_');
  const [fillInNumberPosition, setFillInNumberPosition] = useState(0);

  const onSlide = (range) => {
    setMin(parseInt(range[0]));
    setMax(parseInt(range[1]));
  }

  const generateNumber = () => {
    const randomNumbers = [];

    for(let i = 0; i < length; i++){
      const n = Math.floor(Math.random() * ((max + 1) - min) + min);
      randomNumbers.push(n.toString().padStart(2,'0'));
    }

    setShowReady(true);
    setRandomNumber(randomNumbers.join(''));
  }

  const hideNumber = () => {
    setShowFillIn(true);
    setFillInNumber("_");
  }

  /* @TODO we need to have an and start end state that:
  *  1. Hides the irrelevant UI components
  *  2. Displays x/y result when fill in is complete
  *  3. Maybe also break some of this stuff up and refactor?
  */
  const updateFillInNumber = (e) => {
    if(!showFillIn) return;
    if(fillInNumberPosition > randomNumber.length){
      setShowFillIn(false); // temporary
    }

    const key = e.key;
    const index = fillInNumberPosition;

    if(key === randomNumber[fillInNumberPosition]){
      const newFillInNumber = (fillInNumber + randomNumber[fillInNumberPosition]).replace(/_/, '');
      setFillInNumber(newFillInNumber);
    } else {
      setFillInNumber(`${fillInNumber.replace(/_/, '')}<span class="red">${randomNumber[fillInNumberPosition]}</span>`);
    }

    setFillInNumberPosition(index + 1);
  }

  useKey([0,1,2,3,4,5,6,7,8,9], updateFillInNumber);

  return <>
    <h5>Digits</h5>
    <form id="numberRangeForm" onSubmit={e => e.preventDefault()}>
      <div id="slider">
        <div className="row">Min: <label id="min">{min}</label></div>
        <div className="row">Max: <label id="max">{max}</label></div>
        <div className="row inline">
          <label>Length:</label>
          <div className="input-field inline">
            <input type="text" value={length} className="align-right" onChange={e => setLength(e.target.value)} />
          </div>
        </div>
        <div className="row">
          <Slider onSlide={onSlide} />
        </div>
        <div className="row">
          <button className="btn" onClick={generateNumber}>Generate Number</button>
        </div>
        <div className={`row ${showFillIn ? 'hide' : '' }`}>
          <h1>{randomNumber}</h1>
        </div>
        <div className={`row ${showFillIn ? '' : 'hide' }`}>
          <h1 dangerouslySetInnerHTML={{__html: fillInNumber}}></h1>
        </div>
        <div className={`row ${showReady ? '' : 'hide' }`}>
          <button className="btn" onClick={hideNumber}>Ready?</button>
        </div>
      </div>
    </form>
  </>;
};

export default Digits;
