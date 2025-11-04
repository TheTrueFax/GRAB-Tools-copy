<script>
import { mapState } from 'pinia';
import { useUserStore } from '@/stores/user';
import encoding from '@/assets/tools/encoding';

export default {
	computed: {
		...mapState(useUserStore, ['is_logged_in', 'user_name']),
	},
	methods: {
		async can_download_level(level_id) {
			if (!this.is_logged_in) {
				window.toast('Login to download your levels', 'warning');
				return false;
			}

			const user_id = level_id.split(':')[0];

			const user_response = await fetch(
				`${this.$config.GRAB_SERVER_URL}get_user_info?user_id=${user_id}`,
			);
			const user = await user_response.json();

			if (this.user_name !== user.user_name) return false;

			return true;
		},
		async download_level(level_id) {
			const link_id = level_id.replaceAll(':', '/');
			const map_id = level_id.split(':')[1];

			let iteration = 1;
			const details_response = await fetch(
				`${this.$config.GRAB_SERVER_URL}details/${link_id}`,
			);
			const details = await details_response.json();

			if (level_id.split(':').length !== 3) {
				iteration = details.iteration || 1;
			}

			const download_response = await fetch(
				`${this.$config.GRAB_SERVER_URL}download/${link_id}/${iteration}`,
			);
			const download = await download_response.arrayBuffer();
			encoding.downloadLevel(download, map_id);
		},
	},
	mounted() {
		const url_params = new URLSearchParams(window.location.search);
		const level = url_params.get('level');
		if (level) {
			level.split(' ').forEach(async (level_id) => {
				if (await this.can_download_level(level_id)) {
					await this.download_level(level_id);
				}
			});
		}
	},
	created() {
		document.title = 'Download | GRAB Tools';
	},
};
</script>

<template>
	<main>
		<section>
			<h2>Downloading</h2>
			<p>Downloading the level...</p>
			<br />
			<h2>DON'T STEAL LEVELS!</h2>
			<p>
				Uploading other player's levels can result in the map being
				removed and you receiving a warning or a ban! Don't take other's
				levels without permission.
			</p>
		</section>
	</main>
</template>

<style scoped></style>
