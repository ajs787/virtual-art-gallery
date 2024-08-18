import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import ArtFrame from './ArtFrame';

function App() {
  const sceneRef = useRef();
  const cameraRef = useRef();
  const rendererRef = useRef();
  const containerRef = useRef();
  const [isSceneReady, setIsSceneReady] = useState(false); // For conditionally rendering ArtFrames

  useEffect(() => {
    // Set up the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement);
    }

    // Store references
    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    camera.position.z = 5;

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    // Indicate that the scene is ready
    setIsSceneReady(true);

    // Cleanup
    return () => {
      renderer.dispose();
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <>
      <div ref={containerRef} style={{ width: '100vw', height: '100vh' }} />
      {isSceneReady && (
        <>
          <ArtFrame position={[2, 0, 0]} imageURL="/IMG_0022.JPG" scene={sceneRef.current} />
          <ArtFrame position={[-2, 0, 0]} imageURL="/IMG_2811.jpg" scene={sceneRef.current} />
        </>
      )}
    </>
  );
}

export default App;