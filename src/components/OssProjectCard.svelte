<script lang='ts'>
	import type { Project } from '$contents/works/oss/types';

	const { project }: { project: typeof Project.infer } = $props();
</script>

<!-- card conmponrnt -->
<a
	font-sans
	grid='~ cols-5'
	hover='scale-101 shadow-xl z-10 bg-[#88888811]'
	href={project.link}
	max-w-full
	no-underline
	op-card
	rel='noopener noreferrer'
	select-none
	target='_blank'
	transition-base
>
	<!-- svelte-ignore element_invalid_self_closing_tag -->
	<div
		style:view-transition-name={project.slug}
		aria-hidden='true'
		gcc
	>
		<div class={project.icon} op50 text-3xl></div>
	</div>
	<div
		fcol
		grid-col-span-4
	>
		<div text-lg truncate>
			{project.name}
		</div>
		<p h-8 line-clamp-2 text-xs>
			{project.description ?? ''}
		</p>
	</div>
</a>
