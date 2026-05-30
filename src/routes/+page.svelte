<script>
	import Profile from '$components/Profile.svelte';
	import Social from '$components/Social.svelte';
</script>

<article
	container
	fcc
	gap-8
	mt8
	mxa
	text-center
>
	<div animate='duration-1000 keyframes-flip-in-x'>
		<Profile />
	</div>

	<h1
		style:view-transition-name='title-gustavodgoat'
		font-bold
	>
		<span block text='4xl'>Gustavo D Goat</span>
		<span
			animate-pulse
			block
			font-medium
			mt2
			text='xl text-700 dark:text-200'
		>
			Billonaire Playboy and not a philanthropist
		</span>
	</h1>

	<Social />
</article>
