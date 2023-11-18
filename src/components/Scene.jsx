import { useEffect, useRef } from 'react'
import { mountScene, unmountScene } from './Script'

const Scene = () => {
  const mountRef = useRef()

  useEffect(() => {
    mountScene(mountRef)
  
    return () => {
      unmountScene()
    }
  }, [])
  

  return (
    <div className='container3D' ref={mountRef} />
  )
}

export default Scene