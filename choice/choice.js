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


const center = new THREE.Vector3(0, 0, 0);
camera.lookAt(center);

// Create a dark gray plane
const geometry1 = new THREE.PlaneGeometry(21, 21);
const material1 = new THREE.MeshBasicMaterial({ color: 0x333333 });
const plane1 = new THREE.Mesh(geometry1, material1);
plane1.position.set(-10.5, 0, 0);
scene.add(plane1);

// Create a dark orange plane
const geometry2 = new THREE.PlaneGeometry(21, 21);
const material2 = new THREE.MeshBasicMaterial({ color: 0x8e5310 });
const plane2 = new THREE.Mesh(geometry2, material2);
plane2.position.set(10.5, 0, 0);
scene.add(plane2);

// Create a red cube on the left side
const geometry3 = new THREE.BoxGeometry(2.5, 2.5, 2.5);
const material3 = new THREE.MeshBasicMaterial({ color: generateHexColor() });
const cube1 = new THREE.Mesh(geometry3, material3);
cube1.position.set(-8, 0, 3);
scene.add(cube1);

// Create a blue cube on the right side
const geometry4 = new THREE.BoxGeometry(2.5, 2.5, 2.5);
const material4 = new THREE.MeshBasicMaterial({ color: generateHexColor() });
const cube2 = new THREE.Mesh(geometry4, material4);
cube2.position.set(8, 0, 3);
scene.add(cube2);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 20, 10);
scene.add(directionalLight);

const fog = new THREE.Fog(0xfcfbf9, 0.01, 100);

// Add the fog to the scene
scene.fog = fog;




cube1.rotation.z = 45; 
cube2.rotation.z = 45; 

allowobjs.push(cube1);
allowobjs.push(cube2); 

camDrag(); 

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
      window.location.href = "create.html";
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
      window.location.href = "learn.html";
    });

  }
}


let theta = 0; 
const radius = 6;


// Render the scene
function animate() {
  requestAnimationFrame(animate);

  raycaster.setFromCamera(pointer, camera);

  const intersects = raycaster.intersectObjects(allowobjs, true);


  for(let i = 0; i < intersects.length; i++){
    const obj = intersects[i].object;
    TweenMax.to(obj.scale, 0.25, { x: 2, y: 2, z: 2, ease: Bounce.easeOut });
  }

  TweenMax.to(cube1.scale, 0.5, { x: 1, y: 1, z: 1, ease: Bounce.easeOut });
  TweenMax.to(cube2.scale, 0.5, { x: 1, y: 1, z: 1, ease: Bounce.easeOut });


  theta+= 1; 

  camera.position.y = radius * Math.sin( THREE.MathUtils.degToRad( theta ) );
  camera.lookAt(center);
  cube1.rotation.y += 0.01; 
  cube2.rotation.y -= 0.01; 

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
function camDrag(){
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