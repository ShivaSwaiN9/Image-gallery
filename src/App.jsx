import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Gallery from './components/Gallery';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Gallery />} /> 
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
