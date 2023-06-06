import { OMS } from '@vtex/clients'
import type { AuthMethod } from '@vtex/clients'

import type { Order } from '../../typings/oms.client'

export default class OMSClient extends OMS {
  private readonly defaultAuthMethod: AuthMethod = 'AUTH_TOKEN'

  public getOrder(id: string): Promise<Order> {
    return this.order(id, this.defaultAuthMethod)
  }
}
