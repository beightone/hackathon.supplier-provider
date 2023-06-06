import type { ClientsConfig } from '@vtex/api'
import { LRUCache, method, Service } from '@vtex/api'

import { Clients } from './clients'
import { DEFAULT_TIMEOUT } from './shared/constants'
// import { withBody } from './middlewares/with-body'
// import { withOrder } from './middlewares/with-order'
// import {
//   injectLogger,
//   suppliers,
//   withAffiliateAppSettings,
//   withAffiliateExternalInfos,
//   withAffiliateId,
//   withAffiliateInfos,
// } from './middlewares'

const memoryCache = new LRUCache<string, any>({ max: 5000 })

metrics.trackCache('status', memoryCache)

const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 2,
      timeout: DEFAULT_TIMEOUT,
    },
    supplierBuilder: {
      memoryCache,
    },
  },
}

export default new Service({
  clients,
  routes: {
    getSuppliersByMiniCart: method({
      POST: [
        (ctx: Context) => {
          ctx.response.body = [
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

          // eslint-disable-next-line no-useless-return
          return
        },
        // injectLogger,
        // withBody,
        // withOrder,
        // withAffiliateId,
        // withAffiliateInfos,
        // withAffiliateExternalInfos,
        // withAffiliateAppSettings,
        // suppliers,
      ],
    }),
  },
})
