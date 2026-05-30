<script lang='ts'>
	const projects = [
		{
			name: 'DOMA',
			description: 'A general chat app for opencode go users',
			link: 'https://github.com/GustavoDGoat/DOMA',
		},
		{
			name: 'witb',
			description: 'A simple chat app to help you debug your code',
			link: 'https://github.com/GustavoDGoat/witb',
		},
	];
</script>

<div container fcol gap-6 mxa>
	<div mb-4 text-center>
		<a
			class='btn-blue'
			fyc
			gap-2
			href='https://github.com/GustavoDGoat'
			rel='noopener noreferrer'
			target='_blank'
		>
			<span class='i-ph-github-logo-duotone' aria-hidden='true' /> GitHub
		</a>
	</div>

	{#each projects as project (project.name)}
		<a
			block
			href={project.link}
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
					<h3 font-bold text-xl>{project.name}</h3>
					<span class='i-line-md:external-link-rounded' op50 />
				</div>
				<p op70>{project.description}</p>
			</article>
		</a>
	{/each}
</div>
