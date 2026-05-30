import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { isDevelopment } from 'std-env';

type PostMetadata = {
	isPublished: boolean;
	title: string;
	date?: string;
};

export const load = (async ({ params }) => {
	const { slug } = params;

	try {
		const post = await import(`../../../contents/life/${slug}/index.md`) as { metadata: PostMetadata; default: React.ComponentType };

		if (!isDevelopment && !post.metadata.isPublished) {
			throw error(404, 'Post not found');
		}

		return {
			content: post.default,
			metadata: post.metadata,
			title: post.metadata.title,
		};
	}
	catch {
		try {
			const post = await import(`../../../contents/life/${slug}.md`) as { metadata: PostMetadata; default: React.ComponentType };

			if (!isDevelopment && !post.metadata.isPublished) {
				throw error(404, 'Post not found');
			}

			return {
				content: post.default,
				metadata: post.metadata,
				title: post.metadata.title,
			};
		}
		catch {
			throw error(404, 'Post not found');
		}
	}
}) satisfies PageLoad;
