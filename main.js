import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { LinearMipMapNearestFilter, Texture } from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio / 3);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(70);
renderer.render(scene, camera);

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(10, 10, 10),
    new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
        wireframe: true,
    })
);

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 30, 5, 5),
    new THREE.MeshStandardMaterial({
        color: 0xF435FF,
        wireframe: true,
    })
)

const spheregeo = new THREE.SphereGeometry(10, 5, 5);

const sphere = new THREE.Mesh(
    spheregeo,
    new THREE.MeshStandardMaterial({
        color: 0x1489FF,
        wireframe: true,
    })
)

const floodLight = new THREE.AmbientLight(
    0x5c2c6d
);

sphere.position.x = 14;
sphere.position.y = 17;
sphere.position.z = -20;

var pivot = new THREE.Group();
pivot.add(sphere)

const pointLight = new THREE.AmbientLight(
    0xFF6347, 1.5
);

scene.add(cube, plane, pointLight, pivot);

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
    requestAnimationFrame(animate);

    controls.update()
    renderer.render(scene, camera);
    rotate();
}

function rotate() {
    plane.rotateX(0.008);
    cube.rotateY(0.01);
    sphere.rotateY(0.003);
    sphere.rotateZ(0.04);
    pivot.rotateX(0.03);
    pivot.rotateZ(0.05);
    pivot.rotateY(0.02);
}

function rotateCamera() {
    camera.rotateZ(0.1);
}

animate();

const bg = document.querySelector('canvas');
bg.onclick = rotate;

const pg = document.querySelector('p');
pg.onscroll = rotateCamera;