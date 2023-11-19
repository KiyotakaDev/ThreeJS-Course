import * as THREE from 'three'

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

export { planeMaterial, plane }