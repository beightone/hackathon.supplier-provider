import type { CustomData } from './order-form'

export type Order = {
  orderId: string
  clientProfileData: {
    firstName: string
    lastName: string
    email: string
  }
  items: OrderItem[]
  status: string
  statusDescription: string
  customData: CustomData

  packageAttachment: {
    packages: Array<{
      invoiceNumber: string
    }>
  }
}

export type OrderItem = {
  id: string
  name: string
  ean: string
  quantity: number
  listPrice: number
  price: number
  manualPrice?: number
}
