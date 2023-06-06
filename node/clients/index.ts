import { IOClients } from '@vtex/api'
import { masterDataFor } from '@vtex/clients'
import type { Affiliates } from 'vtex.vtexday2023-hackathon-affiliates'

import OMSClient from './OMS'

export class Clients extends IOClients {
  public get affiliates() {
    return this.getOrSet(
      'affiliates',
      masterDataFor<Affiliates>(
        'affiliates',
        'vtex.vtexday2023-hackathon-affiliates@1.x'
      )
    )
  }

  public get oms() {
    return this.getOrSet('oms', OMSClient)
  }
}
