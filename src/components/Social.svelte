<script lang='ts'>
	const { size = 4.5 } = $props();

	const ICONS = [
		{ class: 'i-line-md:github-loop', label: 'GitHub profile', url: 'https://github.com/GustavoDGoat' },
		{ class: 'i-line-md:twitter', label: 'Twitter profile', url: 'https://x.com/Gustavo_DGoat' },
		{ class: 'i-ri:youtube-line', label: 'YouTube channel', url: 'https://www.youtube.com/@Gustavo.DGoatt' },
	] as const;
</script>

<div
	animate='duration-3000 keyframes-fade-in'
	flex
	flex-wrap
	gap-4
	justify-center
	mt4
>
	{#each ICONS as { class: _class, label, url } (url)}
		<div
			hover='scale-110 shadow-xl z-10 bg-[#88888811] op100'
			op-card
			transition-base
		>
			<a aria-label={label} href={url} rel='noopener noreferrer' target='_blank'>
				<!-- svelte-ignore element_invalid_self_closing_tag -->
				<div
					style:--size='{size}vh'
					class={_class}
					aria-hidden='true'
					text-size='[--size]'
				></div>
			</a>
		</div>
	{/each}
</div>
