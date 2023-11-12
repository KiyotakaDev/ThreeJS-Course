import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const Scene = () => {
  const mountRef = useRef(null)

  useEffect(() => {
    const currentMount = mountRef.current

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      25,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = 4
    scene.add(camera)

    // Renderer
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight)

    currentMount.appendChild(renderer.domElement)


    // Cube
    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1,),
      new THREE.MeshBasicMaterial()
    )
    cube.position.x = -1
    scene.add(cube)
    // Sphere
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 16, 16),
      new THREE.MeshBasicMaterial()
    )
    sphere.position.x = 1
    scene.add(sphere)


    // Scene clean up
    return () => {
      currentMount.removeChild(renderer.domElement)
    }

  }, [])
  

  return (
    <div 
      className='container3D'
      ref={mountRef}
    >

    </div>
  )
}

export default Scene