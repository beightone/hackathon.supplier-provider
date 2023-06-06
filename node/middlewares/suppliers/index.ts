export async function suppliers(ctx: Context) {
  const {
    state: {
      affiliateId,
      affiliateInfos,
      affiliateExternalId,
      affiliateAppSettings,
      body: { miniCart },
    },
    response,
  } = ctx

  const totalSkusCommissions = miniCart.items.reduce(
    (totalCommission: number, currItem: any) => {
      const skuCommissionPercentage =
        (currItem.commission ||
          affiliateAppSettings.defaultSkuCommissionValue) / 100

      const commissionValue =
        currItem.value * currItem.quantity * skuCommissionPercentage

      return totalCommission + commissionValue
    },
    0
  )

  const { name } = affiliateInfos

  const orderSuppliers = [
    {
      id: affiliateId,
      name,
      document: affiliateExternalId,
      documentType: 'externalAccountId',
      // commissionAmount: affiliateAppSettings.defaultSkuCommissionValue,
      amount: totalSkusCommissions,
      role: 'affiliate',
      // chargebackLiable: false,
      // chargeProcesssingFee: false,
    },
  ]

  response.status = 200
  response.body = orderSuppliers
}
