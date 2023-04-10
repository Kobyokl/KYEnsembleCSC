import * as THREE from 'https://unpkg.com/three/build/three.module.js';
$("body").css("background-color", "white").hide().fadeIn(2000);
// Set up the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', function() {
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Set up the scene
const scene = new THREE.Scene();
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2(); 
let allowobjs = [];

// Set up the camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 20);

// Create a dark gray plane
const geometry1 = new THREE.PlaneGeometry(42, 42);
const material1 = new THREE.MeshBasicMaterial({ color: 0xF4DF4E });
const plane1 = new THREE.Mesh(geometry1, material1);
plane1.position.set(-21, 0, 0);
scene.add(plane1);

// Create a dark orange plane
const geometry2 = new THREE.PlaneGeometry(42, 42);
const material2 = new THREE.MeshBasicMaterial({ color: 0xCCCCFF });
const plane2 = new THREE.Mesh(geometry2, material2);
plane2.position.set(21, 0, 0);
scene.add(plane2);

// Create a red cube on the left side
const geometry3 = new THREE.BoxGeometry(2.5, 2.5, 2.5);
const material3 = new THREE.MeshBasicMaterial({ color: generateHexColor() });
const cube1 = new THREE.Mesh(geometry3, material3);
cube1.position.set(-5.9, 0, 3);
scene.add(cube1);

// Create a blue cube on the right side
const geometry4 = new THREE.BoxGeometry(2.5, 2.5, 2.5);
const material4 = new THREE.MeshBasicMaterial({ color: generateHexColor() });
const cube2 = new THREE.Mesh(geometry4, material4);
cube2.position.set(5.9, 0, 3);
scene.add(cube2);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 20, 10);
scene.add(directionalLight);
const fog = new THREE.Fog(0xeae4fa, 0.01, 80);

// Add the fog to the scene
scene.fog = fog;




cube1.rotation.z = 45; 
cube2.rotation.z = 45; 

allowobjs.push(cube1);
allowobjs.push(cube2); 

MouseMovListener(); 

renderer.domElement.addEventListener('click', onCube1Click);
renderer.domElement.addEventListener('click', onCube2Click);

function onCube1Click(event) {
  // Calculate the mouse position in normalized device coordinates
  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Raycast from the camera to the mouse position
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);

  // Find the intersection between the ray and the cube
  const intersects = raycaster.intersectObject(cube1);

  // If there is an intersection, log a message to the console
  if (intersects.length > 0) {
    console.log('Create clicked!');
    $("body").fadeOut(2000, function(){
      window.location.href = "../create/create.html";
    });
  }
}

function onCube2Click(event) {
  // Calculate the mouse position in normalized device coordinates
  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Raycast from the camera to the mouse position
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);

  // Find the intersection between the ray and the cube
  const intersects = raycaster.intersectObject(cube2);

  // If there is an intersection, log a message to the console
  if (intersects.length > 0) {
    console.log('Time to learn!   !');
    $("body").fadeOut(2000, function(){
      window.location.href = "../learn/learn.html";
    });

  }
}


let theta = 0; 
let thetax = 0; 
const radius = 6;


// Render the scene
function animate() {
  requestAnimationFrame(animate);

  raycaster.setFromCamera(pointer, camera);

  const intersects = raycaster.intersectObjects(allowobjs, true);

  //check for intersections if in the ray that was shot from the cursor
  //(check if the cubes are being hovered over and if they are then make them bigger)
  for(let i = 0; i < intersects.length; i++){
    const obj = intersects[i].object;
    TweenMax.to(obj.scale, 0.25, { x: 3, y: 3, z: 3, ease: Bounce.easeIn });
  }

  TweenMax.to(cube1.scale, 0.5, { x: 1, y: 1, z: 1, ease: Bounce.easeOut });
  TweenMax.to(cube2.scale, 0.5, { x: 1, y: 1, z: 1, ease: Bounce.easeOut });


  //code to make the cubes move around and to keep the camera looking at the position
  theta += 0.3; 
  thetax += 0.6;
  camera.position.y = (radius * Math.sin( THREE.MathUtils.degToRad( theta ) ));
  camera.position.x = (radius * Math.cos( THREE.MathUtils.degToRad( thetax ) ));
  
  camera.lookAt(scene.position);
  
  cube1.rotation.y += 0.01; 
  cube2.rotation.y -= 0.01; 
  cube1.rotation.z += 0.01; 
  cube2.rotation.z -= 0.01; 
  cube1.rotation.x += 0.01; 
  cube2.rotation.x -= 0.01; 

  renderer.render(scene, camera);
}

animate();

function generateHexColor() {
  const hexDigits = '0123456789abcdef';
  let hexcolor = '0x';
  let hash = 0;
  for (let i = 0; i < 6; i++) {
    hexcolor += hexDigits[Math.floor(Math.random() * 16)];
  }

  for (var i = 0; i < hexcolor.length; i++) {
    hash = hexcolor.charCodeAt(i) + ((hash << 5) - hash);
  }

  return hash;
}

//function that adds an event listener to the website to check if the mouse has moved and if it has then update the programs information on where the mouse is
function MouseMovListener(){
  var lastX = 0; 
  var lastY  = 0;
  renderer.domElement.addEventListener('mousemove', onMouseMove);
  function onMouseMove(event) {   
   lastX = event.clientX;
   lastY = event.clientY;
    pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1.015;
	  pointer.y = -( event.clientY / window.innerHeight ) * 2 + 1 + 0.01;
  }
}

// Create HTML elements for the cube labels
const leftLabel = document.createElement('div');
leftLabel.textContent = 'Create';
leftLabel.style.position = 'absolute';
leftLabel.style.top = '100px';
leftLabel.style.left = 'calc(50% - 450px)';
leftLabel.style.color = 'white';
leftLabel.style.fontSize = '84px';
document.body.appendChild(leftLabel);

const rightLabel = document.createElement('div');
rightLabel.textContent = 'Learn';
rightLabel.style.position = 'absolute';
rightLabel.style.top = '100px';
rightLabel.style.right = 'calc(50% - 450px)';
rightLabel.style.color = 'white';
rightLabel.style.fontSize = '84px';
document.body.appendChild(rightLabel);
