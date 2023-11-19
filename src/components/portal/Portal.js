import * as THREE from "three";
import { vertex, fragment } from "./shaders";

const planeMaterial = new THREE.ShaderMaterial({
  side: THREE.DoubleSide,
  vertexShader: vertex,
  fragmentShader: fragment,
});

const planeGeometry = new THREE.PlaneGeometry(5, 2, 255, 255);
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = Math.PI * -0.5;

export { planeMaterial, plane };
