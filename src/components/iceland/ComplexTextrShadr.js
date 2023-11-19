import * as THREE from "three";

// Texture
const iceland = new THREE.TextureLoader().load(
  "./textures/iceland_height_map.png"
);

const planeMaterial = new THREE.ShaderMaterial({
  side: THREE.DoubleSide,
  uniforms: {
    uIceland: {
      value: iceland,
    },
    uColorA: {
      value: new THREE.Color("#eb1bd2"),
    },
    uColorB: {
      value: new THREE.Color("#26b3e3"),
    },
    uIntensity: {
      value: 1.2,
    },
    uOffset: {
      value: 1.0,
    },
  },
  vertexShader: `
  varying float vElevation;

  uniform sampler2D uIceland;
  
  void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    vec4 heightMap = texture2D(uIceland, uv);
    modelPosition.y += heightMap.x * 2.0;

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

const planeGeometry = new THREE.PlaneGeometry(10, 10, 255, 255);
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = Math.PI * -0.5;

export { planeMaterial, plane };
