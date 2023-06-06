import { Logger } from '../../tools'

export async function injectLogger(ctx: Context, next: NextMiddleware) {
  const { vtex } = ctx

  const logger = new Logger(vtex.logger)

  ctx.logger = logger

  await next()
}
