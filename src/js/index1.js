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

const geometry = new THREE.BoxGeometry(1,1,1);
const basic = new THREE.MeshBasicMaterial({
    color: 0x2e6ff2,
    // wireframe: true,
    transparent: false,
    opacity: 0.5,
})

const standard = new THREE.MeshStandardMaterial({
    color: 0xffaaaa,
    roughness: 0.2, // 거칠기
    metalness: 0.8, // 금속성,
    // map
    side: THREE.DoubleSide,
})

// MeshStandardMaterial과 동일한 결과 나오는 이유
// MeshPhysicalMaterial이 MeshPhysicalMaterial의 확장 버전으로 고급 물리 기반의 렌더링 제공
const physical = new THREE.MeshPhysicalMaterial({
    color: 0xffaaaa,
    clearcoat: 0.8, // 반투명의 레이어층 (빛 반사)
    clearcoatRoughness: 0.2,
})

const phong = new THREE.MeshPhongMaterial({
    color: 0xffaaaa,
    shininess: 100, // 은은한 빛 반사
    specular: 0x2e6ff2, // 빛 반사 색
})

const mesh = new THREE.Mesh(geometry, phong);
scene.add(mesh);

const plane = new THREE.Mesh((new THREE.PlaneGeometry(1, 1)), standard);
// scene.add(plane);




// const material = new THREE.MeshStandardMaterial({color: 0x2e6ff2});

// // 육면체
// const geo1 = new THREE.BoxGeometry(1, 1, 1);
// const obj1 = new THREE.Mesh(geo1, material);
// // scene.add(obj1);

// // 원뿔 (반지름, 높이, 각(클수록 원에 가까워짐))
// const geo2 = new THREE.ConeGeometry(0.5, 1, 4);
// const obj2 = new THREE.Mesh(geo2, material);
// // scene.add(obj2);

// // 원기둥
// const geo3 = new THREE.CylinderGeometry(0.5, 0.8, 1);
// const obj3 = new THREE.Mesh(geo3, material);
// // scene.add(obj3);

// // 구 (반지름)
// const geo4 = new THREE.SphereGeometry(1);
// const obj4 = new THREE.Mesh(geo4, material);
// // scene.add(obj4);

// // 평면
// const geo5 = new THREE.PlaneGeometry(1, 1);
// const obj5 = new THREE.Mesh(geo5, material);
// // scene.add(obj5);

// // 원
// const geo6 = new THREE.CircleGeometry(1, 32);
// const obj6 = new THREE.Mesh(geo6, material);
// // scene.add(obj6);

// // 튜브 (도형 중심 부분에서 튜브 중심 부분까지의 길이, 튜브의 반경)
// const geo7 = new THREE.TorusGeometry(1, 0.3);
// const obj7 = new THREE.Mesh(geo7, material);
// scene.add(obj7);




// 애니메이션 효과
function animate() {
    // obj2.rotation.y += 0.01;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();




// 반응형
window.addEventListener('resize', () => {
    // 카메라의 종횡비
    camera.aspect = window.innerWidth/window.innerHeight
    // 카메라 업데이트
    camera.updateProjectionMatrix();

    // 2. 렌더리의 크기
    renderer.setSize(window.innerWidth, window.innerHeight);
})