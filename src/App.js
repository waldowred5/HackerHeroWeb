import './App.css';
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { RecoilRoot } from 'recoil';
import { GameManager } from './components/GameManager';

const App = () => {
  return (
    <RecoilRoot>
      <div className="App">
        <Canvas
          gl={{ toneMapping: 0 }}
        >
          <camera
            fov={75}
            aspect={window.innerWidth / window.innerHeight}
            near={0.6}
            far={120}
            position={[0, 0, 5]}
          />
          <GameManager />
        </Canvas>
      </div>
    </RecoilRoot>
  );
};

export default App;
