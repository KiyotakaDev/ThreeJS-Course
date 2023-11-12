import * as THREE from "three";

// Cube
const textureLoader = new THREE.TextureLoader();
const textr = textureLoader.load("./textures/matcap1.png");

const cubeTextr = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshMatcapMaterial({
    matcap: textr,
  })
);

// Sphere
const cylinderTextureLoader = new THREE.TextureLoader();
const map = cylinderTextureLoader.load(
  "./textures/bricks/Bricks_basecolor.jpg"
);
const aoMap = cylinderTextureLoader.load(
  "./textures/bricks/Bricks_ambientOcclusion.jpg"
);
const roughnessMap = cylinderTextureLoader.load(
  "./textures/bricks/Bricks_roughness.jpg"
);
const normalMap = cylinderTextureLoader.load(
  "./textures/bricks/Bricks_normal.jpg"
);
const heightMap = cylinderTextureLoader.load(
  "./textures/bricks/Bricks_height.png"
);

const sphereTextr = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 200, 200),
  new THREE.MeshStandardMaterial({
    map,
    aoMap,
    roughnessMap,
    normalMap,
    displacementMap: heightMap,
  })
);

export { cubeTextr, sphereTextr };
