// src/App.js
import React from 'react';
import ClickTracker from './ClickTracker';
import './App.css';

const MyComponent = () => (
  <div data-component-name="MyComponent">
    This is MyComponent. Click me to report a bug.
  </div>
);

function App() {
  return (
    <ClickTracker>
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <MyComponent />
        </header>
      </div>
    </ClickTracker>
  );
}

export default App;
