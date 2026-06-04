import * as THREE from "three";
import { VRButton } from "three/addons/webxr/VRButton.js";
import panoramaUrl from "./assets/360.jpg";
import "./style.css";

let scene; 
let camera; 
let renderer;

// function that sets up the whole scene 
function init(){ 

  scene = new THREE.Scene(); // create scene 

  camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 1, 4000 ); // create camera 
  camera.position.set( 0, 0, 10 ); // camera position

  renderer = new THREE.WebGLRenderer({ // create renderer 
    antialias: true // smooth jagged edges
  });
  renderer.setPixelRatio(window.devicePixelRatio); // Use the screen’s pixel density for sharper rendering, capped at 2 for better performance.
  renderer.setSize(window.innerWidth,window.innerHeight); // set renderer size 
  document.body.appendChild( renderer.domElement ); // add renderer to webpage
  renderer.xr.enabled = true; // enable webxr support in threejs 
  document.body.appendChild(VRButton.createButton(renderer)); // add a vr button to the webpage. 
  
  const video = document.getElementById("video"); // get video html element 
  video.onloadeddata = function () { // play once enough video data has loaded 
      video.play();
  };
  
  const videoTexture = new THREE.VideoTexture(video); // create the video texture 
  videoTexture.needsUpdate = true;
  const videoMaterial = new THREE.MeshBasicMaterial({ // creates the sphere material 
      map: videoTexture, // use the video as the surface image of the sphere 
      side: THREE.BackSide, // renders the inside surface of the sphere 
  });

  const sphereGeometry = new THREE.SphereGeometry( 500, 60, 40 ); // create sphere geometry (radius, width, height)
  const videoScreen = new THREE.Mesh(sphereGeometry, videoMaterial); // create the mesh using the geometry and material 
  scene.add(videoScreen); // add mesh to the scene 
  renderer.setAnimationLoop(render); // start the webxr render loop 
}

function render () { 
  renderer.render( scene, camera );  // draw the scene
}

init(); // set up the scene 