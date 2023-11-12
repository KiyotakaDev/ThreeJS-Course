
# ThreeJS concepts

The whole set up is going to be based in 2 hooks: **useEffect** and **useRef**.

### Steps

1. Create the useRef() instance.

    `const mountRef = useRef(null);`

2. Pass it to the tag we want to reference.

    `return <div ref={mountRef}></div>`

3. Create useEffect()

    ```
      // import * as THREE from 'three'
      // ThreeJS is based on 3 main components:
      // Camera, Scene, Renderer
      useEffect(() => {
        const currentMount = mountRef.current

        // Scene
        const scene = new THREE.Scene()

        // Camera
        const camera new THREE.PerspectiveCamera(
          // fov
          25,
          // aspect
          currentMount.clientWidth / currentMount.clientHeight,
          // near
          0.1,
          // far
          1000
        )
        // camera is on 0, 0, 0 position for this we won't be able to see the objects
        camera.position.z = 4
        // add camera to scene
        scene.add(camera)

        // Renderer "render the scene (lights, cameras, colors, mesh, objects, etc.)"
        const renderer = new THREE.WebGLRenderer()
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight)
        currentMount.appendChild(renderer.domElement)

        // Cube
        // Objects are made by the mesh, geometry, material
        const cube = new THREE.Mesh(
          // geometry           w  h  d
          new THREE.BoxGeometry(1, 1, 1)
          // material
          new THREE.MeshBasicMaterial()
        )
        scene.add(cube)

        // Render the scene
        renderer.render(scene, camera)

        // At this point we'll be facing a problem: multiple canvases will be rendering
        // To solve that we use retunr of useEffect() (Render clean up)
        return () => {
          currentMount.removeChild(renderer.domElement)
        }
      }, [])
    ```