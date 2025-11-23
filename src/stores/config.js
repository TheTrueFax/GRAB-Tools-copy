import { defineStore } from 'pinia';

export const useConfigStore = defineStore('config', {
	state: () => ({
		editor_config: undefined,
		default_level: undefined,
		dark_mode: false,
	}),
	actions: {
		set_dark_mode(value) {
			this.dark_mode = value;
		},
	},
	persist: true,
});
