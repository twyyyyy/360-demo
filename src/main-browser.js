import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import "./style.css";

let scene; 
let camera; 
let renderer; 
let controls; 

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

  controls = new OrbitControls(camera, renderer.domElement);   // enable mouse controls 
  
  const loader = new THREE.TextureLoader(); // create texture loader 
  loader.load("/src/assets/360.jpg", function( texture ) { // load 360 panoramic image
    const sphereGeometry = new THREE.SphereGeometry( 500, 60, 40 ); // create sphere geometry (radius, width, height)
    const sphereMaterial = new THREE.MeshBasicMaterial({ // create sphere material
      map: texture, // apply 360 image as texture 
      side: THREE.DoubleSide// render both sides of the sphere 
    });
    sphereGeometry.scale( -1, 1, 1 ); // flip the sphere so the camera views the image from inside 
    const mesh = new THREE.Mesh( sphereGeometry, sphereMaterial ); // create the mesh using the geometry and material 
    mesh.position.set( 0, 0, 0 ); // position sphere at centre of the scene 
    scene.add( mesh ); // add mesh to the scene 
  })
}

function render () {
  requestAnimationFrame( render ); // repeat render loop 
  controls.update();  // updates mouse controls 
  renderer.render( scene, camera );  // draw scene 
}

init(); // set up the scene 
render(); // start rendering 