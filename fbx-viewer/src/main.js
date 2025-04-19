import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158/build/three.module.js';
import { FBXLoader } from 'https://cdn.jsdelivr.net/npm/three@0.158/examples/jsm/loaders/FBXLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.158/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x121212);



const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 20);



const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);



// Lights
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040));



// Controls
const controls = new OrbitControls(camera, renderer.domElement);

// Model list (FBX models)
const modelPaths = [
  './models/ELITE_SOLDIER.fbx',
  'models/ELITE_SOLDIER.fbx',
  'models/model3.fbx',
  'models/model4.fbx'
];

const loader = new FBXLoader();

const gridSize = 2; // 2x2 grid
const spacing = 5;

modelPaths.forEach((path, index) => {
  loader.load(path, (fbx) => {
    fbx.traverse((child) => {
      if (child.isMesh) {
        const origMat = child.material || new THREE.MeshStandardMaterial();
        // Create shaded clone
        const shaded = new THREE.Mesh(child.geometry, origMat);
        // Create wireframe overlay
        const wireframe = new THREE.LineSegments(
          new THREE.EdgesGeometry(child.geometry),

          new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 1 })
        );
        wireframe.position.copy(shaded.position);
        wireframe.rotation.copy(shaded.rotation);
        wireframe.scale.copy(shaded.scale);

        const group = new THREE.Group();
        group.add(shaded);
        group.add(wireframe);

        // Positioning
        const row = Math.floor(index / gridSize);
        const col = index % gridSize;
        group.position.set(col * spacing, 0, row * spacing);

        scene.add(group);
      }
    });
  }, undefined, (error) => {
    console.error('Error loading FBX model:', error);
  });
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
console.log("Main.js is running!");