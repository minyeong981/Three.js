import * as THREE from "three";

export default function printTangerine() {
const fruit = new THREE.Group();

const bodyMaterial = new THREE.MeshStandardMaterial({
    color: 0xff7f00,
    // wireframe: true,
})
const bottomGeometry = new THREE.DodecahedronGeometry(2, 1);
const bottom = new THREE.Mesh(bottomGeometry, bodyMaterial);
fruit.add(bottom);

const topGeometry = new THREE.TetrahedronGeometry(0.8, 3);
const top = new THREE.Mesh(topGeometry, bodyMaterial);
fruit.add(top);
top.position.y = 1.7;

const fruitLeafMaterial = new THREE.MeshStandardMaterial({
    color: 0x008000,
    side: THREE.DoubleSide,
})
const steamGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.4);
const stem = new THREE.Mesh(steamGeometry, fruitLeafMaterial);
stem.position.y = 2.5;
fruit.add(stem);

const fruitLeafGeoemetry = new THREE.SphereGeometry(0.5, 32, 16, 0, Math.PI / 3);
const fruitLeaf = new THREE.Mesh(fruitLeafGeoemetry, fruitLeafMaterial);
fruit.add(fruitLeaf);
fruitLeaf.position.set(-0.5, 2.4, -0.1);
fruitLeaf.rotation.z = Math.PI / -2;

return fruit;
}