import 'reflect-metadata'

import { injectable, inject } from 'inversify'
import { AggregateAuctionData } from '../../Common/types'
import { ICarOnSaleClient } from '../interface/ICarOnSaleClient'
import { DependencyIdentifier } from '../../../DependencyIdentifiers'
import { ICarOnSale } from '../../Common/interfaces/ICarOnSaleService'

@injectable()
export class CarOnSaleClient implements ICarOnSaleClient {
  public constructor(
        @inject(DependencyIdentifier.CAR_ON_SALE_SERVICE) private carOnSaleService: ICarOnSale
  ) {
  }

  public async getRunningAuctions(): Promise<AggregateAuctionData> {
    try {
      const response = await this.carOnSaleService.getAuctionData()
      const summary = this.carOnSaleService.readRunningAuctionsSummary(response)

      return this.carOnSaleService.aggregateAuctionData(summary)
    } catch (e) {
      throw new Error('Error accessing running auctions!')
    }
  }
}
