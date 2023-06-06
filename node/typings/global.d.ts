import type { ServiceContext, RecorderState } from '@vtex/api'

import type { Clients } from '../clients'
import type { Logger } from '../tools'

declare global {
  type Context = ServiceContext<Clients, State> & {
    logger: Logger
  }

  type State = RecorderState & {
    order: any
    affiliateId: string
    affiliateInfos: any
    affiliateExternalId: string
    affiliateAppSettings: any
    body: any
  }
}
