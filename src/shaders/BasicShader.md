# Shaders

Shaders are a small program that runs on the GPU made up of a vertex and a fragment:

- Vertex Shader: Geomtry
- Fragment Shader: Material

## Steps

We already know how to create the scene and a basic geometry.
To work with shaders we will work with the material "ShaderMaterial".

1. Create geometry with "ShaderMaterial"

   ```javascript
     const planeGeometry = new THREE.PlaneGeometry(1, 2);
     const planeMaterial = new THREE.ShaderMaterial();
     const plane = new THREE.Mesh(planeGeometry, planeMaterial);
     scene.add(plane);
   ```

2. ShaderMaterial receives 2 parameters:
   vertexShader and fragmentShader in this specific order and with `` and the main function:

`void main() {}`

    ```javascript
      const planeMaterial = new THREE.ShaderMaterial({
        vertexShader: ``,
        fragmentShader: ``,
      });
    ```

3. Principal component of vertexShader "gl_Position" has the following operations:

- projectionMatrix
- modelViewMatrix
- vec4(position, 1.0)

  ```javascript
    vertexShader: `
      void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `
  ```

4. Principal component of vertexShader "gl_FragColor" is a vec4 = rgba

   ```javascript
     fragmentShader: `
       void main() {
         gl_FragColor = vec4(0.0, 1.0, 1.0, 1.0);
       }
     `
   ```

### Making good stuff :D

1. We can separate the main operations of vertexShader to be able to modify them

- In this case we take the `vec4 modelPosition = modelViewMatrix * vec4(position, 1.0);` so we can modify the position of the model in the scene.

  ```javascript
    vertexShader: `
      void main() {
        vec4 modelPosition = modelviewMatrix * vec4(position, 1.0);
        modelPosition.y += 5.0;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `
  ```

2. Now we are going to see the sin function into the plane, how?

- We pass the modelPosition.x into the sin() function.
- The \* 4.0 is for the frequency.
- The \* 0.4 is the amplitude.
- We create a variable `varying float vElevation` which is used to pass values generally from vertex to fragment.

  ```javascript
    vertexShader: `
      varying float vElevation;

      void main() {
        vec4 modelPosition = modelviewMatrix * vec4(position, 1.0);
        //                sin(Model * frequency) * amplitude;
        float elevation = sin(modelPosition.x * 4.0) * 0.4;
        modelPosition.y += elevation;

        vElevation = modelPosition.y;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `
  ```

3. Now we are going to use the `varying float vElevation;` variable for give a color based on the vertex position.

- Get the value vElevation from vertexShader.
- Create the first 2 parameters for mix() func (red, blue);
- mix() func receive 3 parameters:
  - x: Specify the start of the rage in which to interpolate.
  - y: Specify the end of the range in which to interpolate.
  - a: Specify the value to use to interpolate between x and y.
- Use of varying float vElevation into mix() func.

  ```javascript
    fragmentShader: `
      varying float vElevation;

      void main() {
        vec4 red = vec4(1.0, 0.0, 0.0, 1.0);
        vec4 blue = vec4(0.0, 0.0, 1.0, 1.0);
        vec4 mixedColor = mix(red, blue, vElevation);

        gl_FragColor = mixedColor;
      }
    `
  ```

4.  Pass the `side` parameter into the ShaderMaterial() this is for a better sampling.

- Sum the amplitude to the elevation to prevent negative values and make a better sampling of mix color.

    ```javascript
    const planeMaterial = new THREE.ShaderMaterial({
      side: THREE.DoubleSide, // <--
      vertexShader: `
        varying float vElevation;

        void main() {
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);
          float elevation = sin(modelPosition.x * 4.0) * 0.4;
          modelPosition.y += (elevation + 0.4);

          vElevation = modelPosition.y;

          gl_Position = projectionMatrix * viewMatrix * modelPosition;
        }
      `
    });
    ```

5. Use of `uniforms`. They are values ​​that we can pass either to the vertex or to the fragment

- Declare uniform variables:

    ```javascript
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
        vertexShader: ``
      })
    ```

- Get the value of the variable uTime from `uniform float uTime;`

    ```javascript
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
    ```

- In the animation() update the uTime.value every frame.

    ```javascript
      const animate = () => {
        planeMaterial.uniforms.uTime.value += 0.03 // <---

        orbitControls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };
      animate();
    ```
  
- Use of the rest of the uniform variables.

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
        `,
    ```