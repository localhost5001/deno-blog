import { Router } from 'oak';

import { postsRepository } from './db/index.ts';
import { PostPayloadSchema } from './models/post.ts';

const router = new Router({ prefix: '/posts' });

router.get('/', async ({ response }) => {
	const posts = await postsRepository.getAllPosts();
	response.body = posts;
});

router.get('/:id', async ({ params, response }) => {
	if (!params.id) {
		throw new Error('Book ID is not defined');
	}
	const postId = Number.parseInt(params.id);
	const post = await postsRepository.getPostById(postId);

	if (post === null) {
		response.status = 404;
	} else {
		response.status = 200;
		response.body = post;
	}
});

router.post('/', async ({ request, response }) => {
	if (!request.hasBody) {
		response.status = 500;
		return;
	}
	const bodyJson = request.body({ type: 'json' });
	const value = await bodyJson.value;
	const parseResult = await PostPayloadSchema.safeParseAsync(value);
	if (!parseResult.success) {
		response.status = 400;
		response.body = 'Invalid post value';
		return;
	}

	const post = parseResult.data;
	const postId = await postsRepository.createPost(post);
	const createdPost = await postsRepository.getPostById(postId);

	response.status = 200;
	response.body = createdPost;
});

router.put('/:id', async ({ params, request, response }) => {
	if (!params.id) {
		throw new Error('Book ID is not defined');
	}
	const postId = Number.parseInt(params.id);

	if (!request.hasBody) {
		response.status = 500;
		return;
	}
	const bodyJson = request.body({ type: 'json' });
	const value = await bodyJson.value;
	const parseResult = await PostPayloadSchema.safeParseAsync(value);
	if (!parseResult.success) {
		response.status = 400;
		response.body = 'Invalid post value';
		return;
	}

	const post = parseResult.data;
	await postsRepository.updatePost(postId, post);

	response.status = 200;
});

router.delete('/:id', async ({ params, response }) => {
	if (!params.id) {
		throw new Error('Book ID is not defined');
	}
	const postId = Number.parseInt(params.id);

	await postsRepository.deletePost(postId);
	response.status = 204;
});

export { router };
