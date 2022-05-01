import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// color car
const COLOR_GLASS = 0x1a2425;
const COLOR_CASE = 0x78b14b;
const COLOR_CABIN = 0xffffff;
const COLOR_WHEELS = 0x333333;
const COLOR_LED_LIGHT = 0xfcdc5e;

const AMBIENT_LIGHT_COLOR = 0xffffff;
const AMBIENT_LIGHT_INTENSITY = 0.6;
const DIRECTIONAL_LIGHT_COLOR = 0xffffff;
const DIRECTIONAL_LIGHT_INTENSITY = 0.8
const SPEED_ROTATE = 0.001;

const scene = new THREE.Scene();

const ambientLight = new THREE.AmbientLight(AMBIENT_LIGHT_COLOR, AMBIENT_LIGHT_INTENSITY);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(DIRECTIONAL_LIGHT_COLOR, DIRECTIONAL_LIGHT_INTENSITY);
directionalLight.position.set(200, 500, 300);
scene.add(directionalLight);

const aspectRatio = window.innerWidth / window.innerHeight;
const cameraWidth = 150;
const cameraHeight = cameraWidth / aspectRatio;



const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)

camera.position.z = 70
camera.position.y = 50
camera.rotation.x = -0.5

window.addEventListener('resize', onWindowResize, false)

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);
new OrbitControls(camera, renderer.domElement)
document.body.appendChild(renderer.domElement);

function createWheels() {
    const geometry = new THREE.BoxBufferGeometry(12, 12, 5);
    const material = new THREE.MeshLambertMaterial({ color: COLOR_WHEELS });
    const wheel = new THREE.Mesh(geometry, material);
    return wheel;
}

function createFrontGlass() {
    const geometry = new THREE.BoxBufferGeometry(20, 10, 0.5);
    const material = new THREE.MeshLambertMaterial({ color: COLOR_GLASS });
    const glass = new THREE.Mesh(geometry, material);
    return glass;
}

function createFrontLED() {
    const geometry = new THREE.BoxBufferGeometry(5, 5, 2);
    const material = new THREE.MeshLambertMaterial({ color: COLOR_LED_LIGHT });
    const led = new THREE.Mesh(geometry, material);
    return led;
}

function createCar() {
  const car = new THREE.Group();
  
  const backRightWheel = createWheels();
  backRightWheel.position.y = 6;
  backRightWheel.position.x = -18;
  backRightWheel.position.z = -15;
  car.add(backRightWheel);

  const backLeftWheel1 = createWheels();
  backLeftWheel1.position.y = 6;
  backLeftWheel1.position.x = -18;
  backLeftWheel1.position.z = 15;
  car.add(backLeftWheel1);
  
  const frontRightWheel = createWheels();
  frontRightWheel.position.y = 6;  
  frontRightWheel.position.x = 18;
  frontRightWheel.position.z = -15;
  car.add(frontRightWheel);

  const frontLeftWheel = createWheels();
  frontLeftWheel.position.y = 6;  
  frontLeftWheel.position.x = 18;
  frontLeftWheel.position.z = 15;
  car.add(frontLeftWheel);

  const frontGlass = createFrontGlass();
  frontGlass.position.x = 10.5;
  frontGlass.position.y = 24.5;
  frontGlass.position.z = 0;
  frontGlass.rotation.y = 4.72;
  car.add(frontGlass);

  const frontLeftLED = createFrontLED();
  frontLeftLED.position.x = 30.5;
  frontLeftLED.position.y = 10.5;
  frontLeftLED.position.z = 10;
  frontLeftLED.rotation.y = 4.72;
  car.add(frontLeftLED);

  const frontRightLED = createFrontLED();
  frontRightLED.position.x = 30.5;
  frontRightLED.position.y = 10.5;
  frontRightLED.position.z = -10;
  frontRightLED.rotation.y = 4.72;
  car.add(frontRightLED);


  const backGlass = createFrontGlass();
  backGlass.position.x = -22.5;
  backGlass.position.y = 24.5;
  backGlass.position.z = 0;
  backGlass.rotation.y = 4.72;
  car.add(backGlass);

  const sideFL = new THREE.Mesh(
    new THREE.BoxBufferGeometry(10, 10, 0.5),
    new THREE.MeshLambertMaterial({ color: COLOR_GLASS })
  );
  sideFL.position.x = 3.5;
  sideFL.position.y = 24.5;
  sideFL.position.z = 12;
  car.add(sideFL);

  const sideBL = new THREE.Mesh(
    new THREE.BoxBufferGeometry(16, 10, 0.5),
    new THREE.MeshLambertMaterial({ color: COLOR_GLASS })
  );
  sideBL.position.x = -12.5;
  sideBL.position.y = 24.5;
  sideBL.position.z = 12;
  car.add(sideBL);

  const sideFR = new THREE.Mesh(
    new THREE.BoxBufferGeometry(10, 10, 0.5),
    new THREE.MeshLambertMaterial({ color: COLOR_GLASS })
  );
  sideFR.position.x = 3.5;
  sideFR.position.y = 24.5;
  sideFR.position.z = -12;
  car.add(sideFR);

  const sideBR = new THREE.Mesh(
    new THREE.BoxBufferGeometry(16, 10, 0.5),
    new THREE.MeshLambertMaterial({ color: COLOR_GLASS })
  );
  sideBR.position.x = -12.5;
  sideBR.position.y = 24.5;
  sideBR.position.z = -12;
  car.add(sideBR);


  const main = new THREE.Mesh(
    new THREE.BoxBufferGeometry(60, 15, 30),
    new THREE.MeshLambertMaterial({ color: COLOR_CASE })
  );
  main.position.y = 12;
  car.add(main);

  const cabin = new THREE.Mesh(
    new THREE.BoxBufferGeometry(33, 12, 24),
    new THREE.MeshLambertMaterial({ color: COLOR_CABIN })
  );
  cabin.position.x = -6;
  cabin.position.y = 25.5;
  car.add(cabin);

  return car;
}

const car = createCar();
scene.add(car);

const render = () => {
    renderer.render(scene, camera);
}

const animate = () => {
    requestAnimationFrame( animate );
    car.rotation.y += SPEED_ROTATE;
    render();
}

animate();