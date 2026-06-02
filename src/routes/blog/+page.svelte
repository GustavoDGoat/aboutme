<script lang='ts'>
	import type { Item } from '$components/ListView.svelte';
	import ListView from '$components/ListView.svelte';

	const { data } = $props();
</script>

<h1 class='sr-only'>Blog</h1>

{#snippet itemView(_item: Item)}
	{@const item = _item as typeof data.posts[0]}
	<div flex gap-2 items-start my-2>
		<span mt-0.5>
			<!-- svelte-ignore element_invalid_self_closing_tag -->
			<div class='i-simple-icons-markdown blog-list-icon' aria-hidden='true'></div>
		</span>
		<p
			style:view-transition-name='blog-{item.slug}'
			gap-x-2
		>
			{#if 'isPublished' in item && !item?.isPublished}<span bg-red>(draft)</span>{/if}
			{item.title}
			<span op50 pl-2 text-sm truncate>{item.date}</span>
		</p>
	</div>
{/snippet}

<div fcol gap-1 mxa pt-10 px-10>
	<ListView
		{itemView}
		items={data.posts}
	/>
</div>
