import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { envMap } from "../lights/Lights";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

let currentMount;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  25,
  100/ 100,
  0.1,
  1000
);
camera.position.z = 8;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.y = 1.5;
controls.enableDamping = true;

// Resize
const resize = () => {
  renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
  camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
  camera.updateProjectionMatrix();
};
window.addEventListener("resize", resize);

// Loader
const gltfLoader = new GLTFLoader();
gltfLoader.load("./model/amongus.gltf", (gltf) => {
  scene.add(gltf.scene);
});

// Ligth
scene.environment = envMap;
scene.background = envMap;

// Render the scene
const animate = () => {
  // update for damping
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};
animate();

// Mount scene
const mountScene = ({ current }) => {
  currentMount = current
  currentMount.appendChild(renderer.domElement);
  resize()
}

// Clean up
const cleanUpScene = () => {
  currentMount.removeChild(renderer.domElement)
}

export { mountScene, cleanUpScene }