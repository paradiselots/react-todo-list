import React from 'react'
import { useState } from 'react';
import './Calculator.css';

const Calculator = () => {

    
        const [expression, setExpression] = useState('');
// Declare a state variable "expression" and its setter function "setExpression" using the useState hook.
// The initial value of "expression" is an empty string.
      
        const appendToExpression = (value) => {
          setExpression((prevExpression) => prevExpression + value);
        };
// Define a function "appendToExpression" that takes a value as a parameter.
// It appends the value to the current "expression" by using the setter function "setExpression".
// The setter function is called with a callback that receives the previous expression value and returns the updated value.
      
        const calculateResult = () => {
          try {
            const result = eval(expression);
            setExpression(result.toString());
          } catch (error) {
            setExpression('');
            alert('Invalid expression');
          }
        };
// Define a function "calculateResult" that calculates the result of the expression.
// It uses the "eval" function to evaluate the expression string and stores the result in a variable.
// If the evaluation is successful, the result is converted to a string and set as the new "expression".
// If an error occurs during evaluation, the "expression" is cleared, and an alert is shown with an error message.

      
        const clearExpression = () => {
          setExpression('');
        };
// Define a function "clearExpression" that clears the "expression" by setting it to an empty string.

      
        return (
          <div className="calculator">
            <input type="text" placeholder='0' value={expression} disabled />
            <div className="calculator-buttons">
              <button onClick={() => appendToExpression('0')}>0</button> 
              <button onClick={() => appendToExpression('1')}>1</button>
              <button onClick={() => appendToExpression('2')}>2</button>
              <button onClick={() => appendToExpression('3')}>3</button>
              <button onClick={() => appendToExpression('4')}>4</button>
              <button onClick={() => appendToExpression('5')}>5</button>
              <button onClick={() => appendToExpression('6')}>6</button>
              <button onClick={() => appendToExpression('7')}>7</button>
              <button onClick={() => appendToExpression('8')}>8</button>
              <button onClick={() => appendToExpression('9')}>9</button>
              
              <br></br>
              <br></br>
              
              <button onClick={() => appendToExpression('-')}>-</button>
              <button onClick={() => appendToExpression('+')}>+</button>
              <button onClick={() => appendToExpression('*')}>*</button>
              <button onClick={() => appendToExpression('/')}>/</button>

              <br></br>
              <br></br>
             
              <button className='equals' onClick={calculateResult}>=</button>
              <button className='c' onClick={clearExpression}>C</button>
            </div>
          </div>
        );
      };
      
      export default Calculator;