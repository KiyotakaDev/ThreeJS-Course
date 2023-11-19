import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { plane } from '../shaders/ComplexTextrShadr'

let currentRef = null;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(25, 100 / 100, 1, 100);
camera.position.set(10, 10, 10);
camera.lookAt(new THREE.Vector3());
scene.add(camera);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(800, 800);

const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;

const resize = () => {
  const { clientWidth, clientHeight } = currentRef;
  renderer.setSize(clientWidth, clientHeight);
  camera.aspect = clientWidth / clientHeight;
  camera.updateProjectionMatrix();
};
window.addEventListener("resize", resize);


scene.add(plane);

// Axes helper
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// Grid helper
const gridHelper = new THREE.GridHelper(10, 10);
scene.add(gridHelper);

const animate = () => {
  orbitControls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};
animate();

const mountScene = (mountRef) => {
  currentRef = mountRef.current;
  currentRef.appendChild(renderer.domElement);
  resize();
};

const unmountScene = () => {
  scene.remove();
  currentRef.removeChild(renderer.domElement);
};

export { mountScene, unmountScene };
