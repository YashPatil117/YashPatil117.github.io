import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 20, 40);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 20, 10);
scene.add(light);

const ambient = new THREE.AmbientLight(0x404040);
scene.add(ambient);

// FBX Grid Loader
const loader = new FBXLoader();
const modelFiles = [
  'models/ELITE_SOLDIER.FBX',
  'models/model2.fbx',
  'models/model3.fbx',
  'models/model4.fbx',
  // Add more here
];

const spacing = 15;
const modelsPerRow = 3;

modelFiles.forEach((file, index) => {
  loader.load(file, (object) => {
    // Scale it down if needed
    object.scale.set(0.1, 0.1, 0.1);

    const row = Math.floor(index / modelsPerRow);
    const col = index % modelsPerRow;
    object.position.set(col * spacing, 0, row * spacing * -1);

    scene.add(object);
  });
});

// Orbit Controls (optional)
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
const controls = new OrbitControls(camera, renderer.domElement);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Responsive canvas
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
