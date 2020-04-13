
import 'reflect-metadata'
import Axios from 'axios'
import { inject, injectable } from 'inversify'
import { DependencyIdentifier } from '../../../DependencyIdentifiers'
import { IAPIService } from '../interfaces/IAPIService'
import { BASE_URL, BUYER_AUCTION_API } from '../constant'
import { AggregateAuctionData, RunningAuction } from '../types'
import { ILogger } from '../../Logger/interface/ILogger'
import { ICarOnSale } from '../interfaces/ICarOnSaleService'

@injectable()
export class CarOnSaleService implements ICarOnSale {
    private auctionConnection:any

    public constructor(
        @inject(DependencyIdentifier.API_SERVICE) private apiService: IAPIService,
        @inject(DependencyIdentifier.LOGGER) private logger: ILogger
    ) {
    }

    private async connectToAuction():Promise<any> {
      const authData = await this.apiService.getAuthToken()
      if (!this.auctionConnection) {
        this.auctionConnection = Axios.create({
          baseURL: BASE_URL,
          headers: {
            userId: authData.userId,
            authtoken: authData.token,
          }
        })
      }
    }

    public async getAuctionData():Promise<any> {
      this.logger.log('Triggered: Fetching running auctions')
      try {
        await this.connectToAuction()
        return await this.auctionConnection.get(BUYER_AUCTION_API)
      } catch (e) {
        this.logger.log(`Error: fetching running auctions: ${JSON.stringify(e)}`)
        throw new Error(e)
      }
    }


    public readRunningAuctionsSummary(auctions:any):RunningAuction {
      const reducer = (pre: RunningAuction, current: RunningAuction) => {
        const { numBids = 0, currentHighestBidValue = 0, minimumRequiredAsk = 0 } = current
        pre.numBids += numBids
        pre.count++
        pre.totalPercentAuctionProgress += (currentHighestBidValue / minimumRequiredAsk)
        return {
          ...pre,
        }
      }
      if(!auctions.data || !auctions.data.items){
        throw new Error('Invalid API response!')
      }
      return auctions.data.items.reduce(reducer, {
        numBids: 0, count: 0, totalPercentAuctionProgress: 0
      })
    }

    public aggregateAuctionData({ count, numBids, totalPercentAuctionProgress }):AggregateAuctionData {
      return {
        numAuctions: count,
        avgNumBids: Number((numBids / count).toFixed(2)) || 0,
        avgPercentAuctionProgress: Number((totalPercentAuctionProgress / count).toFixed(2)) || 0,
      }
    }
}
