<script lang='ts'>
	import { PUBLIC_ORIGIN } from '$env/static/public';
	import * as ufo from 'ufo';
</script>

{#snippet link(
	_subdomain: string,
	icon: string,
	color: `btn-${string}`,
	name: string
)}
	<a
		class={color}
		fcol-md-row
		fyc
		gap-1
		href={ufo.joinURL(PUBLIC_ORIGIN, _subdomain)}
		rel='noopener noreferrer'
		target='_blank'
	>
		<!-- svelte-ignore element_invalid_self_closing_tag -->
		<span class={icon} aria-hidden='true' /> {name}
	</a>
{/snippet}

<div
	mt10
	mxa
	pb5
	prose='~ dark:invert'
>
	<div fxc gap-2>
		{@render link('/github', 'i-ph-github-logo-duotone', 'btn-blue', 'GitHub')}
	</div>

</div>
