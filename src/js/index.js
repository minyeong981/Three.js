import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { AnimationMixer } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// 기본 설정
let mixer;
const clock = new THREE.Clock();
const $result = document.getElementById("result");

if (!$result) {
  console.error("Error: The element with id 'result' was not found.");
} else {
  // 씬, 카메라, 렌더러 설정
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  // 카메라 설정 - 더 가까이 설정하여 확대 효과
  const camera = new THREE.PerspectiveCamera(
    10, // 시야각을 약간 넓게 설정하여 모델이 더 가까워 보이도록
    $result.clientWidth / $result.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0.4, 1, 30); // 더 가까이 설정하여 확대된 것처럼 보임
  camera.lookAt(0, 0, 0); // 모델의 위치에 맞추어 카메라 시점을 설정

  const renderer = new THREE.WebGLRenderer({
    canvas: $result,
    antialias: true,
  });

  // 해상도 개선을 위해 픽셀 비율 설정
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize($result.clientWidth, $result.clientHeight);
  renderer.shadowMap.enabled = true;

  // 조명 추가
  const dl = new THREE.DirectionalLight(0xffffff, 1);
  dl.position.set(5, 5, 5);
  dl.castShadow = true;
  dl.shadow.mapSize.width = 2048;
  dl.shadow.mapSize.height = 2048;
  scene.add(dl);

  const ambientLight = new THREE.AmbientLight(0xffffff, 4);
  scene.add(ambientLight);

  let loadedModel;

  // GLTF 모델 로드
  const loader = new GLTFLoader();
  loader.load(
    "../src/models/BBwaving.glb",
    (gltf) => {
      const model = gltf.scene;
      model.traverse((node) => {
        if (node.isMesh) {
          node.castShadow = true;
          node.receiveShadow = true; // 그림자 효과를 추가로 개선
        }
      });

      // 모델의 크기를 크게 설정하여 더 확대된 것처럼 보이게 설정
      model.scale.set(1, 1, 1); // 모델 크기를 5배로 확대
      model.position.set(0, -10, 0); // 모델의 위치 설정
      scene.add(model);
      loadedModel = model;

      if (gltf.animations && gltf.animations.length > 0) {
        mixer = new AnimationMixer(model);

        gltf.animations.forEach((clip) => {
          const action = mixer.clipAction(clip);
          action.play();
        });
      } else {
        console.warn("No animations found in the model.");
      }
    },
    undefined,
    (error) => {
      console.error("An error occurred while loading the model:", error);
    }
  );

  // OrbitControls 설정 - 최소 거리와 최대 거리를 모델 크기에 맞게 조정
  const controls = new OrbitControls(camera, renderer.domElement);
  // controls.minDistance = 6;
  // controls.maxDistance = 6; // 더 가까운 거리에서 최대 거리 제한
  // controls.enableDamping = true;

  // 화면 위아래 움직임을 막기 위한 설정
  controls.minPolarAngle = Math.PI / 2.5; // 위아래 움직임을 중간 위치에 고정 (90도)
  controls.maxPolarAngle = Math.PI / 2.5; // 위아래 움직임을 중간 위치에 고정 (90도)

  // 좌우로 살짝만 움직이게 설정
  controls.minAzimuthAngle = -Math.PI / 6; // 좌측으로 30도까지만 회전
  controls.maxAzimuthAngle = Math.PI / 6; // 우측으로 30도까지만 회전

  // 애니메이션 및 렌더링 함수
  function animate() {
    requestAnimationFrame(animate);

    if (mixer) {
      mixer.update(clock.getDelta());
    }

    controls.update();
    renderer.render(scene, camera);
  }

  animate();

  // 반응형 설정
  window.addEventListener("resize", () => {
    camera.aspect = $result.clientWidth / $result.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize($result.clientWidth, $result.clientHeight);
  });
}
