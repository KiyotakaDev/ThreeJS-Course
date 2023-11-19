const vertex = `
  varying float vElevation;

  uniform float uTime;

  void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float posX = pow(modelPosition.x, 2.0);
    float posY = pow(modelPosition.y, 2.0);
    float circle = sqrt(posX + posY);
    float wave = sin(circle * 10.0 - uTime) * sin(circle * 3.0 - uTime) * 0.2;

    modelPosition.z += wave + 0.3;
    modelPosition.y += 5.5;
    modelPosition.z -= 0.3;

    vElevation = modelPosition.z;

    gl_Position = projectionMatrix * viewMatrix * modelPosition;
  }
`

export default vertex