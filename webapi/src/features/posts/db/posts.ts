import { dbConnPool } from '/dbClient.ts';
import { Post, PostPayload } from '/features/posts/models/post.ts';

export async function getAllPosts(): Promise<Post[]> {
	const client = await dbConnPool.connect();

	const res = await client.queryObject<Post>(`
    SELECT
      p.post_id
      ,p.title
      ,p.content
      ,p.user_id
      ,u.name as user_name
      ,p.category_id
      ,c.title as category_name
    FROM Posts p
    INNER JOIN Users u
      ON p.user_id = u.user.id
    INNER JOIN Categories c
      ON p.category_id = c.category_id;
  `);

	client.release();

	return res.rows;
}

export async function getPostById(id: number): Promise<Post | null> {
	const client = await dbConnPool.connect();

	const res = await client.queryObject<Post>(`
    SELECT
      p.post_id
      ,p.title
      ,p.content
      ,p.user_id
      ,u.name AS user_name
      ,p.category_id
      ,c.title AS category_name
    FROM Posts p
    INNER JOIN Users u
      ON p.user_id = u.user.id
    INNER JOIN Categories c
      ON p.category_id = c.category_id
    WHERE p.id = ${id};
  `);

	client.release();

	return res.rows[0] ?? null;
}

export async function updatePost(
	id: number,
	payload: Partial<PostPayload>,
): Promise<void> {
	const client = await dbConnPool.connect();

	const post = await getPostById(id);
	if (post === null) {
		throw new Error(`Post with id ${id} was not found`);
	}

	const postToUpdate = {
		post,
		...payload,
	};

	client.queryArray(`
    UPDATE Posts
    SET 
      title = ${postToUpdate.title}, 
      content = ${postToUpdate.content}, 
      user_id = ${postToUpdate.user_id}, 
      category_id = ${postToUpdate.category_id}
    WHERE post_id = ${id};
  `);

	client.release();
}

export async function createPost(payload: PostPayload): Promise<number> {
	const client = await dbConnPool.connect();

	const res = await client.queryObject<{ post_id: number }>(`
    INSERT INTO Posts (title, content, category_id, user_id)
      VALUES (${payload.title,
		payload.content,
		payload.category_id,
		payload.user_id})
      RETURNING post_id;
  `);

	client.release();

	return res.rows[0].post_id;
}

export async function deletePost(id: number): Promise<void> {
	const client = await dbConnPool.connect();

	client.queryArray(`
    DELETE FROM Posts 
    WHERE post_id = ${id};
  `);

	client.release();
}
