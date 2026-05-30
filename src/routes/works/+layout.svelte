<script lang='ts'>
	import { page } from '$app/state';
	import { capitalize, lowercase } from '@ryoppippi/str-fns';

	const routes = [
		'products',
		'rust',
		'oss',
		'jojo',
	] as const;

	const { children } = $props();
</script>

<div>
	<div font-mono mb-8 text-center>
		<h1 font-bold op70 pb-2 text-5xl>Works</h1>
	</div>

	<nav
		aria-label='Works sections'
		flex
		font-mono
		gap-8
		justify-center
		mb-12
		text-lg
	>
		{#each routes as route (route)}
			{@const lowercaseRoute = lowercase(route)}
			{@const isCurrent = page.route.id?.endsWith(lowercaseRoute)}
			<a
				class={{
					'text-text-800 dark:text-text-100 font-bold border-b-2 border-accent-100 pb-1': isCurrent,
					'op40 hover:op100 transition-base pb-1 border-b-2 border-transparent': !isCurrent,
				}}
				aria-current={isCurrent ? 'page' : undefined}
				href={isCurrent ? null : lowercaseRoute}
				tracking-wider
				uppercase
			>{capitalize(route)}</a>
		{/each}
	</nav>

	{@render children()}
</div>
