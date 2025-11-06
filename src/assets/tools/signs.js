/**
 * @param {String} text - Some text
 * @param {Boolean} animated - Toggle animated mode
 * @returns {Array<Object>} - A list of level nodes
 */
function signs(text, animated) {
	let nodes = animated
		? text_to_signs_animated(text)
		: text_to_signs(text, 16, 'horizontal');

	return nodes;
}

// TODO: refactor this whole file
function text_to_signs(text, wpm, direction) {
	let words = text.split(' ');

	let splitStrings = [];
	for (let i = 0; i < words.length; i += wpm) {
		let chunk = words.slice(i, i + wpm);
		splitStrings.push(chunk.join(' '));
	}
	let signs = [];
	splitStrings.forEach((str, i) => {
		let sign = {
			levelNodeSign: {
				position: { x: 0, y: 0, z: 0 },
				rotation: { w: 1.0 },
				text: str,
			},
		};
		if (direction == 'horizontal') {
			sign.levelNodeSign.position.x = i;
		} else {
			sign.levelNodeSign.position.y = -i;
		}
		signs.push(sign);
	});

	return signs;
}

function text_to_signs_animated(text) {
	// config
	let count = 0;
	let char_width = 0.05;
	let appearance_time = 2;
	let interval = 0.1;
	let active_position = 0;
	let visible_length = 40;
	let foreward_pos = 1;
	let height = 0;
	let levelNodes = [];
	let last_10 = [];

	let wants_return = false;

	for (let i = 0; i < text.split('').length; i++) {
		let char = text.charAt(i);
		if (char == '\n') {
			wants_return = true;
		}
		let sign_iter = find_char(char, last_10, levelNodes);
		if (!sign_iter) {
			levelNodes.push({
				levelNodeSign: {
					position: {},
					rotation: {
						w: 1.0,
					},
					text: char,
				},
				animations: [
					{
						frames: [
							{
								position: {},
								rotation: {
									w: 1.0,
								},
							},
						],
						name: 'idle',
						speed: 1,
					},
				],
			});
		}

		sign_iter = find_char(char, last_10, levelNodes);
		last_10.push(sign_iter);

		if (last_10.length > appearance_time / interval) {
			last_10.pop(0);
		}

		levelNodes[sign_iter].animations[0].frames.push({
			position: {
				z: 1 * foreward_pos,
				y: height * char_width * -2,
				x: 1 * active_position * char_width,
			},
			rotation: {
				w: 1.0,
			},
			time: count * interval,
		});

		levelNodes[sign_iter].animations[0].frames.push({
			position: {
				z: 1 * foreward_pos,
				y: height * char_width * -2,
				x: 1 * active_position * char_width,
			},
			rotation: {
				w: 1.0,
			},
			time: count * interval + appearance_time,
		});

		levelNodes[sign_iter].animations[0].frames.push({
			position: {},
			rotation: {
				w: 1.0,
			},
			time: count * interval + appearance_time,
		});

		active_position += 1;
		if (active_position > visible_length) {
			wants_return = true;
		}
		if (wants_return && char == ' ') {
			active_position = 0;
			height += 1;
			wants_return = false;
		}

		count++;
	}

	for (let i = 0; i < levelNodes.length; i++) {
		levelNodes[i].animations[0].frames.push({
			position: {
				x: 0,
				y: 0,
				z: 0,
			},
			rotation: {
				w: 1.0,
			},
			time: count * interval + appearance_time + 1,
		});
	}
	return levelNodes;
}

function find_char(char, last_10, nodes) {
	for (let i = 0; i < nodes.length; i++) {
		if (nodes[i].levelNodeSign.text == char && !last_10.includes(i)) {
			return i;
		}
	}
	return false;
}

export default {
	signs,
};
