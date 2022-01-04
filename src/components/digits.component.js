import React, { useState } from 'react';
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";

const Slider = (props) => (
  <Nouislider range={{ min: 0, max: 100 }} start={[20, 80]} step={1} onSlide={props.onSlide} connect />
);

const Digits = () => {
  const [min, setMin] = useState(20);
  const [max, setMax] = useState(80);

  const onSlide = (range) => {
    setMin(parseInt(range[0]));
    setMax(parseInt(range[1]));
  }

  return <>
    <h5>Digits</h5>
    <form id="numberRangeForm">
      <div id="slider">
        <p>min: <label id="min">{min}</label></p>
        <p>max: <label id="max">{max}</label></p>
        <p>length: <label>10</label></p>
        <Slider onSlide={onSlide} />
      </div>
    </form>
  </>;
};

export default Digits;
