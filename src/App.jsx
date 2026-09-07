import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { ScrollControls } from '@react-three/drei'; 
import ImageTransition from "./ImageTransitionEffect.jsx";
import Model from './model.jsx';
import HeroSection from './hero.jsx';
import CanvasLoader from './Loader.jsx';
import Navbar from './Navbar.jsx';
import Contacts from './Contacts.jsx';
import Experience from './Experience.jsx';
export default function App() {
  return (
    <div id="hero" style={{ width: "100%", height: "100vh" }}>
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.5} />
        <directionalLight intensity={1.5} />
        
        <ScrollControls pages={3} damping={0.1}>
          <Suspense fallback={<CanvasLoader />}>
            <ImageTransition />
            <Model />
            <HeroSection />
          </Suspense>
        </ScrollControls>
      </Canvas>
      <Experience />
      <Contacts />
      <Navbar />
    </div>
  );
}