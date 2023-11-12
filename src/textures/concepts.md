
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