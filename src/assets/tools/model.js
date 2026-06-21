import * as THREE from 'three';
import {
	acceleratedRaycast,
	computeBoundsTree,
	disposeBoundsTree,
} from 'three-mesh-bvh';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

/**
 * @param {File} file - A OBJ file
 * @returns {Promise<Object>} - A group level node
 */
async function model(file) {
	try {
		const level_nodes = await generate(file);
		if (!level_nodes) return null;
		return groupNodes(level_nodes);
	} catch (e) {
		window.toast(e, 'error');
		return null;
	}
}

function getSDFValue(point, mesh, raycaster) {
	const target = new THREE.Vector3();

	mesh.geometry.boundsTree.closestPointToPoint(point, target);
	const unsignedDistance = point.distanceTo(target);

	raycaster.set(point, new THREE.Vector3(0, 1, 0));
	const intersections = raycaster.intersectObject(mesh);

	let inside = false;
	if (intersections.length > 0) {
		inside = intersections[0].face.normal.dot(raycaster.ray.direction) > 0;
	}

	return inside ? -unsignedDistance : unsignedDistance;
}

async function generate(file) {
	const arrayBuffer = await file.arrayBuffer();
	const decoder = new TextDecoder('utf-8');

	const loader = new OBJLoader();
	const parsedObject = loader.parse(decoder.decode(arrayBuffer)); // 😍❤️👌

	if (parsedObject.children.length == 0) {
		window.toast(
			'Threejs parsed node has no children? Possibly invalid OBJ.',
			'error',
		);
		return null;
	}
	if (parsedObject.children[0].type != 'Mesh') {
		window.toast('Threejs parsed node missing Mesh child?', 'error');
		return null;
	}

	THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
	THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
	THREE.Mesh.prototype.raycast = acceleratedRaycast;

	// Compute bounds tree on extracted BufferGeometry
	const geometry = parsedObject.children[0].geometry;
	geometry.computeBoundsTree();

	// Create raycaster
	const raycaster = new THREE.Raycaster();

	console.log(triangles);
}

export default {
	model,
};
