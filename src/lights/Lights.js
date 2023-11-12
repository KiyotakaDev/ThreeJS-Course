import * as THREE from "three";

// AmbientLight is a light that comes from all sides
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);

// PointLight is a light that comes from a poin like a bulb
const pointLight = new THREE.PointLight(0xffffff, 1.5);

// DirectionalLight is a light like the one that the stages have
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(0, -3, 0);

// EnvironmentLight is a light that depends on the "environment"
const environmentLight = new THREE.CubeTextureLoader();
const envMap = environmentLight.load([
  "./envmap/px.png", // positive x
  "./envmap/nx.png", // negative x
  "./envmap/py.png", // positive y
  "./envmap/ny.png", // negative y
  "./envmap/pz.png", // positive z
  "./envmap/nz.png", // negative z
]);

export { ambientLight, pointLight, directionalLight, envMap };
