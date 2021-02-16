import React, { useState } from 'react';

import './App.css';

function App() {
  const [state, setState] = useState(0);
  return (
    <div className="App">
      <div>{state}</div>
      <button onClick={() => setState((state) => state + 1)}>Incre</button>
      <button onClick={() => setState((state) => state - 1)}>Dec</button>
    </div>
  );
}

export default App;
