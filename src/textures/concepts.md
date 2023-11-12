# Textures

The use of textures is to give a better appearance to the object.

### Steps

1. For the basic use of texture we are going to use MeshMatcapMaterial()

   ```
     const textrSphere = new THREE.Mesh(
       new THREE.SphereGeometry(0.4, 16, 16),
       new THREE.MeshMatcapMaterial()
     )
   ```

2. We'll have to make use of TextureLoader() and use load() method. Then pass the url of the matcap.

   ```
     const textureLoader = new THREE.TextureLoader()
     const textr = textureLoader.load('./textures/matcap1.png')

     const textrSphere = new THREE.Mesh(
       new THREE.SphereGeometry(0.4, 16, 16),
       new THREE.MeshMatcapMaterial({
         matcap: textr
       })
     )
   ```

## MeshStandardMaterial()

Now we are going to use MeshStandardMaterial() typically used when importing a 3D model.

### Steps

1. Firs of all we must create a light otherwise we won't be able to see the object.

   ```
     // Controls
     ...
     // Damping
     ...

     // Ligths
     const al = new THREE.AmbientLight(0xffffff, 1)
     scene.add(al)
     // Geometries
     ...
     // Texture
     scene.add(sphereTextr)
   ```

2. Create object with MeshStandardMaterial()

   ```
     const textrCone = new THREE.Mesh(
       new THREE.SphereGeometry(0.5),
       new THREE.MeshStandardMaterial({})
     )
   ```

3. Use the textures in public folder

#### Texture conventions

|          Type          |                    Meaning                    |
| :--------------------: | :-------------------------------------------: |
|     **basecolor**      |                     Color                     |
| **ambientalOcclusion** |     Mixes with basecolor to give darkness     |
|       **heigh**        | Heigh based in grayscale (lowest -> highest)  |
|       **normal**       |         Details in the model surface          |
|     **roughness**      | Roughness based in grayscale(smooth -> rough) |
|     **metalness**      |              Metallic appearance              |

4. Use of TextureLoader() for all textures

    ```
      const cylinderTextureLoader = new THREE.TextureLoader();
      const map = cylinderTextureLoader.load(
        "./textures/bricks/Bricks_basecolor.jpg"
      );
      const aoMap = cylinderTextureLoader.load(
        "./textures/bricks/Bricks_ambientOcclusion.jpg"
      );
      const roughnessMap = cylinderTextureLoader.load(
        "./textures/bricks/Bricks_roughness.jpg"
      );
      const normalMap = cylinderTextureLoader.load(
        "./textures/bricks/Bricks_normal.jpg"
      );
      const heightMap = cylinderTextureLoader.load(
        "./textures/bricks/Bricks_height.png"
      );

      const sphereTextr = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 200, 200),
        new THREE.MeshStandardMaterial({
          map,
          aoMap,
          roughnessMap,
          normalMap,
          displacementMap: heightMap,
        })
      );
    ```

And there you have it :D