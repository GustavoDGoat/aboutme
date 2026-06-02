<script lang='ts'>
	import { formatDate } from '$lib/util';

	const { data } = $props();
</script>

<article container fcol gap-8 max-w-3xl mxa py-8>
	<header mb-8>
		<h1 font-bold mb-4 text='4xl center'>{data.metadata.title}</h1>
		{#if data.metadata.date}
			<time block op70 text-center text-sm>{formatDate(new Date(data.metadata.date))}</time>
		{/if}
	</header>

	<div class='prose dark:invert'>
		<data.content />
	</div>

	<div border-base border-t mt-16 pt-8>
		<a class='text-accent-100 hover:underline' href='/life'>
			← Back to Life
		</a>
	</div>
</article>
