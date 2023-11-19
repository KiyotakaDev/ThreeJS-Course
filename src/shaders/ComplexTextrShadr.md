# Height map texture

In this case we are going to use the texture in the vertex since this is where the height map will be reflected

## Steps

1. Load the hight map it will be the same as with any other texture.

    ```javascript
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
        vertexShader: ``
      })
    ```

2. Make use of the iceland height map as a `sampler2D`.

- Use `texture2D` to load the uIceland and the uv for coords.
- In modelPosition.y += heightMap.x.
- Pass modelPosition.y to vElevation to colorize the texture based on the height map.

    ```javascript
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
      `
    ```

3. Colorize :D

    ```javascript
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
     `
    ```
