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
        currItem.price * currItem.quantity * skuCommissionPercentage

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
      commissionAmount: affiliateAppSettings.defaultSkuCommissionValue,
      amount: totalSkusCommissions,
      role: 'affiliate',
      chargebackLiable: false,
      chargeProcesssingFee: false,
    },
  ]

  ;() => ({ orderSuppliers })

  response.status = 200
  response.body = [
    {
      id: 'mock',
      name: 'mocked',
      amount: 15600,
      document: '1111',
      documentType: 'CNPJ',
      role: 'influencer',
      commissionAmount: 100,
      chargebackLiable: false,
      chargeProcesssingFee: false,
    },
    {
      id: 'coinshop',
      name: 'coinshop',
      documentType: 'CNPJ',
      document: '05314972000174',
      role: 'seller',
      amount: 0,
      commissionAmount: 0,
      chargeProcessingFee: 'false',
      chargebackLiable: 'false',
    },
  ]
}
