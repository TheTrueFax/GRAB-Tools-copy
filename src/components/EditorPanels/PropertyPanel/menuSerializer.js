function isVector3(obj) {
	return (
		obj &&
		'x' in obj &&
		'y' in obj &&
		'z' in obj &&
		Object.keys(obj).length === 3
	);
}
function isVector4(obj) {
	return (
		obj &&
		'x' in obj &&
		'y' in obj &&
		'z' in obj &&
		'w' in obj &&
		Object.keys(obj).length === 4
	);
}

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

function serializeToMenu(value, key = 'node') {
	const serkey = camelToTitleCase(key);

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
				serializeToMenu(item, index.toString()),
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
				serializeToMenu(subVal, subKey),
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
