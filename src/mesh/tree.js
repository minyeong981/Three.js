import * as THREE from "three";

export default function printTree() {
const tree = new THREE.Group();
const trunk = new THREE.Group();

const trunMaterial = new THREE.MeshStandardMaterial({
    color: 0xa38049
})
const trunkGeometry = new THREE.CylinderGeometry(0.8, 1, 1.5);
const trunk1 = new THREE.Mesh(trunkGeometry, trunMaterial)
trunk.add(trunk1)

const trunk2 = new THREE.Mesh(trunkGeometry, trunMaterial)
trunk2.position.set(0.1, 1.3, 0);
trunk2.scale.set(0.9, 0.9, 0.9);
trunk2.rotation.z = THREE.MathUtils.degToRad(-5);
trunk.add(trunk2)

const trunk3 = new THREE.Mesh(trunkGeometry, trunMaterial)
trunk3.position.set(0.2, 2.5, 0);
trunk3.scale.set(0.8, 0.8, 0.8);
trunk3.rotation.z = THREE.MathUtils.degToRad(-5);
trunk.add(trunk3)

const trunk4 = new THREE.Mesh(trunkGeometry, trunMaterial)
trunk4.position.set(0.3, 3.5, 0);
trunk4.scale.set(0.7, 0.7, 0.7);
trunk3.rotation.z = THREE.MathUtils.degToRad(-8);
trunk.add(trunk4)

trunk.position.x = 1.6
tree.add(trunk)


const leaf = new THREE.Group();
const leafMaterial = new THREE.MeshStandardMaterial({
    color: 0x84ad88,
    side: THREE.DoubleSide,
})
const leafGeoemetry = new THREE.SphereGeometry(2, 32, 16, Math.PI/3, Math.PI/3)
const leaf1 = new THREE.Mesh(leafGeoemetry, leafMaterial)
leaf1.rotation.x = Math.PI / -2;
leaf1.position.set(0, 3.2, 2);
leaf.add(leaf1);

const leaf2 = new THREE.Mesh(leafGeoemetry, leafMaterial)
// leaf2.rotation.reorder('ZXY')
leaf2.rotation.x = Math.PI / -2;
leaf2.rotation.z = Math.PI / 2;
leaf2.position.set(2, 3.2, 0);
leaf.add(leaf2);

const leaf3 = new THREE.Mesh(leafGeoemetry, leafMaterial)
leaf3.rotation.x = Math.PI / -2;
leaf3.rotation.z = Math.PI;
leaf3.position.set(0, 3.2, -2);
leaf.add(leaf3);

const leaf4 = new THREE.Mesh(leafGeoemetry, leafMaterial)
leaf4.rotation.x = Math.PI / -2;
leaf4.rotation.z = Math.PI / -2;
leaf4.position.set(-2, 3.2, 0);
leaf.add(leaf4);

leaf.position.x = 1.6;
leaf.rotation.z = THREE.MathUtils.degToRad(-10);

tree.position.x = 4;
tree.add(leaf)

return tree;
}