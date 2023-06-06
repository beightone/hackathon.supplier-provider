import { ResolverError } from '@vtex/api'

export async function withAffiliateAppSettings(
  ctx: Context,
  next: NextMiddleware
) {
  const {
    logger,
    clients: { apps: appsClient },
  } = ctx

  try {
    const affiliateAppSettings = await appsClient.getAppSettings(
      'vtex.vtexday2023-hackathon-affiliates@1.x'
    )

    ctx.state.affiliateAppSettings = affiliateAppSettings
  } catch (error) {
    logger.error(error)

    throw new ResolverError('An error occurred fetching affiliate settings.')
  }

  await next()
}
