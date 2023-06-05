import { IOClients } from '@vtex/api'

// import OMSClient from './oms'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  // public get oms() {
  //   return this.getOrSet('oms', OMSClient)
  // }
}
