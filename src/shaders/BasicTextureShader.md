# Texture in shader

This is used to provide a texture to a shader.

## Texture and uv

As the position variable, the UVs exist only in the context of the vertices, therefore we will have to pass them to the fragment to make use of the coordinates of the UVs and whether to use the texture.
UVs are coords vec2(x, y).

### Steps

1. Make use of TextureLoader to load the texture inside the public/textures folder.

- Pass the textr to a uniform variable to use the texture in the fragment.

    ```javascript
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
      vertexShader: ``
    ```

2. In the vertexShader pass the uv values to our `vaying` variable.

    ```javascript
      vertexShader: `
        varying vec2 vUv;
      
        void main() {
          vUv = uv;

          vec4 modelPosition = modelMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * viewMatrix * modelPosition;
        }
      `
    ```

3. Use the `sampler2D` variable to store the texture and use the `varying vec2 vUv;`.

    ```javascript
      fragmentShader: `
        varying vec2 vUv;

        uniform sampler2D uTextr;

        void main() {
          vec2 uv = vUv;
          vec4 texture = texture2D(uTextr, uv);

          gl_FragColor = texture;
        }
      `
    ```