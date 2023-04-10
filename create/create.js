import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

$("body").css("background-color", "white").hide().fadeIn(3000);

  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
  renderer.outputEncoding = THREE.sRGBEncoding;

  const fov = 45;
  const aspect = 2;  // the canvas default
  const near = 0.1;
  const far = 2000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 10, 20);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#949398'); //idk cool brown
   
  let ensemble = [];

{
    const skyColor = 0xB1E1FF;  // light blue
    const groundColor = 0xB97A20;  // brownish orange
    const intensity = 0.6;
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    scene.add(light);
}
{
    const color = 0xFFFFFF;
    const intensity = 0.4;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(5, 20, 2);
    scene.add(light);
    scene.add(light.target);
}
{
    const nearDistance = 0.1;
    const farDistance = 140;
    const fogColor = new THREE.Color(0xffffff); // white color fog
    scene.fog = new THREE.Fog(fogColor, nearDistance, farDistance);
}

let piano, guitar, sax, drums; 

const gltfLoader = new GLTFLoader();
gltfLoader.load('models/stage.gltf', (gltf) => {
    const root = gltf.scene;
    scene.add(root);
});

const gltfLoaderGuitar = new GLTFLoader();
gltfLoaderGuitar.load('models/cguitar.gltf', (gltf) => {
    guitar = gltf.scene;
    scene.add(guitar);
    guitar.position.set(9, 15.5, -16.7);
    guitar.rotation.y = 53.4; 
});

const gltfLoaderPiano = new GLTFLoader();
gltfLoaderPiano.load('models/piano.gltf', (gltf) => {
    piano = gltf.scene;
    scene.add(piano);
    piano.position.set(13, 11.6, 18);
    piano.scale.set(1.3, 1.3, 1.3);
});

const gltfLoaderSax = new GLTFLoader();
gltfLoaderSax.load('models/saxophone.gltf', (gltf) => {
    sax = gltf.scene;
    sax.position.set(-12, 1.2, -7.5);
    sax.rotation.y = 22.33;
    scene.add(sax);
});

const gltfLoaderDrums = new GLTFLoader();
gltfLoaderDrums.load('models/drums.gltf', (gltf) => {
    drums = gltf.scene;
    drums.position.set(2, 7.8, -3);
    drums.rotation.y = 35.37;
    drums.scale.set(3, 3, 3);
    scene.add(drums);
});





function resizeRendererToDisplaySize(renderer) {
const canvas = renderer.domElement;
const width = canvas.clientWidth;
const height = canvas.clientHeight;
const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}

const radius = 5; 
const radiusl = 2; 
let theta = 0; 
let thetal = 0; 

camera.position.set(49.35329, 30.0957, 0.861331);
var center = new THREE.Vector3(0, 15, 0); 

function render() {
    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }

    if(piano && drums && sax && guitar){
        camera.position.y = (radius * Math.sin( THREE.MathUtils.degToRad( theta ) ) + 30);
        camera.position.x = (radiusl * Math.cos( THREE.MathUtils.degToRad( thetal ) )  + 49.35329);
        camera.position.z = (radiusl * Math.sin( THREE.MathUtils.degToRad( thetal ) ) + 0.861331);

    }
    theta += 0.15;
    thetal += 0.15;

    camera.lookAt(center); 

    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

requestAnimationFrame(render);

renderer.domElement.addEventListener('click', onSaxClick);
renderer.domElement.addEventListener('click', onPianoClick);
renderer.domElement.addEventListener('click', onGuitarClick);
renderer.domElement.addEventListener('click', onDrumClick);
window.addEventListener('click', hideElms);
window.addEventListener('click', backButton);
window.addEventListener('click', saveselInstruments); 
window.addEventListener('click', togglePlay); 
window.addEventListener('click', togglePause); 

var saxpicked = false; 
var pianopicked = false; 
var drumspicked = false; 
var guitarpicked = false; 

function onSaxClick(event) {
  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObject(sax);

  if (intersects.length > 0){
    if(saxpicked){
        ensemble.pop();
        saxpicked = false;
        console.log('Sax deselected');
        $(".saxophone").css("display", "none");

    }else{
        saxpicked = true; 
        $(".saxophone").css("display", "block");

        console.log('sax!');
        ensemble.push(sax);
    }
  }
}


function onPianoClick(event) {
  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObject(piano);

  if (intersects.length > 0) {
    if(pianopicked){
        ensemble.pop();
        pianopicked = false
        console.log('Piano deselected');
        $(".piano").css("display", "none");
    }else{
        $(".piano").css("display", "block");
        pianopicked = true;
        console.log('Piano');
        ensemble.push(piano); 
    }
  }
}


function onGuitarClick(event) {
  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObject(guitar);
  if (intersects.length > 0) {
    if(guitarpicked){
        guitarpicked = false
        ensemble.pop();
        console.log('Guitar deselected');
        $(".guitar").css("display", "none");
    }else{
        $(".guitar").css("display", "block");
        guitarpicked = true;
        console.log('Guitar')
        ensemble.push(guitar); 
    }
  }
}
function onDrumClick(event) {
  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObject(drums);

  if (intersects.length > 0) {
    if(drumspicked){
        drumspicked = false
        ensemble.pop();
        console.log('Drums deselected');
        $(".drums").css("display", "none");
    }else{
        $(".drums").css("display", "block");
        drumspicked = true;
        console.log('Drums');
        ensemble.push(drums); 
    }
  }
}
function hideElms(event){
    if (event.target.id === 'wButton') {
      $('.WelcomeOverlay').css('display', 'none');
      $('.blankoverlay').css('display', 'none');
      $('.selected').css('display', 'block');
      $('.generateButton').css('display', 'block');
      $('.playButton').css('display', 'block');
      $('.pauseButton').css('display', 'block');
    } 
}
function backButton(event){
    if(event.target.id === 'bButton'){
      $("body").fadeOut(1000, function(){
        window.history.back(); 
      });
      return false;
    }
}
  
let allowedMusic = []; 

var drumsSec = document.getElementById("drumsSec");
var guitarSec = document.getElementById("guitarSec");
var pianoSec = document.getElementById("pianoSec");
var saxSec = document.getElementById("saxSec");

function saveselInstruments(event){
    if(event.target.id === 'gButton'){
      while(allowedMusic.length > 0){allowedMusic.pop();}
      for(var i = 0 ; i < ensemble.length; i++){
        if(ensemble[i] === sax){
          allowedMusic.push(saxSec); 
        }else if(ensemble[i] === guitar){
          allowedMusic.push(guitarSec); 
        }else if(ensemble[i] === drums){
          allowedMusic.push(drumsSec); 
        }else{
          allowedMusic.push(pianoSec); 
        } 
      }
    }
    console.log(allowedMusic); 
}

function togglePlay(event){
  if(event.target.id === 'pButton'){
    for(var i = 0; i < allowedMusic.length; i++){
      allowedMusic[i].play(); 
    }
  }
}
function togglePause(event){
  if(event.target.id === 'ppButton'){
    for(var i = 0; i < allowedMusic.length; i++){
      allowedMusic[i].pause(); 
      allowedMusic[i].currentTime = 0;
    }
  }
}

render();

