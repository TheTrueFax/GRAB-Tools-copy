/**
 * @param {Array<Object>} nodes - A list of level nodes
 * @returns {Object} - A single level node
 */
function groupNodes(nodes) {
	return {
		levelNodeGroup: {
			position: {
				y: 0,
				x: 0,
				z: 0,
			},
			rotation: {
				y: 0,
				x: 0,
				z: 0,
				w: 1,
			},
			childNodes: nodes,
			scale: {
				y: 1,
				x: 1,
				z: 1,
			},
		},
	};
}

export default {
	groupNodes,
};
