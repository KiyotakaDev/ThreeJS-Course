import { useEffect, useRef } from "react";
import { cleanUpScene, mountScene } from "./Script";


const Scene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Mount scene
    mountScene(mountRef)

    // Scene clean up
    return () => {
      cleanUpScene()
    };
  }, []);

  return <div className="container3D" ref={mountRef} />;
};

export default Scene;
