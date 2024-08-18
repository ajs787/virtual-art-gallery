import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

function ArtFrame({ position, imageURL, scene }) {
  const frameRef = useRef();

  useEffect(() => {
    if (!scene) return; // Ensure the scene is available

    // Load the texture and create the mesh when the component mounts
    const loader = new THREE.TextureLoader();
    loader.load(imageURL, (texture) => {
      const material = new THREE.MeshBasicMaterial({ map: texture });
      const geometry = new THREE.PlaneGeometry(1, 1.5);
      const frame = new THREE.Mesh(geometry, material);
      frame.position.set(...position);
      scene.add(frame);

      // Store the mesh reference for later use
      frameRef.current = frame;
    });

    return () => {
      // Cleanup: Remove the mesh from the scene when the component unmounts
      if (frameRef.current) {
        scene.remove(frameRef.current);
      }
    };
  }, [imageURL, position, scene]);

  return null;
}

export default ArtFrame;