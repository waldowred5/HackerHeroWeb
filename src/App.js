import './App.css';
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { HeroCanvas } from './components/HeroCanvas';

const App = () => {
  return (
    <div className="App">
      <Canvas>
        <HeroCanvas />
      </Canvas>
    </div>
  );
};

export default App;
