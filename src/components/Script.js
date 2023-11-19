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
  side: THREE.DoubleSide,
  vertexShader: `
    varying float vElevation;

    void main() {
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      float elevation = sin(modelPosition.x * 4.0) * 0.4;
      modelPosition.y += (elevation + 0.4);

      vElevation = modelPosition.y;

      gl_Position = projectionMatrix * viewMatrix * modelPosition;
    }
  `,
  fragmentShader: `
    varying float vElevation;

    void main() {
      vec4 red = vec4(1.0, 0.0, 0.0, 1.0);
      vec4 blue = vec4(0.0, 0.0, 1.0, 1.0);
      vec4 mixedColor = mix(red, blue, vElevation);


      gl_FragColor = mixedColor;
    }
  `,
});

const planeGeometry = new THREE.PlaneGeometry(5, 2, 255, 255);
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = Math.PI * -0.5;
scene.add(plane);

// Axes helper
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// Grid helper
const gridHelper = new THREE.GridHelper(10, 10);
scene.add(gridHelper);

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
