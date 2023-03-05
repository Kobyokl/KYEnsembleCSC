//make the 3d scene and stuf like that 
import * as THREE from 'https://unpkg.com/three/build/three.module.js';


const scene = new THREE.Scene(); 
const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, .1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.PointLight(0xffffff, 1, 100);

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const planeGeometry = new THREE.BoxGeometry(10 , 1 , 10);
const material = new THREE.MeshBasicMaterial( { color: 0x646e8f } );
const cube = new THREE.Mesh( geometry, material );
const plane = new THREE.Mesh( planeGeometry, material);

scene.background = new THREE.Color(0xffffff); 
scene.add( camera );
scene.add( cube );
scene.add( plane );
scene.add( light );

light.position.set(0, 10, 10);
cube.position.set(0, 0, 1);

camera.position.z = 7; 
camera.position.set(10, 20, 25); 
camera.lookAt(scene.position); 
 

function animate(){
    requestAnimationFrame(animate);

    cube.rotation.y += 0.003;
    cube.position.x += 0.005; 
    
    console.log("This is working");

    renderer.render(scene, camera);
}

window.addEventListener('resize', function() {
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
// ^^ this resizes the scene if the window size is changed

animate(); 

var lastX = 0; 
var lastY  = 0; 


/* Add event listeners for mouse and touch 
events. What this does is it records that last position of the cursor then 
*/
renderer.domElement.addEventListener('mousedown', onMouseDown);
renderer.domElement.addEventListener('mousemove', onMouseMove);
renderer.domElement.addEventListener('mouseup', onMouseUp);
renderer.domElement.addEventListener('touchstart', onTouchStart);
renderer.domElement.addEventListener('touchmove', onTouchMove);
renderer.domElement.addEventListener('touchend', onTouchEnd);

function onMouseDown(event) {
  lastX = event.clientX;
  lastY = event.clientY;
}

function onMouseMove(event) {
  if (event.buttons == 1) {
    const deltaX = event.clientX - lastX;
    const deltaY = event.clientY - lastY;
    camera.position.x += deltaX / 10;
    camera.position.y -= deltaY / 10;
    lastX = event.clientX;
    lastY = event.clientY;

  }
}

function onMouseUp(event) {
  lastX = event.clientX;
  lastY = event.clientY;
}

function onTouchStart(event) {
  lastX = event.touches[0].clientX;
  lastY = event.touches[0].clientY;
}

function onTouchMove(event) {
  const deltaX = event.touches[0].clientX - lastX;
  const deltaY = event.touches[0].clientY - lastY;
  camera.position.x += deltaX / 100;
  camera.position.y -= deltaY / 100;
  lastX = event.touches[0].clientX;
  lastY = event.touches[0].clientY;
}

function onTouchEnd(event) {
  lastX = event.touches[0].clientX;
  lastY = event.touches[0].clientY;
}
//  fade load in animation


