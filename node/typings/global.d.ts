import type { ServiceContext, RecorderState } from '@vtex/api'

import type { Logger } from '../tools'

declare global {
  type Context = ServiceContext<Clients, State> & {
    logger: Logger
  }

  type State = RecorderState & {
    order: any
    affiliateId: string
    affiliateInfos: any
    affiliateAppSettings: any
    body: any
  }
}
