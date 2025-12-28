<script>
import encoding from '@/assets/tools/encoding.js';
<<<<<<< HEAD
import audio from '@/assets/tools/audio.js';
=======
import image from '@/assets/tools/image.js';

/*
ill put effort into this once i know if its useful
>>>>>>> 3a8ee9a52259f27b91bca5e86ad08a48e257dee4

export default {
	methods: {
		async run() {
			const getByID = (id) => document.getElementById(id);
<<<<<<< HEAD
			const toolID = 'audio-tool';

			const files = Array.from(getByID(`${toolID}-file`).files);
			if (!files.length) {
				window.toast('No file chosen', 'error');
=======
			const toolID = 'image-tool';

			const files = Array.from(getByID(`${toolID}-file`).files);
			if (!files.length) {
				window.toast('No image file chosen', 'error');
>>>>>>> 3a8ee9a52259f27b91bca5e86ad08a48e257dee4
				return;
			}

			const file = files[0];
<<<<<<< HEAD
			const samples =
				parseInt(getByID(`${toolID}-pitch-samples`).value) || 40;

			const sampleRateMs =
				parseInt(getByID(`${toolID}-sample-rate`).value) || 10;

			const node = await audio.audio(file, samples, sampleRateMs);
			if (!node) return;

			const obj = encoding.createLevel(
				[node],
				'Audio',
				'Generated with GRAB Tools',
				['SFX2GL', 'GRAB Tools'],
=======
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
>>>>>>> 3a8ee9a52259f27b91bca5e86ad08a48e257dee4
			);

			const encoded = await encoding.encodeLevel(obj);
			if (encoded === null) return;

			encoding.downloadLevel(encoded);
		},
	},
};
<<<<<<< HEAD
</script>

=======
*/
</script>

<!--
Wait do i even need this file?
dont you only need to change MenuPanel.vue and add file in /src/assets/tools/

out of the kindness of my heart and also because i have no idea what im doing im 
adding this file anyways.
-->
>>>>>>> 3a8ee9a52259f27b91bca5e86ad08a48e257dee4
<template>
	<div>
		<h2>Import audio</h2>
		<p>Generate audio with triggers and sound blocks.</p>
		<div>
			<input
				type="number"
<<<<<<< HEAD
				id="audio-tool-pitch-samples"
				placeholder="Pitch Samples (40)"
			/>
			<input
				type="number"
				id="audio-tool-sample-rate"
				placeholder="Sample rate (ms) (10)"
			/>
			<input type="file" id="audio-tool-file" accept="audio/*" />
			<button class="button" id="audio-tool-btn" @click="run">
=======
				id="pitch-samples"
				placeholder="samples (40)"
			/>
			<input type="file" id="image-tool-file" accept="audio/*" />
			<button class="button" id="image-tool-btn" @click="run">
>>>>>>> 3a8ee9a52259f27b91bca5e86ad08a48e257dee4
				Generate
			</button>
		</div>
	</div>
</template>

<style scoped></style>
