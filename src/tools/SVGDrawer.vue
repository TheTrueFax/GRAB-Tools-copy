<script>
import encoding from '@/assets/tools/encoding.js';
import svg from '@/assets/tools/svg.js';

export default {
	methods: {
		async draw() {
			const getByID = (id) => document.getElementById(id);
			const toolID = 'svg-tool';

			const files = Array.from(getByID(`${toolID}-file`).files);
			if (!files.length) {
				window.toast('No svg file chosen', 'error');
				return;
			}

			const file = files[0];

			let nodes = await svg.svg(file, 600);

			const obj = encoding.createLevel(
				nodes,
				'SVG',
				'Generated with GRAB Tools',
				['.index', 'GRAB Tools'],
			);

			const encoded = await encoding.encodeLevel(obj);
			if (encoded === null) return;

			encoding.downloadLevel(encoded);
		},
	},
};
</script>

<template>
	<div>
		<h2>SVG Drawer</h2>
		<p>Convert simple SVG images into their built paths.</p>
		<div>
			<input type="file" id="svg-tool-file" />
			<button class="button" id="svg-tool-btn" @click="draw">
				Process
			</button>
		</div>
	</div>
</template>

<style scoped></style>
