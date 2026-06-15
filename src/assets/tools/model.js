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

async function generate(file) {
	const arrayBuffer = file.arrayBuffer();
	const decoder = new TextDecoder('utf-8');

	const loader = new OBJLoader();
	const parsedObject = loader.parse(decoder.decode(arrayBuffer));

	console.log(parsedObject);
}

export default {
	model,
};
