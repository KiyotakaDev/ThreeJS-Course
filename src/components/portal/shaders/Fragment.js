const fragment = `
varying float vElevation;

void main() {
  vec4 purple = vec4(0.117, 0.125, 0.615, 1.0);
  vec4 blue = vec4(0.909, 0.121, 0.909, 1.0);
  float colorMix = (vElevation * 0.4) * 8.0;
  vec4 finalColor = mix(purple, blue, colorMix);

  gl_FragColor = finalColor;
}
`
export default fragment
