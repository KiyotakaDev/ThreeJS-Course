import * as THREE from 'three'

// Sphere
const textureLoader = new THREE.TextureLoader()
const textr = textureLoader.load('./textures/matcap1.png')

const textrSphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.4, 16, 16),
  new THREE.MeshMatcapMaterial({
    matcap: textr
  })
) 

export { textrSphere }
