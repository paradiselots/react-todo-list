
import './App.css';
import Counter from './Components/Counter/Counter';
import Calculator from './Components/Calculator/Calculator';
import Todo from './Components/To-do-list/todo';


function App() {
  return (
    <div className="App">
      <Counter />
      <br></br>
      <hr></hr>
      <br></br>
      <Calculator />
      <br></br>
      <hr></hr>
      <br></br>
      <Todo />
    </div>
  );
}

export default App;
