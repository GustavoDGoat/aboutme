<script lang='ts'>
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import * as DarkMode from 'svelte-fancy-darkmode';

	const LINKS = [
		{ name: 'works', href: resolve('/works') },
		{ name: 'blog', href: resolve('/blog') },
		{ name: 'life', href: resolve('/life') },
	] as const satisfies { href: string; name: string; icon?: string }[];
</script>

{#snippet underline(isPath: boolean, transparentDefault = false)}
	<span
		class={{
			'bg-accent-100': isPath,
			'bg-transparent': !isPath || transparentDefault,
			'view-transition--nav-underline': isPath,
		}}
		absolute
		h-0.5
		w-full
	/>
{/snippet}

<header
	fcol
	fyc
	gap-y-lg
	grid
	grid-cols='1 md:3'
	mxa
	op='card hover:100'
	py-6
	text-xl
	transition-base
	view-transition--nav
>
	<div flex>
		<a
			aria-label='Home'
			font-bold
			href={resolve('/')}
			m='xa md:(b0 x0)'
			relative
		>
			<div
				style:view-transition-name='title-gustavodgoat'
				class={{ hidden: page.url.pathname === '/' }}
			>
				@GustavoDDoat
			</div>
			<div>{@render underline(page.url.pathname === '/', true)}</div>
		</a>
	</div>
	<nav
		aria-label='Primary navigation'
		col-span-2
		flex='wrap'
		font-bold
		fxc
		gap-4
		m='xa md:r0'
		md-fxe
		text-lg
	>
		<div flex gap-4>
			{#each LINKS as { href, name, ...rest } (href)}
				{@const isPath = page.url.pathname.startsWith(href)}
				{@const icon = 'icon' in rest ? rest.icon : null}
				<a
					style:view-transition-name='-nav-link-{name}'
					block
					{href}
					px-0
					rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
					relative
					target={href.startsWith('http') ? '_blank' : undefined}
				>
					<div fyc>
						{name}
						{#if icon != null} <span class={icon} aria-hidden='true' /> {/if}
					</div>
					{@render underline(isPath, false)}
				</a>
			{/each}
		</div>
		<div flex gap='4 md:2' items-center view-transition--nav-icons>
			<DarkMode.ToggleButton>
				{#snippet dark()}
					<span class='i-line-md:sunny-filled-loop-to-moon-filled-transition dark-mode-icon' aria-hidden='true' />
				{/snippet}

				{#snippet light()}
					<span class='i-line-md:moon-filled-to-sunny-filled-loop-transition dark-mode-icon' aria-hidden='true' />
				{/snippet}
			</DarkMode.ToggleButton>
			<a
				class='i-teenyicons:github-solid'
				aria-label='Source code on GitHub'
				fyc
				href='https://github.com/GustavoDGoat'
				mya
				rel='noopener noreferrer'
				target='_blank'
			>
				GitHub
			</a>
		</div>
	</nav>
</header>

<style>
a {
	--uno: no-underline;
}
:global(.dark-mode-icon) {
	width: 1.5em;
	height: 1.5em;
	cursor: pointer;
}
</style>
