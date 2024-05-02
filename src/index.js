import './index.html';
import './index.scss';
import fullpage from 'fullpage.js';
import * as TWEEN from '@tweenjs/tween.js';
import Stats from './modules/stats.module.js';


let car, floor, tires, tires2, tires3, tires4, tires5, renderer, scene, light2, camera, stats;
let angle;
var modelParts = [];
var x = 2, z = 3, y = 0.7;
var rotation = 3;
var salonX = 0, salonZ = -0.38;
var cameraP = 40;
var backX = 0, backY = 0.7, backZ = -5;
// import {
//   PerspectiveCamera,
//   Scene,
//   Color,
//   MeshStandardMaterial,
//   WebGLRenderer,
//   SpotLight,
//   PCFSoftShadowMap,
//   Vector3
// } from 'three'

// import { GLTFLoader } from '@three/loaders/GLTFLoader'



function Burger() {
  var BurgerBtn = document.querySelector('.burger');
  var Menu = document.querySelector('.menu');
  BurgerBtn.addEventListener('click', function (e) {
    e.preventDefault();
    this.classList.toggle('burger--active');
    Menu.classList.toggle('menu--active');
  })
}
Burger();

// 3d effect
var moveHandler = function MoveTo(e) {
  var moveX = (e.clientX - window.innerWidth / 2) * -0.0005;
  var moveY = (e.clientY - window.innerHeight / 2) * -0.0001;
  scene.rotation.y = moveX;
  scene.rotation.x = moveY;
};
function Move(check) {
  if (check) {
    document.addEventListener('mousemove', moveHandler);
  }
  else {
    document.removeEventListener('mousemove', moveHandler);
  }
}
Move(true);

// поворот 5 слайд
function Rotation4(check) {
  if (check) {
    camera.fov = 40;
    camera.updateProjectionMatrix();
    new TWEEN.Tween(camera.position)
      .to({ x: backX, y: backY, z: backZ }, 1000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();
  }
  else {
    if (window.screen.width < 800) {
      camera.fov = 60;
      camera.updateProjectionMatrix();
    }
    if (window.screen.width < 550) {
      camera.fov = 80;
      camera.updateProjectionMatrix();
    }
    new TWEEN.Tween(camera.position)
      .to({ x: salonX, y: 0.7, z: salonZ }, 1500)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();
  }
}

// поворот 4 слайд
function Rotation3(check) {
  if (check) {
    if (window.screen.width < 800) {
      camera.fov = 60;
      camera.updateProjectionMatrix();
    }
    if (window.screen.width < 550) {
      camera.fov = 80;
      camera.updateProjectionMatrix();
    }
    new TWEEN.Tween(camera.position)
      .to({ x: salonX, y: 0.7, z: salonZ }, 1500)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();
    new TWEEN.Tween(camera.rotation)
      .to({ x: 0, y: 9.59, z: 0 }, 1500)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();
  }
}

// цвета салон
function SalonButtons(check) {
  const SalonBtn = document.querySelectorAll('.salon__btn');
  SalonBtn.forEach(item => {
    var color = item.getAttribute('color');
    item.style.background = '#' + color.substring(2, 8);
    if (check) {
      item.addEventListener('click', SalonBtnEvent);
    } else {
      item.removeEventListener('click', SalonBtnEvent);
    }
  })
}

function SalonBtnEvent(e) {
  e.preventDefault();
  var item = e.currentTarget;
  var color = item.getAttribute('color');
  if (item.id == 'salon__color-1') {
    window.screen.width > 1100 ? modelParts[14].material.color.setHex(color) : modelParts[15].material.color.setHex(color);
    document.querySelectorAll('#salon__color-1').forEach(node => {
      node.classList.remove('salon__btn--active');
    })
    item.classList.add('salon__btn--active');
  }
  else {
    modelParts[12].material.color.setHex(color);
    document.querySelectorAll('#salon__color-2').forEach(node => {
      node.classList.remove('salon__btn--active');
    })
    item.classList.add('salon__btn--active');
  }
}

// поворот 3 слайд
function Rotation2(check) {
  if (check) {
    camera.fov = 40;
    camera.updateProjectionMatrix();
    new TWEEN.Tween(camera.position)
      .to({ x: window.screen.width > 700 ? x : x + 3, y: y, z: (z + 0.1) }, 1000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();
    new TWEEN.Tween(camera.rotation)
      .to({ x: 0, y: 7.2, z: 0 }, 1000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();
    new TWEEN.Tween(light2.position)
      .to({ x: 1, y: 8.5, z: 0 }, 1000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();

  }
  else {
    new TWEEN.Tween(camera.position)
      .to({ x: (Math.sin(-0.6) * rotation), y: 0.7, z: (Math.cos(-0.6) * (z + 2)) }, 1000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();
    new TWEEN.Tween(camera.rotation)
      .to({ x: 0.07, y: 5.89, z: 0.03 }, 1000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();
    new TWEEN.Tween(light2.position)
      .to({ x: -2, y: 8, z: 1 }, 1000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();
  }
}

// позиция
function Position() {
  camera.position.x = Math.sin(-0.6) * rotation;
  camera.position.z = Math.cos(-0.6) * (z + 2);
  camera.rotation.set(0.07, 5.89, 0.03);
}

// цвета кузов
function ColorBtnEvent(e) {
  e.preventDefault();
  var item = e.currentTarget;
  var color = item.getAttribute('color');
  if (item.id == 'color__btn-1') {
    modelParts[19].material.color.setHex(color);
    document.querySelectorAll('#color__btn-1').forEach(node => {
      node.classList.remove('color__btn--active');
    })
    item.classList.add('color__btn--active');
  }
  if (item.id == 'color__btn-2') {
    modelParts[20].material.color.setHex(color);
    document.querySelectorAll('#color__btn-2').forEach(node => {
      node.classList.remove('color__btn--active');
    })
    item.classList.add('color__btn--active');
  }
}

function ColorButtons(check) {
  const ColorBtn = document.querySelectorAll('.color__btn');
  ColorBtn.forEach(item => {
    var color = item.getAttribute('color');
    item.style.background = '#' + color.substring(2, 8);
    if (check) {
      item.addEventListener('click', ColorBtnEvent);
    } else {
      item.removeEventListener('click', ColorBtnEvent);
    }
  });
}

// поворот 2 слайд
function Rotation1(check) {
  if (check) {
    new TWEEN.Tween(light2.position)
      .to({ z: 1 }, 1000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();
    new TWEEN.Tween(camera.position)
      .to({ x: (Math.sin(-0.6) * (rotation)), z: (Math.cos(-0.6) * (z + 2)) }, 1000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();
    new TWEEN.Tween(camera.rotation)
      .to({ x: 0.07, y: 5.89, z: 0.03 }, 1000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();
    new TWEEN.Tween(tires.position)
      .to({ x: -5 }, 1000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();
    new TWEEN.Tween(tires2.position)
      .to({ x: -5 }, 1000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();
    new TWEEN.Tween(tires3.position)
      .to({ x: -5 }, 1000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();
    new TWEEN.Tween(tires4.position)
      .to({ x: 4 }, 1000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();
    new TWEEN.Tween(tires5.position)
      .to({ x: 4 }, 1000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();
    setTimeout(function () {
      tires.visible = false;
      tires2.visible = false;
      tires3.visible = false;
      tires4.visible = false;
      tires5.visible = false;
    }, 1000);
  }
  else {
    new TWEEN.Tween(camera.position)
      .to({ x: x, z: z }, 1000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();
    new TWEEN.Tween(camera.rotation)
      .to({ x: 0, y: 7, z: 0 }, 1000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();
    new TWEEN.Tween(light2.position)
      .to({ z: 3 }, 1000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();
    new TWEEN.Tween(tires.position)
      .to({ x: -1.4 }, 1000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();
    new TWEEN.Tween(tires2.position)
      .to({ x: -1.2 }, 1000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();
    new TWEEN.Tween(tires3.position)
      .to({ x: -1.22 }, 1000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();
    new TWEEN.Tween(tires4.position)
      .to({ x: 1.5 }, 1000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();
    new TWEEN.Tween(tires5.position)
      .to({ x: 1.5 }, 1000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start();
    tires.visible = true;
    tires2.visible = true;
    tires3.visible = true;
    tires4.visible = true;
    tires5.visible = true;
  }
}

// Ползунок
function RangeEvent(value) {
  var x, y;
  let windowWidth = window.screen.width;
  angle = parseFloat(value);
  camera.position.x = Math.sin(angle) * rotation;
  camera.position.z = Math.cos(angle) * (z + 2);
  camera.lookAt(new THREE.Vector3(car.position.x, car.position.y + 1, car.position.z));
  var angleInRadians = ((angle + 0.6) * 25.7) * Math.PI / 180.0;
  if (windowWidth > 700) {
    x = 325 + (300 * Math.cos(angleInRadians));
    y = 25 + (300 * Math.sin(angleInRadians));
  }
  else if (windowWidth <= 700 && windowWidth > 460) {
    x = 220 + (200 * Math.cos(angleInRadians));
    y = 20 + (200 * Math.sin(angleInRadians));
  }
  else {
    x = 150 + (135 * Math.cos(angleInRadians));
    y = 15 + (135 * Math.sin(angleInRadians));
  }
  document.body.style.cssText = `--rotationX: ${x}px;
  --rotationY: ${y}px`;
}
function Range(check) {
  const Range = document.querySelector('.rotation__range');
  let x, radius;
  let windowWidth = window.screen.width;
  console.log(windowWidth);
  if (windowWidth > 700) {
    x = 625, radius = 25;

  }
  else if (windowWidth <= 700 && windowWidth > 460) {
    x = 420;
    radius = 20;
  }
  else {
    x = 285;
    radius = 15;
  };
  document.body.style.cssText = `--rotationX: ${x}px;
  --rotationY: ${radius}px`;

  if (check) {
    Range.addEventListener('input', function () {
      RangeEvent(Range.value);
    });
  }
  else {
    Range.removeEventListener('input', function () {
      RangeEvent(Range.value);
    });
  }
}
Range(true);

// Слайды
document.addEventListener('DOMContentLoaded', function () {
  new fullpage('#fullpage', {
    onLeave: function (origin, destination, direction, trigger) {
      var origin = this;
      if (origin.index == 0 && direction == 'down') {
        Move(false);
        Rotation1(true);
        Range(true);
      }
      if (origin.index == 1 && direction == 'up') {
        Move(true);
        Range(false);
        Position();
        Rotation1(false);
      }
      if (origin.index == 1 && direction == 'down') {
        Range(false);
        Position();
        Rotation2(true);
        ColorButtons(true);
      }
      if (origin.index == 2 && direction == 'up') {
        Range(true);
        Rotation2(false);
        ColorButtons(false);
      }
      if (origin.index == 2 && direction == 'down') {
        ColorButtons(false);
        Rotation3(true);
        SalonButtons(true);
      }
      if (origin.index == 3 && direction == 'up') {
        Rotation2(true);
        ColorButtons(true);
        SalonButtons(false);
      }
      if (origin.index == 3 && direction == 'down') {
        SalonButtons(false);
        Rotation4(true);
      }
      if (origin.index == 4 && direction == 'up') {
        Rotation4(false);
        SalonButtons(true);
      }
    },
  })
})


function init() {
  var Canvas = document.querySelector('.model');
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  // scene.fog = new THREE.Fog(0x000000, 3.015, 4);


  var windowWidth = window.screen.width;
  if (windowWidth < 1100) {
    x = 3, z = 4;
    rotation = 3;
  }
  if (windowWidth < 800) {
    x = 3.4, z = 4.5;
    rotation = 3.5;
    salonZ = -0.3;
  }
  if (windowWidth < 700) {
    x = 3.7, y = 2, z = 5;
    rotation = 4;
  }
  if (windowWidth < 600) {
    x = 4.5, z = 6, backY = 1.4, backX = -0.8, backZ = -6;
    rotation = 4.5;
  }
  if (windowWidth < 550) {
    salonZ = -0.25;
  }
  if (windowWidth < 500) {
    x = 5.5, z = 7, backY = 1.8, backX = -1, backZ = -7;
    rotation = 5;
  }
  if (windowWidth < 400) {
    x = 6.5, z = 8;
    rotation = 6;
  }
  camera = new THREE.PerspectiveCamera(
    cameraP,
    window.innerWidth / window.innerHeight,
    0.1,
    5000
  );
  camera.position.x = x;
  camera.position.y = 0.7;
  camera.position.z = z;
  camera.rotation.y = 7;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener('resize', onWindowResize, false);

  light2 = new THREE.SpotLight(0xffffff, 10, 9);
  light2.position.set(-2, 8, 3);
  light2.castShadow = true;
  light2.shadow.bias = 0;
  scene.add(light2);
  
  
  renderer = new THREE.WebGLRenderer({ antialias: true, canvas: Canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  renderer.gammaOutput = true;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  stats = new Stats();
  stats.showPanel(0);
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';
  document.body.appendChild(stats.domElement);

  const material = new THREE.MeshStandardMaterial({ color: 0xf80707, emissive: 0xf80707, emissiveIntensity: 0.5, metalness: 1 });
  const loader = new THREE.GLTFLoader();
  if (window.screen.width > 1100) {
    loader.load('./models/scene.gltf', gltf => {
      car = gltf.scene.children[0];
      car.scale.set(0.7, 0.7, 0.7);
      car.position.set(0, 0, 0);
      car.traverse(n => {
        if (n.isMesh) {
          modelParts.push(n);
          n.castShadow = true;
        }

      });
      modelParts[19].material.color.setHex(0x404040);
      modelParts[9].material = material;
      scene.add(gltf.scene);
      animate();
    });
  } else {
    loader.load('./model-mini/scene8.gltf', gltf => {
      car = gltf.scene;
      car.scale.set(0.7, 0.7, 0.7);
      car.position.set(0, 0.01, 0);
      car.traverse(n => {
        if (n.isMesh) {
          modelParts.push(n);
        }

      });
      modelParts[19].material.color.setHex(0x404040);
      modelParts[9].material = material;
      scene.add(gltf.scene);
      // animate();
    });
  }

  loader.load('./tires/scene.gltf', gltf => {
    tires = gltf.scene.children[0];
    tires.scale.set(0.006, 0.006, 0.006);
    tires.position.set(-1.4, 0, 2);
    if (window.screen.width > 1100) {
      tires.traverse(n => {
        if (n.isMesh) {
          n.castShadow = true;
          n.receiveShadow = true;
        }
      })
    }
    tires2 = tires.clone();
    tires2.rotation.z = 2;
    tires2.position.set(-1.2, 0, 1.5);
    scene.add(tires2);
    tires3 = tires.clone();
    tires3.rotation.z = 5;
    tires3.position.set(-1.22, 0.525, 1.5);
    scene.add(tires3);
    tires4 = tires.clone();
    tires4.rotation.z = -2;
    tires4.position.set(1.5, 0, 0.5);
    scene.add(tires4);
    tires5 = tires.clone();
    tires5.rotation.z = 0;
    tires5.position.set(1.5, 0.525, -0.3);
    scene.add(tires5);
    scene.add(gltf.scene);
    // animate();
  })

  loader.load('./floor2/scene.gltf', gltf => {
    floor = gltf.scene.children[0];
    floor.scale.set(1, 1, 1);
    floor.position.set(-2, 0, 2);
    if (window.screen.width > 1100) {
      floor.traverse(n => {
        if (n.isMesh) {
          n.material.map.anisotropy = 10;
          n.receiveShadow = true;
        }
      });
    } else {
      floor.traverse(n => {
        if (n.isMesh) {
          n.material.map.anisotropy = 2;
        }
      });
    }
    var floor2 = floor.clone();
    floor2.position.set(2, 0, 2)
    scene.add(floor2);
    var floor3 = floor.clone();
    floor3.position.set(-2, 0, -2)
    scene.add(floor3);
    var floor4 = floor.clone();
    floor4.position.set(2, 0, -2)
    scene.add(floor4);
    var floor5 = floor.clone();
    floor5.position.set(-2, 0, 5.5);
    scene.add(floor5);
    var floor6 = floor.clone();
    floor6.position.set(2, 0, 5.5);
    scene.add(floor6);
    scene.add(gltf.scene);
    // animate();
  })
}

function animate() {
  stats.begin();
  TWEEN.update();
  renderer.render(scene, camera);
  stats.end();
  requestAnimationFrame(animate);
}

init();
animate();

