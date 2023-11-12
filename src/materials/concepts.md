
# Materials 

There is a wide variety of materials which receive properties as color, transparency, etc.

### Steps

1. Create the object with the material you want.

    ```
      // Cube
      const cube = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.5, 0.5),
        new THREE.MeshBasicMaterial()
      );
    ```

2. Then pass the properties you want within the material with a "{}".

    ```
      // Cube
      const cube = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.5, 0.5),
        new THREE.MeshBasicMaterial({
          color: 0x00ffff,
          ransparent: true,
          opacity: 0.3,
        })
      );
    ```

#### Note:
All materials are different therefore they will have the same or different properties.
Check the ThreeJS documentation :D