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

const planeMaterial = new THREE.ShaderMaterial({
  side: THREE.DoubleSide,
  uniforms: {
    uTime: {
      value: 0.0,
    },
    uColorA: {
      value: new THREE.Color("#eb1bd2")
    },
    uColorB: {
      value: new THREE.Color("#26b3e3")
    },
    uIntensity: {
      value: 3.0
    },
    uOffset: {
      value: 1.0
    }
  },
  vertexShader: `
  varying float vElevation;

  uniform float uTime;
  
  void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      modelPosition.y += sin(modelPosition.x * 4.0 + uTime) * 0.4;
      modelPosition.y += sin(modelPosition.z * 6.0 + uTime) * 0.2;
      
      vElevation = modelPosition.y;
      
      gl_Position = projectionMatrix * viewMatrix * modelPosition;
    }
    `,
  fragmentShader: `
    varying float vElevation;

    uniform vec3 uColorA;
    uniform vec3 uColorB;
    uniform float uIntensity;
    uniform float uOffset;
    
    void main() {
      vec3 mixedColor = mix(uColorA, uColorB, vElevation * uIntensity + uOffset);
      
      
      gl_FragColor = vec4(mixedColor, 1.0);
    }
    `,
});

const planeGeometry = new THREE.PlaneGeometry(5, 5, 255, 255);
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = Math.PI * -0.5;
scene.add(plane);

// Axes helper
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// Grid helper
const gridHelper = new THREE.GridHelper(10, 10);
scene.add(gridHelper);

const animate = () => {
  planeMaterial.uniforms.uTime.value += 0.03

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
