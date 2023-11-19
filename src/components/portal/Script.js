import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { plane, planeMaterial } from "../portal/Portal";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

let currentRef = null;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(25, 100 / 100, 1, 100);
camera.position.set(20, 30, 20);
camera.lookAt(new THREE.Vector3());
scene.add(camera);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(800, 800);
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1.2

const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.target.set(0, 5, 0)
orbitControls.enableDamping = true;

const resize = () => {
  const { clientWidth, clientHeight } = currentRef;
  renderer.setSize(clientWidth, clientHeight);
  camera.aspect = clientWidth / clientHeight;
  camera.updateProjectionMatrix();
};
window.addEventListener("resize", resize);

scene.add(plane);

// Load model
const gltfLoader = new GLTFLoader()
gltfLoader.load("./portal/Portal.gltf", (gltf) => {
  scene.add(gltf.scene)
})

// Lights
const directionalLight = new THREE.DirectionalLight(0xffffff, 3)
directionalLight.position.set(20, 20, 20)
scene.add(directionalLight)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
scene.add(ambientLight)

const envMap = new THREE.CubeTextureLoader().load([
  "./hdri/px.png",
  "./hdri/nx.png",
  "./hdri/py.png",
  "./hdri/ny.png",
  "./hdri/pz.png",
  "./hdri/nz.png",
])
scene.environment = envMap

// Axes helper
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// Grid helper
const gridHelper = new THREE.GridHelper(10, 10);
scene.add(gridHelper);

const animate = () => {
  planeMaterial.uniforms.uTime.value += 0.05;

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
