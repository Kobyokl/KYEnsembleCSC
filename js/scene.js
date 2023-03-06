//make the 3d scene and stuf like that 
import * as THREE from 'https://unpkg.com/three/build/three.module.js';

const scene = new THREE.Scene(); 
const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, .1, 1000 );
const renderer = new THREE.WebGLRenderer();
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2(); 

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.PointLight(0xffffff, 1, 100);

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const randomGeometry = new THREE.BoxGeometry((Math.random() * 12 + 2), (Math.random() * 12 + 2), (Math.random() * 12 + 2))
const planeGeometry = new THREE.BoxGeometry(10 , 1 , 10);
const material = new THREE.MeshBasicMaterial( { color: 0x646e8f } );
const cube = new THREE.Mesh( geometry, material );
const plane = new THREE.Mesh( planeGeometry, material);

init();
animate(); 


function init(){
 

  for( let i = 0; i < 3000; i++ ){
    const jack = new THREE.Mesh(randomGeometry, new THREE.MeshBasicMaterial( { color: generateHexColor() } ));

    jack.position.x = Math.random() * 800 - 400;
    jack.position.y = Math.random() * 800 - 400;
    jack.position.z = Math.random() * 800 - 400;

    /* the math.pi allows math.random to generate an angle between 0 and 360 but in radians. */ 
    jack.rotation.x = Math.random() * 2 * Math.PI;
    jack.rotation.y = Math.random() * 2 * Math.PI;
    jack.rotation.z = Math.random() * 2 * Math.PI;

    jack.scale.y = (Math.random() + .5);
    jack.scale.x = (Math.random() + .5);
    jack.scale.z = (Math.random() + .5);

    scene.add(jack); 
  }

  scene.background = new THREE.Color(0xffffff); 

  scene.add( light );
  scene.add( camera );
  scene.add( cube );
  scene.add( plane );
  // scene.add( light );

  light.position.set(0, 10, 10);
  cube.position.set(0, 0, 1);

  camera.position.z = 7; 
  camera.position.set(10, 20, 25); 
  camera.lookAt(scene.position); 

  window.addEventListener('resize', function() {
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  camDrag();
}

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

function truncateDecimals(number, digits) {
  var multiplier = Math.pow(10, digits);
  var adjustedNum = number * multiplier;
  var truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);

  return truncatedNum / multiplier;
}
function animate(){
    window.requestAnimationFrame(animate);

    raycaster.setFromCamera(pointer, camera);

    cube.rotation.y += 0.003;
    cube.position.y += 0.005; 
    
    const intersects = raycaster.intersectObjects( scene.children );

    for(let i = 0; i < intersects.length; i++){
      intersects[i].object.material.color.set( generateHexColor() );
    }
    

    renderer.render(scene, camera);

}

function camDrag(){
  var lastX = 0; 
  var lastY  = 0; 


  renderer.domElement.addEventListener('mousedown', onMouseDown);
  renderer.domElement.addEventListener('mousemove', onMouseMove);
  renderer.domElement.addEventListener('mouseup', onMouseUp);
  renderer.domElement.addEventListener('touchstart', onTouchStart);
  renderer.domElement.addEventListener('touchmove', onTouchMove);
  renderer.domElement.addEventListener('touchend', onTouchEnd);

  function onMouseDown(event) {
    pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	  pointer.y = -( event.clientY / window.innerHeight ) * 2 + 1;

    lastX = event.clientX;
    lastY = event.clientY;
    
    console.log(truncateDecimals(pointer.x, 3));
    console.log(truncateDecimals(pointer.y, 3));
  }

  function onMouseMove(event) {   

    if (event.buttons == 1) {
      const deltaX = event.clientX - lastX;
      const deltaY = event.clientY - lastY;
      camera.position.x += deltaX / 25;
      camera.position.y -= deltaY / 25; 
      lastX = event.clientX;
      lastY = event.clientY;

      camera.lookAt(scene.position);
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
}