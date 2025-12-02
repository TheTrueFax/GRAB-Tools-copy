<script>
import encoding from '@/assets/tools/encoding.js';
import image from '@/assets/tools/image.js';

/*
ill put effort into this once i know if its useful

export default {
	methods: {
		async run() {
			const getByID = (id) => document.getElementById(id);
			const toolID = 'image-tool';

			const files = Array.from(getByID(`${toolID}-file`).files);
			if (!files.length) {
				window.toast('No image file chosen', 'error');
				return;
			}

			const file = files[0];
			const width = parseInt(getByID(`${toolID}-width`).value) || 50;
			const height = parseInt(getByID(`${toolID}-height`).value) || 50;
			const mode = getByID(`${toolID}-mode`).value;
			const shape = getByID(`${toolID}-shape`).value;

			const node = await image.image(file, width, height, mode, shape);

			const obj = encoding.createLevel(
				[node],
				'Image',
				'Generated with GRAB Tools',
				['.index', 'GRAB Tools'],
			);

			const encoded = await encoding.encodeLevel(obj);
			if (encoded === null) return;

			encoding.downloadLevel(encoded);
		},
	},
};
*/
</script>

<!--
Wait do i even need this file?
dont you only need to change MenuPanel.vue and add file in /src/assets/tools/

out of the kindness of my heart and also because i have no idea what im doing im 
adding this file anyways.
-->
<template>
	<div>
		<h2>Import audio</h2>
		<p>Generate audio with triggers and sound blocks.</p>
		<div>
			<input
				type="number"
				id="pitch-samples"
				placeholder="samples (40)"
			/>
			<input type="file" id="image-tool-file" accept="audio/*" />
			<button class="button" id="image-tool-btn" @click="run">
				Generate
			</button>
		</div>
	</div>
</template>

<style scoped></style>
