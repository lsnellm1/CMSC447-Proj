"use client"
import React, { useState } from 'react';

const NumberSpinner = () => {
  const [value, setValue] = useState(0);

  //needed to disable temp to run on prod server
  const handleChange = (event: unknown) => {
    //setValue(Number(event.target.value)); // Update state with input value
  };

  return (
      <input
        type="number"
        value={value}
        onChange={handleChange}
      />
  );
};

export default NumberSpinner;