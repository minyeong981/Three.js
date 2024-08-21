import * as THREE from "three";

const $result = document.getElementById('result');

// 1. Scene: 화면에서 보여주려는 객체를 담는 공간
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffe287)

// 2. Camera: Scence을 바라볼 시점을 결정
// 시야각(숫자 클수록 멀어지기 때문에 사물은 작게 보임), 카메라 종횡비(렌더러의 크기 비율로 설정), 최소 거리(범위밖은 렌더링 되지 않음), 최대 거리(짧아질수록 출력되는 범위 줄어듦) 
const camera = new THREE.PerspectiveCamera(50, $result.clientWidth / $result.clientHeight, 0.1, 1000);
// 카메라 위치 변경
camera.position.set(2, 2, 2);
// 바라볼 좌표값 설정
camera.lookAt(0,0,0);

// 3. Renderer: Scene + Camera, 화면을 그려주는 역할
// 렌더러 사이즈 줄였을 때 계단 현상 발생 -> antialias:true, $result.clientWidth, $result.clientHeight(렌더러 사이즈 동일하게 설정)
const renderer = new THREE.WebGLRenderer({canvas: $result, antialias:true});
renderer.setSize($result.clientWidth, $result.clientHeight);
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff);
light.position.set(2, 4, 3);
scene.add(light);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({color: 0x2e6ff2});
const box = new THREE.Mesh(geometry, material);
scene.add(box); 
// 0, 0, 0 기준으로 추가되어 있기 때문에 안 보임

renderer.render(scene, camera);