export async function suppliers(ctx: Context) {
  const {
    state: {
      affiliateId,
      affiliateInfos,
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

  const { name, document, documentType } = affiliateInfos

  const orderSuppliers = [
    {
      id: affiliateId,
      name,
      document,
      documentType,
      commissionAmount: affiliateAppSettings.defaultSkuCommissionValue,
      amount: totalSkusCommissions,
      role: 'influencer',
      chargebackLiable: false,
      chargeProcesssingFee: false,
    },
  ]

  response.status = 200
  response.body = orderSuppliers
}
