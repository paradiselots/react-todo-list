import React, { useState, useEffect, useCallback } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [expression, setExpression] = useState('');

  const appendToExpression = useCallback((value) => {
    setExpression((prevExpression) => prevExpression + value);
  }, []);

  const calculateResult = useCallback(() => {
    try {
      const result = eval(expression);
      setExpression(result.toString());
    } catch (error) {
      setExpression('');
      alert('Invalid expression');
    }
  }, [expression]);

  const clearExpression = useCallback(() => {
    setExpression('');
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '-':
        case '+':
        case '*':
        case '/':
          appendToExpression(event.key);
          break;
        case 'Enter':
          calculateResult();
          break;
        case 'Delete':
          clearExpression();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [appendToExpression, calculateResult, clearExpression]);

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
        <button className='c' onClick={clearExpression}>Clear/Delete</button>
      </div>
    </div>
  );
};

export default Calculator;
