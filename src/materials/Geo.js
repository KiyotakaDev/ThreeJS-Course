import * as THREE from "three";

// Cube
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(0.5, 0.5, 0.5),
  new THREE.MeshBasicMaterial({
    color: 0x00ffff,
    transparent: true,
    opacity: 0.3,
  })
);
cube.position.x = -1;

// Sphere
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.4, 16, 16),
  new THREE.MeshBasicMaterial({
    color: 0xff00ff,

    wireframe: true,
  })
);

// TorusKnot
const torusKnot = new THREE.Mesh(
  new THREE.TorusKnotGeometry(0.2, 0.07, 100),
  // {} for parameters in the material
  new THREE.MeshNormalMaterial({
    flatShading: true,
  })
);
torusKnot.position.x = 1;

export { cube, sphere, torusKnot };
