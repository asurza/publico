//import * as THREE from './asset/three/build/three.module.js';
import * as THREE from 'three';
import { GLTFLoader } from './asset/three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from './asset/three/examples/jsm/controls/OrbitControls.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scaleSize = 1;

const loader = new GLTFLoader();
let root = null;
loader.load('asset/pinar-rey.glb', function (glb) {
    console.log(glb);
    root = glb.scene;
    root.scale.set(scaleSize, scaleSize, scaleSize);
    scene.add(root);
    //scene.add(gltf.scene);
}, function (xhr){
    console.log((xhr.loaded/xhr.total * 100) + "% cargado");
}, function (error) {
    console.error(error);
});

const  light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2,2,5);
scene.add(light);

const  light2 = new THREE.DirectionalLight(0xffffff, 1);
light2.position.set(-2,-2,-5);
scene.add(light2);

const backgroundColor = new THREE.Color( 0xffffff );
scene.background = backgroundColor;

camera.position.z = 5;

// Crea los controles de cámara OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Agrega amortiguación para movimientos suaves
controls.dampingFactor = 0.25; // Factor de amortiguación (ajustable)

function animate() {
    requestAnimationFrame(animate);
/*    if(root != null){
        root.rotation.x += 0.01;
        root.rotation.y += 0.01;
    }
 */
    controls.update(); // Actualiza los controles en cada frame
    renderer.render(scene, camera);
}

animate();
