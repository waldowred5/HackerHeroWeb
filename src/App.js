import './App.css';
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { HeroCanvas } from './components/HeroCanvas';

const App = () => {
  return (
    <div className="App">
      <Canvas
        gl={{ toneMapping: 0 }}
      >
        <camera
          fov={75}
          aspect={window.innerWidth / window.innerHeight}
          near={0.6}
          far={120}
        />
        <HeroCanvas />
      </Canvas>
    </div>
  );
};

export default App;
