import { rendererRich, transformerTwoslash } from '@shikijs/twoslash';
import { createMarkdownExit } from 'markdown-exit';

import anchor from 'markdown-it-anchor';

import MarkdownItCollapsible from 'markdown-it-collapsible';

import GitHubAlerts from 'markdown-it-github-alerts';

import Figures from 'markdown-it-image-figures';

import LinkAttributes from 'markdown-it-link-attributes';
import LinkPreview from 'markdown-it-link-preview';

import { codeToHtml } from 'shiki';

import { slugify } from '../lib/slugify.server.ts';
import { transformerEscape } from './shiki-transformer.ts';

const md = createMarkdownExit({
	html: true,
	linkify: true,
	typographer: true,
	async highlight(code, lang) {
		return codeToHtml(code, {
			lang,
			themes: {
				dark: 'kanagawa-dragon',
				light: 'kanagawa-lotus',
			},
			transformers: [
				transformerTwoslash({
					explicitTrigger: true,
					renderer: rendererRich(),
				}),
				transformerEscape(),
			],
		});
	},
});

// @ts-expect-error markdown-exit type mismatch
md.use(anchor, {
	slugify,
	permalink: anchor.permalink.linkInsideHeader({
		symbol: '#',
		renderAttrs: () => ({ 'aria-hidden': 'true', 'tabindex': '-1' }),
	}),
});

// @ts-expect-error markdown-exit type mismatch
md.use(LinkAttributes, {
	/** @param {string} link */
	matcher: (link: string) => /^https?:\/\//.test(link),
	attrs: {
		target: '_blank',
		rel: 'noopener',
	},
});

md.use(LinkPreview);

// @ts-expect-error markdown-exit type mismatch
md.use(GitHubAlerts);

md.use(Figures, {
	figcaption: true,
	lazy: true,
	async: true,
});

// @ts-expect-error markdown-exit type mismatch
md.use(MarkdownItCollapsible);

export { md };
