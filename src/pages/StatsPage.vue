<script>
import { mapState } from 'pinia';
import { useUserStore } from '@/stores/user';
import UserIcon from '@/icons/UserIcon.vue';
import FireIcon from '@/icons/FireIcon.vue';
import BlockedIcon from '@/icons/BlockedIcon.vue';
import SearchAltIcon from '@/icons/SearchAltIcon.vue';
import CheckmarkIcon from '@/icons/CheckmarkIcon.vue';
import PersonAltIcon from '@/icons/PersonAltIcon.vue';
import PersonIcon from '@/icons/PersonIcon.vue';
import PlayIcon from '@/icons/PlayIcon.vue';
import HeartIcon from '@/icons/HeartIcon.vue';
import ClockIcon from '@/icons/ClockIcon.vue';
import CalendarIcon from '@/icons/CalendarIcon.vue';
import StarAltIcon from '@/icons/StarAltIcon.vue';
import CheckmarkAltIcon from '@/icons/CheckmarkAltIcon.vue';
import PieChartIcon from '@/icons/PieChartIcon.vue';
import GlobeIcon from '@/icons/GlobeIcon.vue';
import TrophyIcon from '@/icons/TrophyIcon.vue';
import CoinIcon from '@/icons/CoinIcon.vue';
import MapIcon from '@/icons/MapIcon.vue';
import PeopleIcon from '@/icons/PeopleIcon.vue';
import FlagIcon from '@/icons/FlagIcon.vue';
import ListIcon from '@/icons/ListIcon.vue';
import ThumbsDownIcon from '@/icons/ThumbsDownIcon.vue';
import ThumbsUpIcon from '@/icons/ThumbsUpIcon.vue';
import PlusIcon from '@/icons/PlusIcon.vue';
import RefreshedIcon from '@/icons/RefreshedIcon.vue';
import GradCapIcon from '@/icons/GradCapIcon.vue';
import WrenchIcon from '@/icons/WrenchIcon.vue';
import WarningIcon from '@/icons/WarningIcon.vue';
import CalendarBlankIcon from '@/icons/CalendarBlankIcon.vue';
import ProgressBar from '@/components/ProgressBar.vue';

export default {
	components: {
		UserIcon,
		FireIcon,
		BlockedIcon,
		SearchAltIcon,
		CheckmarkIcon,
		PersonAltIcon,
		PersonIcon,
		PlayIcon,
		HeartIcon,
		ClockIcon,
		CalendarIcon,
		StarAltIcon,
		CheckmarkAltIcon,
		PieChartIcon,
		GlobeIcon,
		TrophyIcon,
		CoinIcon,
		PeopleIcon,
		MapIcon,
		FlagIcon,
		ListIcon,
		ThumbsDownIcon,
		ThumbsUpIcon,
		PlusIcon,
		RefreshedIcon,
		GradCapIcon,
		WrenchIcon,
		WarningIcon,
		CalendarBlankIcon,
		ProgressBar,
	},
	data() {
		return {
			// prettier-ignore
			sections: [
				{
					icon: PersonIcon, name: 'Personalised',
					lists: [
						{ name: 'Default', generator: this.most_liked_levels },
					],
				},
				{
					icon: FireIcon, name: 'Trending',
					lists: [
						{ icon: MapIcon, name: 'Maps', generator: this.most_liked_levels },
						{ icon: PeopleIcon, name: 'Creators', generator: this.most_liked_levels },
						{ icon: CalendarIcon, name: 'Weekly', generator: this.most_liked_levels },
						{ icon: CalendarIcon, name: 'Monthly', generator: this.most_liked_levels },
						{ icon: CalendarIcon, name: 'Yearly', generator: this.most_liked_levels },
					],
				},
				{
					icon: BlockedIcon, name: 'Unbeaten',
					lists: [
						{ icon: CheckmarkIcon, name: 'Verifier', generator: this.most_liked_levels },
						{ icon: PlusIcon, name: 'Created', generator: this.most_liked_levels },
						{ icon: RefreshedIcon, name: 'Updated', generator: this.most_liked_levels },
						{ icon: GradCapIcon, name: 'Sole', generator: this.most_liked_levels },
						{ icon: WrenchIcon, name: 'Creators', generator: this.most_liked_levels },
					],
				},
				{
					icon: SearchAltIcon, name: 'Search',
					lists: [
						{ name: 'Default', generator: this.most_liked_levels },
					],
				},
				{
					icon: CheckmarkIcon, name: 'Verified Maps',
					lists: [
						{ name: 'Default', generator: this.most_liked_levels },
					],
				},
				{
					icon: UserIcon, name: 'Plays',
					lists: [
						{ icon: PeopleIcon, name: 'Creators', generator: this.most_liked_levels },
						{ icon: MapIcon, name: 'Maps', generator: this.most_liked_levels },
					],
				},
				{
					icon: HeartIcon, name: 'Liked',
					lists: [
						{ icon: ThumbsUpIcon, name: 'Liked', generator: this.most_liked_levels },
						{ icon: ThumbsDownIcon, name: 'Disliked', generator: this.most_liked_levels },
					],
				},
				{
					icon: ClockIcon, name: 'Longest',
					lists: [
						{ name: 'Default', generator: this.most_liked_levels },
					],
				},
				{
					icon: CalendarIcon, name: 'Daily',
					lists: [
						{ name: 'Default', generator: this.most_liked_levels },
					],
				},
				{
					icon: StarAltIcon, name: 'Featured',
					lists: [
						{ name: 'Default', generator: this.most_liked_levels },
					],
				},
				{
					icon: CheckmarkAltIcon, name: 'Best of GRAB',
					lists: [
						{ name: 'Default', generator: this.most_liked_levels },
					],
				},
				{
					icon: PieChartIcon, name: 'Difficulties',
					lists: [
						{ name: 'All', generator: this.most_liked_levels },
						{ name: 'Easy', generator: this.most_liked_levels },
						{ name: 'Medium', generator: this.most_liked_levels },
						{ name: 'Hard', generator: this.most_liked_levels },
						{ name: 'Very Hard', generator: this.most_liked_levels },
					],
				},
				{
					icon: GlobeIcon, name: 'Global',
					lists: [
						{ name: 'Default', generator: this.most_liked_levels },
					],
				},
				{
					icon: TrophyIcon, name: 'Records',
					lists: [
						{ icon: FlagIcon, name: 'Top 1s', generator: this.most_liked_levels },
						{ icon: ListIcon, name: 'Top 100s', generator: this.most_liked_levels },
						{ icon: ClockIcon, name: 'First to beat', generator: this.most_liked_levels },
						{ icon: ClockIcon, name: 'Playtime', generator: this.most_liked_levels },
						{ icon: GradCapIcon, name: 'Sole', generator: this.most_liked_levels },
					],
				},
				{
					icon: CoinIcon, name: 'Tipping',
					lists: [
						{ icon: MapIcon, name: 'Maps', generator: this.most_liked_levels },
						{ icon: PeopleIcon, name: 'Creators', generator: this.most_liked_levels },
					],
				},
			],
			current_section: undefined,
			current_list: undefined,
			current_tab: undefined,
			progress: 0,
		};
	},
	computed: {
		...mapState(useUserStore, ['is_logged_in', 'user_name']),
	},
	methods: {
		set_tab(tab, filter = null) {
			if (!tab) return;

			const params = new URLSearchParams(window.location.search);
			params.set('tab', tab);
			if (filter) params.set('filter', filter);
			window.history.replaceState(
				{},
				'',
				`${location.pathname}?${params}`,
			);
			this.current_tab = tab;
			this.current_section = this.sections.find(
				(section) => section.name === tab,
			);
			if (filter) {
				this.current_list = this.current_section.lists.find(
					(list) => list.name === filter,
				);
			} else {
				this.current_list = this.current_section.lists[0];
			}
		},
	},
	created() {
		document.title = 'Stats | GRAB Tools';
	},
	mounted() {
		const params = new URLSearchParams(window.location.search);
		const tab = params.get('tab');
		const filter = params.get('filter');
		this.set_tab(tab, filter);
	},
};
</script>

<template>
	<main id="stats-page">
		<section id="info">
			<h2>GRAB Stats</h2>
			<p>
				Stats and leaderboards scraped from the GRAB servers, updated
				daily at 5:00 UTC. Level record related stats are updated
				monthly. Most leaderboards are limited to top 200.
			</p>
		</section>
		<section id="sections">
			<button
				v-for="section of sections"
				:key="section.name"
				:class="
					'button stats-button' +
					(current_section?.name === section.name
						? ' tab-active'
						: '')
				"
				:id="section.name"
				@click="
					() => {
						set_tab(section.name);
					}
				"
			>
				{{ section.name }}
				<component :is="section.icon" />
			</button>
		</section>
		<section id="sorters">
			<div
				v-for="section of sections"
				:key="section.name"
				class="stats-sorting"
				:id="section.name + '-sort'"
				v-show="section.name === current_section?.name"
			>
				<button
					v-for="list of section.lists.filter(
						(list) => list.name !== 'Default',
					)"
					:key="list.name"
					:class="
						'sort-btn button-sml' +
						(current_list?.name === list.name ? ' sort-active' : '')
					"
					:id="section.name + '-sort-btn'"
					@click="
						() => {
							set_tab(section.name, list.name);
						}
					"
				>
					{{ list.name }}
					<component v-if="list.icon" :is="list.icon" />
				</button>
			</div>
		</section>
		<section id="statistics">
			<ProgressBar :progress="progress" />
			<div
				v-for="[section, list] of sections.flatMap((section) =>
					section.lists.map((list) => [section, list]),
				)"
				:key="list.name"
				class="leaderboard-output"
				:id="list.name + '-out'"
				v-show="
					current_section?.name === section.name &&
					current_list?.name === list.name
				"
			>
				{{ list.name }}
			</div>
		</section>
	</main>
</template>

<style>
#stats-page .stats-sorting .sort-btn svg {
	width: 18px;
	height: 18px;
}
</style>
<style scoped>
.leaderboard-output {
	display: flex;
	flex-direction: column;
	gap: 5px;
	width: 100%;
	padding: 10px;
	max-height: 800px;
	overflow-y: scroll;
	overflow-x: hidden;
	position: relative;
}
#sections {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: var(--padding-secondary);
	padding-block: var(--padding-secondary);
	flex-wrap: wrap;
}
.stats-sorting {
	/* display: none; */
	display: flex;
	flex-direction: row;
	gap: 5px;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	max-width: 90%;
	margin-inline: auto;
}
.stats-sorting > .button-sml,
.list-sorting > .button-sml {
	gap: 5px;
}
.sort-active {
	background-color: #1b5eb135;
	border: solid 2px #2063b570;
}
.tab-active {
	background-color: #5f8cc235;
	border: solid 2px #4683ce70;
}
#sorters {
	padding-bottom: 0;
}
section {
	padding: var(--padding-main);
	width: 100%;
}
</style>
