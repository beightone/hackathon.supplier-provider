import { ResolverError } from '@vtex/api'

export async function withOrder(ctx: Context, next: NextMiddleware) {
  const {
    logger,
    state: { body },
    clients: { oms: omsClient },
  } = ctx

  const orderId = `${body.orderId}-01`

  try {
    const order = await omsClient.order(orderId)

    ctx.state.order = order
  } catch (error) {
    logger.error(error)

    throw new ResolverError('An error occurred fetching order.')
  }

  await next()
}
