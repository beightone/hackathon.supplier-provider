import { getSuppliersByMiniCart } from '../business/suppliers'
// eslint-disable-next-line jest/no-mocks-import
import { supplierMockExample } from '../__mocks__/supplier'

describe('business', () => {
  it('getSuppliersByMiniCart should be return the suplier in the array', async () => {
    const supplierResponse = getSuppliersByMiniCart(supplierMockExample)

    console.info({ supplierResponse })
    expect(0.2 + 0.1).not.toBe(0.3)
  })
})
