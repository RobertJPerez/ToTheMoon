import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface MoonSceneProps {
  width?: number;
  height?: number;
}

const MoonScene: React.FC<MoonSceneProps> = ({
  width = window.innerWidth,
  height = window.innerHeight,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Create a Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });

    // Add a sphere to the scene
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0x888888 });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Position the camera
    camera.position.z = 5;

    // Resize the canvas when the window is resized
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Render the scene
    const animate = () => {
      requestAnimationFrame(animate);
      sphere.rotation.x += 0.01;
      sphere.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    // Clean up the event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, [width, height]);

  return <canvas ref={canvasRef} />;
};

export default MoonScene;
