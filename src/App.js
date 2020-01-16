import React from 'react';
import * as THREE from 'three';
// import * as OBJLoader from 'three-obj-loader';
// import MTLLoader from 'three-mtl-loader';
import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader';
import { OrbitControls } from 'three-orbitcontrols-ts';
// OBJLoader(THREE);

import './App.css';
var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 200;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

var keyLight = new THREE.DirectionalLight(
  new THREE.Color('hsl(30, 100%, 75%)'),
  1.0
);
keyLight.position.set(-100, 0, 100);

var fillLight = new THREE.DirectionalLight(
  new THREE.Color('hsl(240, 100%, 75%)'),
  0.75
);
fillLight.position.set(100, 0, 100);

var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(100, 0, -100).normalize();

scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);

var mtlLoader = new MTLLoader();
mtlLoader.setTexturePath('/models/');
mtlLoader.setPath('/models/'); //path starts from public folder!!!!
mtlLoader.load('skeleton.mtl', function(materials) {
  materials.preload();

  var objLoader = new OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.setPath('/models/');
  objLoader.load('skeleton.obj', function(object) {
    scene.add(object);
    object.position.y -= 60;
  });
});

var animate = function() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
};

animate();
function App() {
  return <div className='App'></div>;
}

export default App;
