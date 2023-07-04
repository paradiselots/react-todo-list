import React, { useState } from 'react'
import './Counter.css'



const Counter = () => {
  // Declare a state variable named "count" and set its initial value to 0
  const [count, setCount] = useState(0);

  // Functions to handle button click and update the count
  const incrementCount = () => {
    if (count >= 25) {
      setCount(0);
    } else {
      setCount(count + 1);
    }
  };

  const decrementCount = () => {
    setCount(count - 1);
  };

  const resetButton = () => {
    setCount(0);
  };

  // const multiplyBy10 = () => {
  //   if (count >= 100) {
  //     setCount(0);
  //   } else {
  //     setCount(count * 10);
  //   }
  // };

  return (
    <div className='counter'>
      <p>Count: {count}</p>
      <button onClick={incrementCount}>Increment</button>
    <button onClick={decrementCount}>Decrement</button>
    {/* <button onClick={multiplyBy10}>Multiply by 10</button> */}
    <button onClick={resetButton} className="reset">Reset</button>
    </div>
  );
};

export default Counter;