import React from 'react';
import './App.css';
import Select from "./components/Select/component";

const App = () => {

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Users
        </p>
        <Select />
      </header>
    </div>
  );
}

export default App;
