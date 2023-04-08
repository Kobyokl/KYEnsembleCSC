import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

$("body").css("background-color", "white").hide().fadeIn(2000);


const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({antialias: false, canvas});
renderer.outputEncoding = THREE.sRGBEncoding;

const fov = 50;
const aspect = 2;  // the canvas default
const near = 0.1; 
const far = 200;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 10, 20);



const scene = new THREE.Scene();
const center = new THREE.Vector3(0, 12, 0); 
scene.background = new THREE.Color('#6E4E1D'); //idk cool brown

const raycaster = new THREE.Raycaster(); 
const mouse = new THREE.Vector2(); 
let allowobjs = []; 

var focused = false; 

const fogColor = 0xfaebd7 // white
const fogNear = .1;
const fogFar = 75;
scene.fog = new THREE.Fog(fogColor, fogNear, fogFar);

{
  const skyColor = 0xB1E1FF;  // light blue
  const groundColor = 0xB97A20;  // brownish orange
  const intensity = 0.2;
  const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
  scene.add(light);
}
{ // add light to the scene jawn
  const color = 0x9281b8;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(0, 10, 0);
  light.target.position.set(-5, 0, 0);
  scene.add(light);
  scene.add(light.target);
}

let root, drumsroot, guitarroot, pianoroot, saxophoneroot; 

//loadas the base scene witht hte chairs (non clickables and stuff)
const sceneroot = new GLTFLoader();
const url = 'lrnmodels/learnscene1.gltf';
sceneroot.load(url, (gltf) => {
  root = gltf.scene;
  scene.add(root);
});

//loads the piano and the event listener for when the piano is clicked
const urlp = 'lrnmodels/piano.gltf';
const piano = new GLTFLoader();
piano.load(urlp, (gltf) => {
  pianoroot = gltf.scene;
  allowobjs.push(pianoroot); 
  scene.add(pianoroot);
  pianoroot.position.set(15, 0, 10);
  pianoroot.rotation.y = 280;
});

const urld = 'lrnmodels/drums.gltf';
const drums = new GLTFLoader();
drums.load(urld, (gltf) => {
  drumsroot = gltf.scene;
  scene.add(drumsroot);
  allowobjs.push(drumsroot); 
  drumsroot.position.set(-9, 0, 8);
  drumsroot.scale.set(3.75, 3.75, 3.75)
  drumsroot.rotation.y = 18.0100000000016;
});

const urlg = 'lrnmodels/cguitar.gltf';
const guitar = new GLTFLoader();
guitar.load(urlg, (gltf) => {
  guitarroot = gltf.scene;
  allowobjs.push(guitarroot); 
  scene.add(guitarroot);
  guitarroot.position.set(-19, 6, -22);
  guitarroot.rotation.y = 180;
});

const urls = 'lrnmodels/saxophone.gltf';
const saxophone = new GLTFLoader();
saxophone.load(urls, (gltf) => {
  saxophoneroot = gltf.scene;
  allowobjs.push(saxophoneroot); 
  scene.add(saxophoneroot);
  saxophoneroot.position.set(-1, 0.5, -2);
  saxophoneroot.rotation.z = 12.999997979787879997999;
});

const sinradius = 10; 
const cosradius = 5; 

let theta = 0; 

function render() {
  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  if(guitarroot && pianoroot && saxophoneroot && drumsroot){
    const intersects = raycaster.intersectObjects(allowobjs);
    if(intersects.length > 0){
      for(var i = 0 ; i < intersects.length; i++){
        const obj = intersects[0].object;
      }
    }
  }
  if(focused == false){
    theta += 0.6;
    camera.position.x = sinradius * Math.sin( THREE.MathUtils.degToRad( theta ) );
    camera.position.y = (cosradius * Math.sin( THREE.MathUtils.degToRad( theta ) ) + 15);
    camera.position.z = cosradius * Math.cos( THREE.MathUtils.degToRad( theta ) );
    camera.lookAt(center);
  }

  raycaster.setFromCamera(mouse, camera);
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

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

render();

renderer.domElement.addEventListener('click', onSaxClick);
renderer.domElement.addEventListener('click', onPianoClick);
renderer.domElement.addEventListener('click', onGuitarClick);
renderer.domElement.addEventListener('click', onDrumClick);

window.addEventListener('click', hideElms);


function onSaxClick(event) {
  // Calculate the mouse position in normalized device coordinates
  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Raycast from the camera to the mouse position
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObject(saxophoneroot);

  if (intersects.length > 0){
    focused = true;
    console.log('sax!');
    var easingStyle = Power3.easeIn;
    TweenMax.to(camera.position, 1, {
      x: -12.112,
      y: 12.8488,
      z: -23.8581,
      ease: easingStyle,
      onUpdate: function () {
      },
      onComplete: function () {
        TweenMax.to(camera.rotation, 2, {
          x:-2.4009,
          y:-0.925009,
          z:-2.51090,
          ease: Power3.easeOut,
          onUpdate: function (){
          },
          onComplete: function () {
            // add the textbox and the learn more thingy, as well as the sound sample
          }
        });
      }
    });
  }
}
function onPianoClick(event) {
  // Calculate the mouse position in normalized device coordinates
  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Raycast from the camera to the mouse position
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);

  // Find the intersection between the ray and the cube
  const intersects = raycaster.intersectObject(pianoroot);

  // If there is an intersection, log a message to the console
  if (intersects.length > 0) {
    focused = true;
    console.log('Piano');

    var easingStyle = Power3.easeIn;
    TweenMax.to(camera.position, 1, {
      x: 16.85518,
      y: 14.51099,
      z: 23.19014,
      ease: easingStyle,
      onUpdate: function () {
      },
      onComplete: function () {
        TweenMax.to(camera.rotation, 2, {
          x:-0.7952844,
          y: 0.7274634,
          z:-0.5959840,
          ease: Power3.easeOut,
          onUpdate: function (){
          },
          onComplete: function () {
            // add the textbox and the learn more thingy, as well as the sound sample
          }
        });
      }
    });
  }
}
function onGuitarClick(event) {
  // Calculate the mouse position in normalized device coordinates
  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Raycast from the camera to the mouse position
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);

  // Find the intersection between the ray and the cube
  const intersects = raycaster.intersectObject(guitarroot);

  // If there is an intersection, log a message to the console
  if (intersects.length > 0) {
    focused = true;
    console.log('Guitar');

    var easingStyle = Power3.easeIn;
    TweenMax.to(camera.position, 1, {
      x: -7.74,
      y: 12.1002,
      z: -11.76669,
      ease: easingStyle,
      onUpdate: function () {
      },
      onComplete: function () {
        TweenMax.to(camera.rotation, 2, {
          x: -0.380841747,
          y: 0.48955075327,
          z: 0.186096272925,
          ease: Power3.easeOut,
          onUpdate: function (){
          },
          onComplete: function () {
            // add the textbox and the learn more thingy, as well as the sound sample
          }
        });
      }
    });

  }
}
function onDrumClick(event) {
  // Calculate the mouse position in normalized device coordinates
  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Raycast from the camera to the mouse position
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);

  // Find the intersection between the ray and the cube
  const intersects = raycaster.intersectObject(drumsroot);

  // If there is an intersection, log a message to the console
  if (intersects.length > 0) {
    focused = true;
    console.log('Drums');

    var easingStyle = Power3.easeIn;
    TweenMax.to(camera.position, 1, {
      x: -17.119,
      y: 11.016,
      z: 23.905089,
      ease: easingStyle,
      onUpdate: function () {
      },
      onComplete: function () {
        TweenMax.to(camera.rotation, 2, {
          x:-0.246555,
          y:-0.112002,
          z:-0.028121,
          ease: Power3.easeOut,
          onUpdate: function (){
          },
          onComplete: function () {
            // add the textbox and the learn more thingy, as well as the sound sample
          }
        });
      }
    });
  }
}

//crate the onclick events for the buttons in the threejs scene
function hideElms(event){
  if (event.target.id === 'wButton') {
    console.log('Button clicked!');
    $('.WelcomeOverlay').css('display', 'none');
    $('.blankoverlay').css('display', 'none');
  }
} 