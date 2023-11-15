import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as dat from "dat.gui";

// Global variables
let currentRef = null;
const gui = new dat.GUI({ width: 400 });
const sceneParams = {
  envMapIntensity: 1,
};

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(25, 100 / 100, 0.1, 100);
scene.add(camera);
camera.position.set(5, 5, 5);
camera.lookAt(new THREE.Vector3());

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap
renderer.setSize(800, 800);

OrbitControls;
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;

// Resize canvas
const resize = () => {
  renderer.setSize(currentRef.clientWidth, currentRef.clientHeight);
  camera.aspect = currentRef.clientWidth / currentRef.clientHeight;
  camera.updateProjectionMatrix();
};
window.addEventListener("resize", resize);

// Animate scene
const animate = () => {
  orbitControls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};
animate();

// Load 3D model
const gltfLoader = new GLTFLoader();
gltfLoader.load(
  "./model/scene.gltf",
  (gltf) => {
    scene.add(gltf.scene);
    castAndReceiveShadows();
  },
  () => {
    console.log("Progress");
  },
  () => {
    console.log("Error");
  }
);

// Cast and receive shadows
const castAndReceiveShadows = () => {
  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
};

// planeBase
const planeBase = new THREE.Mesh(
  new THREE.PlaneGeometry(5, 5),
  new THREE.MeshStandardMaterial()
);
planeBase.rotation.x = Math.PI * -0.5;
planeBase.position.y = -1;
scene.add(planeBase);

// Environment
const folderLights = gui.addFolder("Lights");
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 6, 1);
directionalLight.castShadow = true;
scene.add(directionalLight);
folderLights
  .add(directionalLight, "intensity")
  .min(1)
  .max(10)
  .step(0.01)
  .name("Dl Intensity");

const ambientLight = new THREE.AmbientLight(0xffffff, 0);
scene.add(ambientLight);
folderLights
  .add(ambientLight, "intensity")
  .min(0)
  .max(10)
  .step(0.01)
  .name("Al Intensity");

folderLights.open();

const envMap = new THREE.CubeTextureLoader().load([
  "./envmap/px.png",
  "./envmap/nx.png",
  "./envmap/py.png",
  "./envmap/ny.png",
  "./envmap/pz.png",
  "./envmap/nz.png",
]);
scene.environment = envMap;
folderLights
  .add(sceneParams, "envMapIntensity")
  .min(1)
  .max(10)
  .step(0.01)
  .name("EnvMap Intensity")
  .onChange(() => {
    scene.traverse((child) => {
      if (
        child instanceof THREE.Mesh &&
        child.material instanceof THREE.MeshStandardMaterial
      ) {
        child.material.envMapIntensity = sceneParams.envMapIntensity;
      }
    });
  });

// Cube
// const cube = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial()
// );
// scene.add(cube);

// Init and mount the scene
const initScene = (mountRef) => {
  currentRef = mountRef.current;
  console.log(currentRef);
  currentRef.appendChild(renderer.domElement);
  resize();
};

// Dismount and clean up scene
const cleanUpScene = () => {
  scene.remove();
  currentRef.removeChild(renderer.domElement);
};

export { initScene, cleanUpScene };
