/**
 * @param {Array<Object>} nodes - A list of level nodes
 * @returns {Array<Object>} - A list of level nodes
 */
function monochrome(nodes) {
	nodes.forEach((node) => {
		let static_node = node.levelNodeStatic;
		if (static_node?.material !== 8) return;
		if (!static_node.color) static_node.color = {};

		const r = static_node.color.r ?? 0;
		const g = static_node.color.g ?? 0;
		const b = static_node.color.b ?? 0;

		const brightness = Math.sqrt(
			0.299 * Math.pow(r, 2) +
				0.587 * Math.pow(g, 2) +
				0.114 * Math.pow(b, 2),
		);

		static_node.color.r = brightness;
		static_node.color.g = brightness;
		static_node.color.b = brightness;
	});

	return nodes;
}

export default {
	monochrome,
};
