import React, { useState } from 'react';
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";

const DEFAULT_LENGTH = 10;

const Slider = (props) => (
  <Nouislider range={{ min: 0, max: 100 }} start={[20, 80]} step={1} onSlide={props.onSlide} connect />
);

const Digits = () => {
  const [min, setMin] = useState(20);
  const [max, setMax] = useState(80);
  const [length, setLength] = useState(DEFAULT_LENGTH);
  const [randomNumber, setRandomNumber] = useState('');

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

    setRandomNumber(randomNumbers.join(''));
  }

  return <>
    <h5>Digits</h5>
    <form id="numberRangeForm" onSubmit={e => e.preventDefault()}>
      <div id="slider">
        <div className="row">Min: <label id="min">{min}</label></div>
        <div className="row">Max: <label id="max">{max}</label></div>
        <div className="row inline">
          <label>Length:</label>
          <div class="input-field inline">
            <input type="text" value={length} className="align-right" onChange={e => setLength(e.target.value)} />
          </div>
        </div>
        <div className="row">
          <Slider onSlide={onSlide} />
        </div>
        <div className="row">
          <button className="btn" onClick={generateNumber}>Generate Number</button>
        </div>
        <div className="row">
          <input id="randomNumber" value={randomNumber} />
        </div>
      </div>
    </form>
  </>;
};

export default Digits;
