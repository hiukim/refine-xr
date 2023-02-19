import React, {useCallback, useEffect, useRef} from "react";
import { EditorControls } from "../libs/EditorControls"; 
import { loadGLTF } from "../libs/loaders";
import * as THREE from "three";

export const ModelViewer = ({modelURL}) => {
  const containerRef = useRef();
  const requestAnimationFrameRef = useRef();
  const metaRef = useRef();

  const buildScene = useCallback(async (modelURL) => {
    const container = containerRef.current;

    const gltf = await loadGLTF(modelURL);
    const obj = gltf.scene;

    const scene = new THREE.Scene();

    const width = 500;
    const height = 500;

    const box = new THREE.Box3().setFromObject(obj);
    const maxSize = Math.max(box.max.x - box.min.x, box.max.y - box.min.y);
    const scale = 1000 / maxSize;
    obj.scale.set(scale, scale, scale);
    obj.position.set(0, -200, 0);

    scene.add(obj);

    const mixer = new THREE.AnimationMixer(obj);
    if (gltf.animations.length > 0) {
      mixer.clipAction( gltf.animations[0] ).play();
    }

    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight( color, intensity );
    light.position.set( 2.5, 5, 3.8 );
    scene.add(light);

    const light2 = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene.add(light2);

    const canvas = container.getElementsByTagName("canvas")[0];
    const renderer = new THREE.WebGLRenderer({canvas, antialias: true, preserveDrawingBuffer: true});
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.setClearColor( 0xebeced );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(width, height, false);

    //rendererRef.current = renderer;

    const camera = new THREE.PerspectiveCamera(50, 1, 1, 100000);
    camera.position.set(1000, 1000, 1000);

    camera.lookAt(new THREE.Vector3());

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    const editorControls = new EditorControls(camera, container);
    editorControls.addEventListener('change', () => {
      renderer.render(scene, camera);
    });

    renderer.render(scene, camera);

    metaRef.current = {scene, camera, mixer, renderer};
  }, []);

  useEffect(() => {
    buildScene(modelURL);

    const clock = new THREE.Clock();
    const renderLoop = () => {
      console.log("renderloop..");
      const delta = clock.getDelta();

      if (metaRef.current) {
	const {scene, camera, mixer, renderer} = metaRef.current;
	mixer.update( delta );
	renderer.render(scene, camera);
      }

      requestAnimationFrameRef.current = requestAnimationFrame(renderLoop);
    };
    requestAnimationFrameRef.current = requestAnimationFrame(renderLoop);

    return () => {
      if (requestAnimationFrameRef.current) {
	cancelAnimationFrame(requestAnimationFrameRef.current);
      }
    }
  }, []);
  return (
    <div ref={containerRef} >
      <canvas/>
    </div>	
  )
}
