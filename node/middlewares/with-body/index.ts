import { json } from 'co-body'

export async function withBody(ctx: Context, next: NextMiddleware) {
  const { req } = ctx

  const body = await json(req)

  ctx.state.body = body

  await next()
}
