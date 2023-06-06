import { MasterData } from '@vtex/api'
import type { ExternalAccountAffiliation } from 'vtexdayhackathon5.affiliate-extension'

export default class ExternalAccountAffiliationMasterdataClient extends MasterData {
  private readonly DATA_ENTITY =
    'vtexdayhackathon5_affiliate_extension_externalAccountAffiliation'

  private readonly SCHEMA = '0.0.12'
  private readonly DEFAULT_FIELDS = ['_all']

  public async searchByAffiliateId(affiliateId: string) {
    return this.searchDocuments<ExternalAccountAffiliation>({
      where: `(affiliateId=${affiliateId})`,
      fields: this.DEFAULT_FIELDS,
      pagination: {
        page: 1,
        pageSize: 10,
      },
      dataEntity: this.DATA_ENTITY,
      schema: this.SCHEMA,
    })
  }
}
