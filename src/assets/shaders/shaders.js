async function shader(filename) {
	const modules = import.meta.glob('./*.*', {
		as: 'raw',
	});

	const path = `./${filename}`;
	if (modules[path]) {
		return await modules[path]();
	} else {
		console.error('Shader not found:', path);
	}
}

export const skyVS = await shader('sky.vert');
export const skyFS = await shader('sky.frag');
export const levelVS = await shader('level.vert');
export const levelFS = await shader('level.frag');
export const startFinishVS = await shader('start_finish.vert');
export const startFinishFS = await shader('start_finish.frag');
export const signVS = await shader('sign.vert');
export const signFS = await shader('sign.frag');
export const particleVS = await shader('particle.vert');
export const particleFS = await shader('particle.frag');
