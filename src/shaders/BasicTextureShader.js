import * as THREE from 'three'

// Texture
const textr = new THREE.TextureLoader().load(
  "./textures/46.png"
)

const planeMaterial = new THREE.ShaderMaterial({
  side: THREE.DoubleSide,
  uniforms: {
    uTextr: {
      value: textr,
    },
  },
  vertexShader: `
  varying vec2 vUv;
  
  void main() {
    vUv = uv;

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * viewMatrix * modelPosition;
    }
    `,
  fragmentShader: `
    varying vec2 vUv;

    uniform sampler2D uTextr;

    void main() {
      vec2 uv = vUv;
      vec4 texture = texture2D(uTextr, uv);

      gl_FragColor = texture;
    }
    `,
});

const planeGeometry = new THREE.PlaneGeometry(5, 3, 100, 100);
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = Math.PI * -0.5;

export { planeMaterial, plane }