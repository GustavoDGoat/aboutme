<script lang='ts'>

	const { data } = $props();
</script>

<div container fcol gap-8 mxa py-8>
	<h1 font-bold mb-8 text='4xl center'>Life</h1>

	<p mb-8 op-card text-lg>
		Pictures and stories from my life - hobbies, adventures, and everything in between.
	</p>

	{#if data.posts.length === 0}
		<div op50 py-16 text-center>
			<p text-xl>Coming soon...</p>
			<p mt-2>Life posts will appear here once published.</p>
		</div>
	{:else}
		<div grid='~ gap-8' grid-cols='1 md:2'>
			{#each data.posts as post (post.slug)}
				<a
					class='group'
					block
					href={post.link}
					no-underline
				>
					<article
						hover='scale-105 shadow-xl op100'
						op-card
						p-6
						rounded-xl
						transition-base
					>
						<h2 font-bold mb-2 text-xl>{post.title}</h2>
						<time op70 text-sm>{post.date}</time>
						<div mt-4 op70>
							Click to read more...
						</div>
					</article>
				</a>
			{/each}
		</div>
	{/if}
</div>
