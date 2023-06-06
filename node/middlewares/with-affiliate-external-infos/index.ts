import { ResolverError } from '@vtex/api'
import type { ExternalAccountAffiliation } from 'vtexdayhackathon5.affiliate-extension'

export async function withAffiliateExternalInfos(
  ctx: Context,
  next: NextMiddleware
) {
  const {
    logger,
    state: { affiliateId },
    clients: { externalAccountAffiliation: externalAccountAffiliationClient },
    response,
  } = ctx

  try {
    const [affiliateExternalInfos] =
      await externalAccountAffiliationClient.searchByAffiliateId(affiliateId)

    if (!affiliateExternalInfos) {
      response.status = 204

      return
    }

    ctx.state.affiliateExternalId = (
      affiliateExternalInfos as ExternalAccountAffiliation
    ).externalAccountId
  } catch (error) {
    logger.error(error)

    throw new ResolverError(
      'An error occurred fetching affiliate external infos.'
    )
  }

  await next()
}
