import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

let currentRef = null;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(25, 100 / 100, 1, 100);
camera.position.set(5, 5, 5);
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

const animate = () => {
  orbitControls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};
animate();

const planeMaterial = new THREE.ShaderMaterial({
  vertexShader: `
    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    void main() {
      gl_FragColor = vec4(0.0, 1.0, 1.0, 1.0);
    }
  `
});

const planeGeometry = new THREE.PlaneGeometry(1, 2);
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);

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
