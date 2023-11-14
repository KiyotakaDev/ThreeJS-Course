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

## Orbit controls

The orbit controls allow us to move around a point in the scene and zoom in or zoom out

### steps

1. Import OrbitControls

   `import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'`

2. Create controls

   ```
     // Renderer
     ...

     // Controls
     const controls = new OrbitControls(camera, renderer.domElement)
   ```

3. Give frames to our renderer for sense of movement

   ```
     // Render the scene
     const animate = () => {
       renderer.render(scene, camera)
       requestAnimationFrame(animate)
     }
     animate()
   ```

4. If we want the damping effect in our scene

   ```
     // Renderer
     ...

     // Controls
     const controls = new OrbitControls(camera, renderer.domElement)
     // enable damping effect
     controls.enableDamping = true

     // Cube
     ...

     // Render the scene
     const animate = () => {
       // update controls for damping
       controls.update()
       renderer.render(scene, camera)
       requestAnimationFrame(animate)
     }
     animate()
   ```

## Importing 3D objects from blender

### Steps

1. Open the .blender file in blender when exporting go to "include": seleced objects
   and "mesh" apply modifiers, the export and use.

2. Import GLTFLoader.

    `import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'`

3. The use it after renderer or controls

    ```
      // Loader have 3 parameters: onLoad, onProgress, onError
    const gltfLoader = new GLTFLoader()
    gltfLoader.load('./model/amongus.gltf',
      // onLoad
      (gltf) => {
        scene.add(gltf.scene)
      },
    )
    ```

## Resize 

    ```
      // Resize
      const resize = () => {
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight)
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight
        camera.updateProjectionMatrix()
      }
      window.addEventListener('resize', resize)
    ```