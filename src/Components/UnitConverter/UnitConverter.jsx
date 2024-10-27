// src/UnitConverter.js

import React, { useState } from 'react';
import styles from './UnitConverter.module.css';

const UnitConverter = () => {
  const [lengthValue, setLengthValue] = useState('');
  const [weightValue, setWeightValue] = useState('');
  const [lengthResult, setLengthResult] = useState('');
  const [weightResult, setWeightResult] = useState('');
  const [lengthUnit, setLengthUnit] = useState('meters');
  const [weightUnit, setWeightUnit] = useState('kilograms');

  const convertLength = () => {
    if (!lengthValue) return;
    let feet, meters;
    if (lengthUnit === 'meters') {
      feet = lengthValue * 3.28084;
      meters = lengthValue;
    } else {
      meters = lengthValue / 3.28084;
      feet = lengthValue;
    }
    setLengthResult(`Feet: ${feet.toFixed(2)} ft, Meters: ${meters.toFixed(2)} m`);
  };

  const convertWeight = () => {
    if (!weightValue) return;
    let pounds, kilograms;
    if (weightUnit === 'kilograms') {
      pounds = weightValue * 2.20462;
      kilograms = weightValue;
    } else {
      kilograms = weightValue / 2.20462;
      pounds = weightValue;
    }
    setWeightResult(`Pounds: ${pounds.toFixed(2)} lbs, Kilograms: ${kilograms.toFixed(2)} kg`);
  };

  return (
    <div className={styles.container}>
      <h1>Unit Converter</h1>

      <div className={styles.converter}>
        <h2>Length Converter</h2>
        <select value={lengthUnit} onChange={(e) => setLengthUnit(e.target.value)} className={styles.select}>
          <option value="meters">Meters to Feet</option>
          <option value="feet">Feet to Meters</option>
        </select>
        <input
          type="number"
          value={lengthValue}
          onChange={(e) => setLengthValue(e.target.value)}
          placeholder={`Enter ${lengthUnit === 'meters' ? 'meters' : 'feet'}`}
          className={styles.input}
        />
        <button onClick={convertLength} className={styles.button}>Convert</button>
        <p>{lengthResult}</p>
      </div>

      <div className={styles.converter}>
        <h2>Weight Converter</h2>
        <select value={weightUnit} onChange={(e) => setWeightUnit(e.target.value)} className={styles.select}>
          <option value="kilograms">Kilograms to Pounds</option>
          <option value="pounds">Pounds to Kilograms</option>
        </select>
        <input
          type="number"
          value={weightValue}
          onChange={(e) => setWeightValue(e.target.value)}
          placeholder={`Enter ${weightUnit === 'kilograms' ? 'kilograms' : 'pounds'}`}
          className={styles.input}
        />
        <button onClick={convertWeight} className={styles.button}>Convert</button>
        <p>{weightResult}</p>
      </div>
    </div>
  );
};

export default UnitConverter;
