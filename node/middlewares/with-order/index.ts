import { ResolverError } from '@vtex/api'

export async function withOrder(ctx: Context, next: NextMiddleware) {
  const {
    logger,
    state: { body },
    clients: { oms: omsClient },
  } = ctx

  try {
    const order = await omsClient.order(body.orderId)

    ctx.state.order = order
  } catch (error) {
    logger.error(error)

    throw new ResolverError('An error occurred fetching order.')
  }

  await next()
}
