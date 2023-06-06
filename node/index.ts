import type { ClientsConfig } from '@vtex/api'
import { LRUCache, method, Service } from '@vtex/api'

import { Clients } from './clients'
import { DEFAULT_TIMEOUT } from './shared/constants'
import { withBody } from './middlewares/with-body'
import { withOrder } from './middlewares/with-order'
import {
  injectLogger,
  suppliers,
  withAffiliateAppSettings,
  withAffiliateId,
  withAffiliateInfos,
} from './middlewares'

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
        injectLogger,
        withBody,
        withOrder,
        withAffiliateId,
        withAffiliateInfos,
        withAffiliateAppSettings,
        suppliers,
      ],
    }),
  },
})
