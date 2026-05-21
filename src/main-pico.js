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
  renderer.setSize(window.innerWidth,window.innerHeight); // set renderer size 
  document.body.appendChild( renderer.domElement ); // add renderer to webpage
  renderer.xr.enabled = true; // enable webxr support in threejs 
  document.body.appendChild(VRButton.createButton(renderer)); // add a vr button to the webpage. 
  
  var loader = new THREE.TextureLoader(); // create texture loader 
  loader.load(panoramaUrl, function( texture ) { //load 360 panoramic image
    var sphereGeometry = new THREE.SphereGeometry( 500, 60, 40 ) // create sphere geometry (radius, width, height)
    var sphereMaterial = new THREE.MeshBasicMaterial({ // create sphere material
      map: texture, // apply 360 image as texture 
      side: THREE.DoubleSide // render both sides of the sphere 
    })
   
    sphereGeometry.scale( -1, 1, 1 ); // flip the sphere so the camera views the image from inside 
    var mesh = new THREE.Mesh( sphereGeometry, sphereMaterial ); // create the mesh using the geometry and material 
    mesh.position.set( 0, 0, 0 ); // position sphere at the centre of the scene 
    scene.add( mesh ); // add mesh to the scene 
  })
  renderer.setAnimationLoop(render); // start the webxr render loop 
}

function render () { 
  renderer.render( scene, camera );  // draw the scene
}

init(); // set up the scene 