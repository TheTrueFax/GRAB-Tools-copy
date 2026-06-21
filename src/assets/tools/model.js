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

class OctreeNode {
	constructor(center, size) {
		this.center = center;
		this.size = size;
		this.children = null;
		this.type = null; // 0 = empty, 1 = mixed, 2 = filled
	}
}

function calculate_octree(node, matrix, mesh, raycaster) {
	const box = new THREE.Box3(
		new THREE.Vector3(
			node.center.x - node.size.x,
			node.center.y - node.size.y,
			node.center.z - node.size.z,
		),
		new THREE.Vector3(
			node.center.x + node.size.x,
			node.center.y + node.size.y,
			node.center.z + node.size.z,
		),
	);

	if (!mesh.geometry.boundsTree.intersectsBox(box, matrix)) {
		return point_in_mesh(node.center, mesh, raycaster)
			? 2 // filled
			: 0; // empty
	}

	const xs = [box.min.x, box.max.x];
	const ys = [box.min.y, box.max.y];
	const zs = [box.min.z, box.max.z];

	for (const x of xs)
		for (const y of ys)
			for (const z of zs) {
				if (
					!point_in_mesh(new THREE.Vector3(x, y, z), mesh, raycaster)
				) {
					return 1; // mixed
				}
			}

	return 2; // filled
}

function point_in_mesh(point, mesh, raycaster) {
	raycaster.set(point, new THREE.Vector3(1, 0, 0));

	const hits = raycaster.intersectObject(mesh, false);

	return hits.length % 2 === 1;
}

function build_octree(mesh, raycaster, max_depth) {
	const box = new THREE.Box3();
	box.setFromObject(mesh);

	const box_to_local_mat = new THREE.Matrix4()
		.copy(mesh.matrixWorld)
		.invert();

	const center = new THREE.Vector3().lerpVectors(box.min, box.max, 0.5);
	const size = box.max.clone().sub(box.min).divideScalar(2);

	const parent_octree = new OctreeNode(center, size);
	let pending_octrees = [parent_octree];

	for (let i = 0; i < max_depth; i++) {
		let pending_buffer = [];
		for (let x = 0; x < pending_octrees.length; x++) {
			const oct = pending_octrees[x];
			if (oct.type != null) continue;
			oct.type = calculate_octree(
				pending_octrees[x],
				box_to_local_mat,
				mesh,
				raycaster,
			);
			if (oct.type == 1) {
				// mixed
				oct.children = [];
				const half_size = oct.size.clone().divideScalar(2);
				for (let x = -1; x < 2; x += 2) {
					for (let y = -1; y < 2; y += 2) {
						for (let z = -1; z < 2; z += 2) {
							const newoctree = new OctreeNode(
								oct.center
									.clone()
									.add(
										new THREE.Vector3(
											half_size.x * x,
											half_size.y * y,
											half_size.z * z,
										),
									),
								half_size,
							);
							oct.children.push(newoctree);
							pending_buffer.push(newoctree);
						}
					}
				}
			}
		}
		console.log(pending_buffer);
		pending_octrees = pending_buffer;
		pending_buffer = [];
	}

	return parent_octree;
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
	const mesh = parsedObject.children[0];
	mesh.geometry.computeBoundsTree();

	// Create raycaster
	const raycaster = new THREE.Raycaster();

	const octree = build_octree(mesh, raycaster, 4);
}

export default {
	model,
};
