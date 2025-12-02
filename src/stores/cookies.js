import { defineStore } from 'pinia';
import { useUserStore } from './user';
import * as Sentry from '@sentry/vue';

export const useCookiesStore = defineStore('cookies', {
	state: () => ({
		allow_cookies: false,
		timestamp: 0,
	}),
	actions: {
		set_allow_cookies(value) {
			this.allow_cookies = value;
			if (value) {
				const user = useUserStore();
				if (user.user_name && this.allow_cookies) {
					Sentry.setUser({ username: user.user_name });
				}
			} else {
				this.timestamp = Date.now();
				Sentry.setUser({ username: null });
			}
		},
	},
	persist: true,
});
