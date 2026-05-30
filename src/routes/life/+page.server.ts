import type { PageServerLoad } from './$types';
import path from 'node:path';
import process from 'node:process';
import { resolve } from '$app/paths';
import { formatDate } from '$lib/util';
import { sort } from 'fast-sort';
import fs from 'fs-extra';
import { matter } from 'gray-matter-es';
import { isDevelopment } from 'std-env';
import { glob } from 'tinyglobby';

type LifePost = {
	slug: string;
	title: string;
	pubDate: string;
	isPublished: boolean;
	filename: string;
};

async function getLifePosts(): Promise<LifePost[]> {
	const lifeDir = path.resolve(process.cwd(), 'src/contents/life');

	const posts = await glob([
		`${lifeDir}/*.md`,
		`${lifeDir}/*/index.md`,
	]);

	const frontMatters: LifePost[] = [];

	for (const filepath of posts) {
		const text = await fs.readFile(filepath, 'utf-8');
		const { data } = matter(text);

		const filename = filepath.includes('/')
			? filepath.split('/').at(-2) ?? filepath.split('\\').at(-2) ?? ''
			: filepath.split('/').at(-1)?.replace('.md', '') ?? filepath.split('\\').at(-1)?.replace('.md', '') ?? '';

		const slug = filename;

		frontMatters.push({
			slug,
			title: (data.title as string) ?? 'Untitled',
			pubDate: data.date instanceof Date
				? data.date.toJSON()
				: typeof data.date === 'string'
					? new Date(data.date).toJSON()
					: new Date().toJSON(),
			isPublished: data.isPublished === true,
			filename,
		});
	}

	return sort(frontMatters).desc(({ pubDate }) => pubDate);
}

export const load: PageServerLoad = async () => {
	const allPosts = await getLifePosts();
	const posts = allPosts
		.filter(({ isPublished }) => isDevelopment || isPublished)
		.map((post) => {
			const pubDate = formatDate(new Date(post.pubDate));
			const link = resolve('/life/[slug]', { slug: post.filename });
			return {
				...post,
				date: pubDate,
				link,
			};
		});

	return {
		posts,
		title: 'life',
	};
};
