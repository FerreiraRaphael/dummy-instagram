import React from 'react';
import { PhotoList } from './components/PhotoList';
import './App.css';

const App = () => (
  <div className="App">
    <header className="App-header">
      <h1 className="App-title">Welcome to Instasham</h1>
    </header>
    <PhotoList />
  </div>
);

export default App;
