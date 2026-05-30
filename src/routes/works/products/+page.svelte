<script lang='ts'>
	const products = [
		{
			name: 'Molars',
			description: 'A CRM for dentists',
			link: 'https://molars.xyz',
		},
		{
			name: 'Univille',
			description: 'A marketplace for students',
			link: 'https://univilleafrica.com',
		},
	];
</script>

<div container fcol gap-6 mxa>
	{#each products as product (product.name)}
		<a
			block
			href={product.link}
			no-underline
			rel='noopener noreferrer'
			target='_blank'
		>
			<article
				hover='scale-[1.02] shadow-xl op100'
				op-card
				p-6
				rounded-xl
				transition-base
			>
				<div fyc gap-3 mb-2>
					<h3 font-bold text-xl>{product.name}</h3>
					<span class='i-line-md:external-link-rounded' op50 />
				</div>
				<p op70>{product.description}</p>
			</article>
		</a>
	{/each}
</div>
