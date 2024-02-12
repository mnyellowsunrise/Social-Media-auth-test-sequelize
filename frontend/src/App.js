// App.js
import React from 'react';
import Registration from './components/Registration';
import Login from './components/Login';
import Posts from './components/Posts';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* Render Registration Component */}
        <Registration />

        {/* Render Login Component */}
        <Login />

        {/* Render Posts Component */}
        <Posts />
      </header>
    </div>
  );
}

export default App;
