import React, { useEffect, useRef } from "react";
import { cleanUpScene, initScene } from "./Script";

const Scene = () => {
  const mountRef = useRef();

  useEffect(() => {
    initScene(mountRef);

    return () => {
      cleanUpScene();
    };
  }, []);

  return <div ref={mountRef} className="container3D"></div>;
};

export default Scene;
