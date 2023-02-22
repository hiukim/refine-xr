import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";

export const loadGLTF = (path) => {
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
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
