
# Shaders

Shaders are a small program that runs on the GPU made up of a vertex and a fragment:

- Vertex Shader: Geomtry
- Fragment Shader: Material

## Steps

We already know how to create the scene and a basic geometry.
To work with shaders we will work with the material "ShaderMaterial".

1. Create geometry with "ShaderMaterial"

    ```ruby
      const planeGeometry = new THREE.PlaneGeometry(1, 2);
      const planeMaterial = new THREE.ShaderMaterial();
      const plane = new THREE.Mesh(planeGeometry, planeMaterial);
      scene.add(plane);
    ```

2. ShaderMaterial receives 2 parameters:
vertexShader and fragmentShader in this specific order and with `` and the main function:

  `void main() {}`

    ```ruby
      const planeMaterial = new THREE.ShaderMaterial({
        vertexShader: ``,
        fragmentShader: ``,   
      });
    ```

3. Principal component of vertexShader "gl_Position" has the following operations:

- projectionMatrix
- modelViewMatrix
- vec4(position, 1.0)

    ```ruby
      vertexShader: `
        void main() {
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `
    ```

4. Principal component of vertexShader "gl_FragColor" is a vec4 = rgba

    ```ruby
      fragmentShader: `
        void main() {
          gl_FragColor = vec4(0.0, 1.0, 1.0, 1.0);
        }
      `
    ```