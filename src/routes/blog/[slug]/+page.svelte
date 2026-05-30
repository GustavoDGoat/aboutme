<script lang='ts'>
	import { dev } from '$app/environment';
	import { page } from '$app/state';
	import LargeTitle from '$components/LargeTitle.svelte';
	import { PUBLIC_ORIGIN } from '$env/static/public';
	import { formatDate } from '$lib/util';
	import * as ufo from 'ufo';
	import IconMarkdown from '~icons/ri/markdown-line';
	import '@shikijs/twoslash/style-rich.css';
	import 'markdown-it-github-alerts/styles/github-colors-light.css';
	import 'markdown-it-github-alerts/styles/github-colors-dark-class.css';
	import 'markdown-it-github-alerts/styles/github-base.css';
	import './link-card.css';
	import './magic-link.css';
	import './prose.css';
	import './anchor.css';
	import './collapse.css';

	const { data } = $props();

	const url = ufo.joinURL(PUBLIC_ORIGIN, page.url.pathname);
	const mdUrl = `${page.url.pathname}.md`;
	const shareText = (account: string) => encodeURIComponent(`Reading ${account}\'s ${url}\n\nI think...`);
	const tweetUrl = `https://twitter.com/intent/tweet?text=${shareText('@Gustavo_DGoat')}`;

/* eslint svelte/no-at-html-tags: 0 */
</script>

<svelte:head>
	<meta content='article' property='og:type' />
	<link href={mdUrl} rel='alternate' title='Markdown source' type='text/plain' />
</svelte:head>

<div
	min-w-0
	mxa
>
	{#if !data.metadata.isPublished}
		<p bg-red text='4xl center'>This article is not published yet.</p>
	{/if}

	<hgroup fcol fyc gap-1 mb-3 text-center>
		<LargeTitle
			opacity={false}
			selectDisabled={false}
			title={data.metadata.title}
			viewTransitionName='blog-{data.metadata.slug}'
		/>
		<p text-text-400>{formatDate(new Date(data.metadata.pubDate))} ・ {data.metadata.readingTime.text} ・ <a class='hover:op100' aria-label='Markdown source' href={mdUrl} op70 rel='noopener noreferrer' target='_blank'><IconMarkdown class='inline align-middle' aria-hidden='true' /></a></p>
	</hgroup>

	<div p2>
		<hr ma max-w-100 op25 w-full />
	</div>

	<article class={['prose dark:prose-invert', !dev && 'slide-enter-content']} mxa pb-8 text-text='700 dark:200'>
		<data.Markdown />
	</article>
	<div op50 pb-8>
		<span op70>share on</span>
		<a href={tweetUrl} rel='noopener noreferrer' target='_blank'>twitter</a>
		<span op35> / </span>
		<a href='https://github.com/GustavoDGoat' rel='noopener noreferrer' target='_blank'>github</a>
	</div>

	<div op50 pb-8>
		<a href='https://creativecommons.org/licenses/by-nc-sa/4.0/' rel='noopener noreferrer' target='_blank'>CC BY-NC-SA 4.0</a> 2022-PRESENT © Gustavo D Goat
	</div>
</div>

<style>
a {
	--uno: no-underline hover:underline
}
</style>
