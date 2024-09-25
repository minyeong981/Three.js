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

  const camera = new THREE.PerspectiveCamera(
    60, // 시야각을 키우면 캐릭터가 작게 보이니 더 작은 값으로 설정 가능
    $result.clientWidth / $result.clientHeight,
    0.9,
    1000
  );
  camera.position.set(0, 30, 70); // 캐릭터에 더 가까이 위치하게 설정
  camera.lookAt(0, 0, 2);

  const renderer = new THREE.WebGLRenderer({
    canvas: $result,
    antialias: true,
  });
  renderer.setSize($result.clientWidth, $result.clientHeight);
  renderer.shadowMap.enabled = true;

  // 조명 추가
  const dl = new THREE.DirectionalLight(0xffffff, 2);
  dl.position.set(0, 2, 2);
  dl.castShadow = true;
  dl.shadow.mapSize.width = 1024;
  dl.shadow.mapSize.height = 1024;
  dl.shadow.radius = 5;
  scene.add(dl);

  const ambientLight = new THREE.AmbientLight(0xffffff, 7);
  scene.add(ambientLight);

  let loadedModel;

  // GLTF 모델 로드
  const loader = new GLTFLoader();
  loader.load(
    "../src/models/wavingGirl1.glb",
    (gltf) => {
      const model = gltf.scene;
      model.traverse((node) => {
        if (node.isMesh) {
          node.castShadow = true;
        }
      });

      // 모델의 크기를 크게 설정하여 캐릭터가 더 크게 보이도록 설정
      model.scale.set(30, 70, 30); // 모델 크기를 1.5배로 확대
      model.position.set(0, -3, 0);
      scene.add(model);
      loadedModel = model;

      if (gltf.animations && gltf.animations.length > 0) {
        mixer = new AnimationMixer(model);

        gltf.animations.forEach((clip) => {
          clip.tracks = clip.tracks.filter((track) => {
            const nodeName = track.name.split(".")[0];
            if (model.getObjectByName(nodeName)) {
              return true;
            } else {
              console.warn(`No target node found for track: ${track.name}`);
              return false;
            }
          });

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

  // OrbitControls 설정
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 2;
  controls.maxDistance = 5;
  controls.enableDamping = false;

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
  // window.addEventListener("resize", () => {
  //   camera.aspect = $result.clientWidth / $result.clientHeight;
  //   camera.updateProjectionMatrix();
  //   renderer.setSize($result.clientWidth, $result.clientHeight);
  // });
}
