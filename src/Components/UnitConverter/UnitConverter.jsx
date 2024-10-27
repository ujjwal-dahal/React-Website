// src/UnitConverter.js

import React, { useState } from 'react';
import styles from './UnitConverter.module.css';

const UnitConverter = () => {
  const [lengthValue, setLengthValue] = useState('');
  const [weightValue, setWeightValue] = useState('');
  const [lengthResult, setLengthResult] = useState('');
  const [weightResult, setWeightResult] = useState('');

  const convertLength = (value) => {
    if (!value) return;
    const feet = value * 3.28084;
    const meters = value / 3.28084;
    setLengthResult(`Feet: ${feet.toFixed(2)} ft, Meters: ${meters.toFixed(2)} m`);
  };

  const convertWeight = (value) => {
    if (!value) return;
    const pounds = value * 2.20462;
    const kilograms = value / 2.20462;
    setWeightResult(`Pounds: ${pounds.toFixed(2)} lbs, Kilograms: ${kilograms.toFixed(2)} kg`);
  };

  return (
    <div className={styles.container}>
      <h1>Unit Converter</h1>

      <div className={styles.converter}>
        <h2>Length Converter</h2>
        <input
          type="number"
          value={lengthValue}
          onChange={(e) => {
            setLengthValue(e.target.value);
            convertLength(e.target.value);
          }}
          placeholder="Enter meters"
        />
        <p>{lengthResult}</p>
      </div>

      <div className={styles.converter}>
        <h2>Weight Converter</h2>
        <input
          type="number"
          value={weightValue}
          onChange={(e) => {
            setWeightValue(e.target.value);
            convertWeight(e.target.value);
          }}
          placeholder="Enter kilograms"
        />
        <p>{weightResult}</p>
      </div>
    </div>
  );
};

export default UnitConverter;
