export async function withAffiliateId(ctx: Context, next: NextMiddleware) {
  const {
    state: {
      order: { customData },
    },
    response,
  } = ctx

  const affiliatesCustomApp = customData?.customApps?.find(
    ({ id }: { id: string }) => id === 'affiliates'
  )

  if (!affiliatesCustomApp) {
    response.status = 204

    return
  }

  const { affiliateId } = affiliatesCustomApp.fields

  ctx.state.affiliateId = affiliateId

  await next()
}
