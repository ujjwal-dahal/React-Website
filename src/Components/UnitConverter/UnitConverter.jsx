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

  const convertLength = (value) => {
    if (!value) return;
    let feet, meters;
    if (lengthUnit === 'meters') {
      feet = value * 3.28084;
      meters = value;
    } else {
      meters = value / 3.28084;
      feet = value;
    }
    setLengthResult(`Feet: ${feet.toFixed(2)} ft, Meters: ${meters.toFixed(2)} m`);
  };

  const convertWeight = (value) => {
    if (!value) return;
    let pounds, kilograms;
    if (weightUnit === 'kilograms') {
      pounds = value * 2.20462;
      kilograms = value;
    } else {
      kilograms = value / 2.20462;
      pounds = value;
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
          onChange={(e) => {
            setLengthValue(e.target.value);
            convertLength(e.target.value);
          }}
          placeholder={`Enter ${lengthUnit === 'meters' ? 'meters' : 'feet'}`}
          className={styles.input}
        />
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
          onChange={(e) => {
            setWeightValue(e.target.value);
            convertWeight(e.target.value);
          }}
          placeholder={`Enter ${weightUnit === 'kilograms' ? 'kilograms' : 'pounds'}`}
          className={styles.input}
        />
        <p>{weightResult}</p>
      </div>
    </div>
  );
};

export default UnitConverter;
