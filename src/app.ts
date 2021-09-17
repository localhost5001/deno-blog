import { Application, Router } from 'oak';

import { router as ordersRouter } from '/features/posts/router.ts';

const port = Number.parseInt(Deno.env.get('APP_PORT') ?? '3000');

const app = new Application();

const router = new Router();
router.get('/', (ctx) => {
	ctx.response.body = 'Hello, world';
});

app.use(router.routes());
app.use(router.allowedMethods());

app.use(ordersRouter.routes());
app.use(ordersRouter.allowedMethods());

app.addEventListener('listen', () => {
	console.log(`Listening on localhost:${port}`);
});

await app.listen({ port: port });
