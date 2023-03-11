//make the 3d scene and stuf like that 
import * as THREE from 'https://unpkg.com/three/build/three.module.js';

const scene = new THREE.Scene(); 
const loader = new THREE.TextureLoader();
const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, .1, 1000 );
const renderer = new THREE.WebGLRenderer();
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2(); 

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const planeSize = 50; 
const light = new THREE.PointLight(0xffffff, 1, 100);
const testTexture = loader.load('CNTRLSHIFTCOMP\imgs\baseplatetexture.png');

testTexture.wrapS = THREE.RepeatWrapping;
testTexture.wrapT = THREE.RepeatWrapping;
testTexture.magFilter = THREE.NearestFilter;
const repeats = planeSize / 2;
testTexture.repeat.set(repeats, repeats); 

const planeGeom = new THREE.PlaneGeometry(planeSize, planeSize);
const planeMater = new THREE.MeshBasicMaterial({ map: testTexture, side: THREE.DoubleSide,});


const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x646e8f } );
const cube = new THREE.Mesh( geometry, material );

init();
animate(); 


function init(){

  scene.background = new THREE.Color(0x474749); 
  const mesh = new THREE.Mesh(planeGeom, planeMater);
  mesh.rotation.x = Math.PI * -.5;
  planeMater.color.setRGB(1.5, 1.5 ,1.5); 

  scene.add( light );
  scene.add( camera );
  scene.add( cube );
  scene.add( light );
  scene.add( mesh );

  light.position.set(0, 40, 10);
  cube.position.set(0, 1, 1);

  camera.position.z = 7; 
  camera.position.set(10, 20, 25); 
  camera.lookAt(scene.position); 

  window.addEventListener('resize', function() {
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  camDrag();

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
function truncateDecimals(number, digits) {
  var multiplier = Math.pow(10, digits);
  var adjustedNum = number * multiplier;
  var truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);

  return truncatedNum / multiplier;
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
    lastX = event.clientX;
    lastY = event.clientY;
    
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

    pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1.015;
	  pointer.y = -( event.clientY / window.innerHeight ) * 2 + 1 + 0.01;
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