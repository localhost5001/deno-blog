import { Application, Router } from 'oak'

const app = new Application()

const router = new Router()
router.get('/', (ctx) => {
    ctx.response.body = "Hello, world"
})

app.use(router.routes())
app.use(router.allowedMethods())

await app.listen({ port: 3000 })
