import { resolve } from '$app/paths';
import { blogPosts } from '$contents/blog';
import { formatDate } from '$lib/util';
import { parseJSON } from 'date-fns';

import { sort } from 'fast-sort';

export function load() {
	const allPosts = sort([
		...blogPosts,
	].map(item => ({
		...item,
		pubDate: parseJSON(item.pubDate),
	}))).desc(item => item.pubDate);

	const posts = allPosts.map((item) => {
		const pubDate = formatDate(new Date(item.pubDate));
		const link = 'filename' in item && typeof item.filename === 'string'
			? resolve('/blog/[slug]', { slug: item.filename })
			: resolve('/blog/[slug]', { slug: item.slug });
		return {
			...item,
			date: pubDate,
			link,
			external: false,
		};
	});
	return {
		posts,
		allPosts,
		title: 'blog',
	};
}
