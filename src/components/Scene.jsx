import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { cube, sphere, torusKnot } from '../materials/Geo'
import { cubeTextr, sphereTextr } from '../textures/Textr'
import { envMap } from '../lights/Lights'

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
    camera.position.z = 8
    scene.add(camera)

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight)
    currentMount.appendChild(renderer.domElement)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    // Damping
    controls.enableDamping = true

    // Ligth
    scene.environment = envMap
    scene.background = envMap

    // Texture
    scene.add(sphereTextr)

    // Render the scene
    const animate = () => {
      // update for damping
      controls.update()
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }
    animate()

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