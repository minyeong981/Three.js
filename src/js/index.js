import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import PrintTree from './../mesh/tree'
import PrintTangerine from './../mesh/tangerine'
import { HemisphereLight } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
const $result = document.getElementById('result');

// 1. Scene: 화면에서 보여주려는 객체를 담는 공간
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffe287)

// 2. Camera: Scence을 바라볼 시점을 결정
// 시야각(숫자 클수록 멀어지기 때문에 사물은 작게 보임), 카메라 종횡비(렌더러의 크기 비율로 설정), 최소 거리(범위밖은 렌더링 되지 않음), 최대 거리(짧아질수록 출력되는 범위 줄어듦) 
const camera = new THREE.PerspectiveCamera(50, $result.clientWidth / $result.clientHeight, 0.1, 1000);
camera.position.set(8, 8, 8);
camera.lookAt(0,0,0);

// 3. Renderer: Scene + Camera, 화면을 그려주는 역할
// 렌더러 사이즈 줄였을 때 계단 현상 발생 -> antialias:true, $result.clientWidth, $result.clientHeight(렌더러 사이즈 동일하게 설정)
const renderer = new THREE.WebGLRenderer({canvas: $result, antialias:true});
renderer.setSize($result.clientWidth, $result.clientHeight);
renderer.shadowMap.enabled = true;

// 도형
const geometry = new THREE.SphereGeometry(1);
const material = new THREE.MeshStandardMaterial({
    color: 0x2E6FF2
})
const cube = new THREE.Mesh(geometry, material);
cube.castShadow = true; 
scene.add(cube);

const geometry2 = new THREE.PlaneGeometry(10, 10);
const material2 = new THREE.MeshStandardMaterial({
    color: 0x81a8f7,
    side: THREE.DoubleSide
})
const plane = new THREE.Mesh(geometry2, material2)
plane.rotation.x = Math.PI / -2;
plane.position.y = -1;
plane.receiveShadow = true; 
scene.add(plane);

const dl = new THREE.DirectionalLight(0xffffff, 2)
dl.position.set(0, 2, 2);
dl.castShadow = true;
scene.add(dl);


// 해상도 : 숫자 커지면 그림자 선명해지지만 렌더링 속도 느려질 수 있음
dl.shadow.mapSize.width = 1024;
dl.shadow.mapSize.height = 1024;

// 그림자 가장자리에 블러 효과
dl.shadow.radius = 5;

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const loader = new GLTFLoader();

loader.load("../src/models/Lycat-3d.glb", (gltf) => {
	const model = gltf.scene;
    // model.castShadow = true;
    
        // 모델의 모든 메쉬에 대해 castShadow 설정
    model.traverse((node) => {
        if (node.isMesh) {
            node.castShadow = true;
        }
    });
    scene.add(model);
});


// OrbitContorls
const controls = new OrbitControls(camera, renderer.domElement);

// controls.enableZoom = false; // 확대 축소 안 됨
// controls.enableRotate = false; // 화면 회전 안 됨
// controls.enablePan = false; // 이동 안 됨

controls.minDistance = 2;
controls.maxDistance = 10;
// controls.maxPolarAngle = Math.PI / 3; // 회전 각도 조절

// controls.autoRotate = true; // 자동 회전
controls.autoRotateSpeed = -10; // 속도 조절, 마이너스는 반대로 회전
controls.enableDamping = true; // 관성 적용되어 조금 더 부드러운 표현 가능

// 애니메이션 효과
function animate() {
    // obj2.rotation.y += 0.01;
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(animate);
}

animate();




// 반응형
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth/window.innerHeight
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})