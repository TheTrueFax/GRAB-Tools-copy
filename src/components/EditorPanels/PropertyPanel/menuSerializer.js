const rgbToHex = (r, g, b) =>
	'#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');

function camelToTitleCase(str) {
	const spaced = str.replace(/([A-Z])/g, ' $1');
	return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

const classify_as = {
	vector3: ['position', 'scale', 'gradientDirection'],
	vector4: ['rotation'],
	color: ['color', 'color1', 'color2'],
};

const enumerate_as = {
	shape: [
		[1000, 'Cube'],
		[1001, 'Sphere'],
		[1002, 'Cylinder'],
		[1003, 'Pyramid'],
		[1004, 'Prisim'],
		[1005, 'Cone'],
		[1006, 'Pyramid Square'],
		[0, 'Start'],
		[1, 'Finish'],
		[2, 'Sign'],
		[3, 'Gravity'],
		[4, 'Lobby Terminal'],
		[5, 'Particle Emitter'],
		[6, 'Sound'],
		[7, 'GASM'],
		[8, 'Light'],
	],
	material: [
		[0, 'Linear'],
		[1, 'Quadratic Ease In'],
		[2, 'Quadratic Ease Out'],
		[3, 'Quadratic Ease In Out'],
		[4, 'Sinusoidal Ease In'],
		[5, 'Sinusoidal Ease Out'],
		[6, 'Sinusoidal Ease In Out'],
		[7, 'Exponential Ease In'],
		[8, 'Exponential Ease Out'],
		[9, 'Exponential Ease In Out'],
		[10, 'Circular Ease In'],
		[11, 'Circular Ease Out'],
		[12, 'Circular Ease In Out'],
		[13, 'Cubic Ease In'],
		[14, 'Cubic Ease Out'],
		[15, 'Cubic Ease In Out'],
		[16, 'Quartic Ease In'],
		[17, 'Quartic Ease Out'],
		[18, 'Quartic Ease In Out'],
		[19, 'Quintic Ease In'],
		[20, 'Quintic Ease Out'],
		[21, 'Quintic Ease In Out'],
	],
	weight: [
		[0, 'Regular'],
		[1, 'Light'],
		[2, 'Semibold'],
		[3, 'Bold'],
		[4, 'Italic'],
	],
	levelNodeGravity: [
		[0, 'Legs'],
		[1, 'Fling'],
	],
	triggerSourceBasic: [
		[0, 'Hand'],
		[1, 'Head'],
		[2, 'Grapple'],
		[3, 'Feet'],
		[4, 'Block'],
	],
	triggerTargetAnimation: [
		[0, 'Stop'],
		[1, 'Start'],
		[2, 'Toggle'],
		[3, 'Toggle Reverse'],
		[4, 'Restart'],
		[5, 'Reset'],
	],
	triggerTargetSound: [
		[0, 'Stop'],
		[1, 'Start'],
		[2, 'Toggle'],
		[4, 'Restart'],
		[5, 'Reset'],
	],
	triggerTargetGASM: [
		[0, 'Stop'],
		[1, 'Start'],
		[2, 'Toggle'],
		[4, 'Restart'],
		[5, 'Reset'],
	],
	triggerTargetMode: [
		[0, 'On Enter'],
		[1, 'On Leave'],
		[2, 'Enter or Leave'],
		[3, 'None'],
	],
	SoundGeneratorParametersWaveType: [
		[0, 'Square'],
		[1, 'Sawtooth'],
		[2, 'Sine'],
		[3, 'Noise'],
	],
	levelNodeGASMConnectionType: [
		[0, 'Node'],
		[1, 'Player'],
	],
	LevelNodeLightType: [
		[0, 'Point'],
		[1, 'Spot'],
	],
	AnimationDirection: [
		[0, 'Restart'],
		[1, 'Ping Pong'],
	],
	AnimationInterpolation: [
		[0, 'No interpolation'],
		[1, 'Interpolation'],
	],
};

function deSerialize(object) {
	if (object.children) {
		if (object.type == 'array') {
			let result = [];
			object.children.forEach((element) => {
				result.push(deSerialize(element));
			});
			return result;
		} else {
			let result = {};
			object.children.forEach((element) => {
				result[element.key] = deSerialize(element);
			});
			return result;
		}
	}
	if (object.type == 'color' && typeof object.value === 'string') {
		return {
			r: parseInt(object.value.substring(1, 3), 16) / 255,
			g: parseInt(object.value.substring(3, 5), 16) / 255,
			b: parseInt(object.value.substring(5, 7), 16) / 255,
			a: 1,
		};
	}
	return object.value;
}

function serializeToMenu(value, key = 'node', parentKey = null) {
	const serkey = camelToTitleCase(key);

	if (Object.keys(enumerate_as).includes(key)) {
		return {
			title: serkey,
			key: key,
			type: 'enum',
			value: 0,
			enumData: enumerate_as[key],
			isExpandable: false,
			children: null,
		};
	}

	if (typeof value === 'object' && classify_as.vector3.includes(key)) {
		return {
			title: serkey,
			key: key,
			type: 'vector3',
			value: {
				x: 0,
				y: 0,
				z: 0,
				...value,
			},
			isExpandable: false,
			children: null,
		};
	}

	if (typeof value === 'object' && classify_as.vector4.includes(key)) {
		return {
			title: serkey,
			key: key,
			type: 'vector4',
			value: {
				x: 0,
				y: 0,
				z: 0,
				w: 0,
				...value,
			},
			isExpandable: false,
			children: null,
		};
	}

	if (typeof value === 'object' && classify_as.color.includes(key)) {
		const col = {
			r: value.r * 255 || 0,
			g: value.g * 255 || 0,
			b: value.b * 255 || 0,
		};
		return {
			title: serkey,
			key: key,
			type: 'color',
			value: rgbToHex(col.r, col.g, col.b),
			isExpandable: false,
			children: null,
		};
	}

	if (Array.isArray(value)) {
		return {
			title: serkey,
			key: key,
			type: 'array',
			value: null,
			isExpandable: value.length > 0,
			children: value.map((item, index) =>
				serializeToMenu(item, index.toString(), key),
			),
		};
	}

	if (typeof value === 'object' && value !== null) {
		return {
			title: serkey,
			key: key,
			type: 'object',
			value: null,
			isExpandable: value != {},
			children: Object.entries(value).map(([subKey, subVal]) =>
				serializeToMenu(subVal, subKey, key),
			),
		};
	}

	return {
		title: serkey,
		key: key,
		type: typeof value,
		value: value,
		isExpandable: false,
		children: null,
	};
}

export { deSerialize, serializeToMenu };
