//import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

export const loadGLTF = (path) => {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderConfig({ type: 'js' });
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    
    loader.setDRACOLoader( dracoLoader);
    loader.load(path, (gltf) => {
      resolve(gltf);
    });
  });
}

export const loadImage = (path) => {
  return new Promise((resolve, reject) => {
    let img = new Image()
    img.crossOrigin = "Anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = path;
  });
}
