import { ResolverError } from '@vtex/api'

export async function withAffiliateInfos(ctx: Context, next: NextMiddleware) {
  const {
    logger,
    state: { affiliateId },
    clients: { affiliates: affiliatesClient },
    response,
  } = ctx

  try {
    const affiliateInfos = await affiliatesClient.get(affiliateId, ['_all'])

    if (!affiliateInfos) {
      response.status = 204

      return
    }

    ctx.state.affiliateInfos = affiliateInfos
  } catch (error) {
    logger.error(error)

    throw new ResolverError('An error occurred fetching affiliate infos.')
  }

  await next()
}
