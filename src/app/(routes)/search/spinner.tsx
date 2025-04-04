"use client"
import React, { useState } from 'react';

const NumberSpinner = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: any) => {
    setValue(Number(event.target.value)); // Update state with input value
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