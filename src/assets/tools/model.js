import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import * as THREE from 'three';
import { computeBoundsTree, disposeBoundsTree, acceleratedRaycast } from 'three-mesh-bvh';

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

function mesh_to_triangles(mesh) {
    const positionList = mesh.geometry.attributes.position.array;
    //const normalList = mesh.geometry.attributes.normal.array;
    let triangles = [];

    if (mesh.geometry.indexed) {
        window.toast('No current support for indexed obj files.', 'error');
        return null;
    } else {
        for (let i = 0; i < positionList.length; i+=9) { // i+=9 (3 floats per position, 3 positions per triangle)
            triangles.push({
                a: {x: positionList[i], y: positionList[i + 1], z: positionList[i + 2]},
                b: {x: positionList[i + 3], y: positionList[i + 4], z: positionList[i + 5]},
                c: {x: positionList[i + 6], y: positionList[i + 7], z: positionList[i + 8]}
            });
        }
    }

    return triangles;
}

function dot(a, b) { return a.x*b.x + a.y*b.y + a.z*b.z; }
function sub(a, b) { return { x:a.x-b.x, y:a.y-b.y, z:a.z-b.z }; }

// Inigo Quilez's Triangle Distance
function udTriangle(p, a, b, c) {
    var ba = sub(b, a), pa = sub(p, a);
    var cb = sub(c, b), pb = sub(p, b);
    var ac = sub(a, c), pc = sub(p, c);
    
    var d = Math.sqrt(
        Math.max(dot(sub(pa, ba.map(t => t * Math.max(0, Math.min(1, dot(pa, ba)/dot(ba, ba))))), pa)),
        dot(sub(pb, cb.map(t => t * Math.max(0, Math.min(1, dot(pb, cb)/dot(cb, cb))))), pb),
        dot(sub(pc, ac.map(t => t * Math.max(0, Math.min(1, dot(pc, ac)/dot(ac, ac))))), pc)
    );
    
    var nor = { 
        x: ba.y * ac.z - ba.z * ac.y, 
        y: ba.z * ac.x - ba.x * ac.z, 
        z: ba.x * ac.y - ba.y * ac.x 
    };
    var inside = (dot(nor, pa) < 0.0) &&
                 (dot(nor, pb) < 0.0) &&
                 (dot(nor, pc) < 0.0);
                 
    return inside ? -d : d;
}

async function generate(file) {
	const arrayBuffer = await file.arrayBuffer();
	const decoder = new TextDecoder('utf-8');

	const loader = new OBJLoader();
	const parsedObject = loader.parse(decoder.decode(arrayBuffer)); // 😍❤️👌

    if (parsedObject.children.length == 0) {
        window.toast('Threejs parsed node has no children? Possibly invalid OBJ.', 'error');
        return null;
    }
    if (parsedObject.children[0].type != "Mesh") {
        window.toast('Threejs parsed node missing Mesh child?', 'error');
        return null;
    }

    const triangles = mesh_to_triangles(parsedObject.children[0]);
    if (triangles == null) {
        return null;
    }

	console.log(triangles);
}

export default {
	model,
};
