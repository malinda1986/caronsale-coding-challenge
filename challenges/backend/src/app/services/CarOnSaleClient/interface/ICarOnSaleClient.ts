/**
 * This service describes an interface to access auction data from the CarOnSale API.
 */
import { AggregateAuctionData } from '../../Common/types'

export interface ICarOnSaleClient {

    getRunningAuctions(): Promise<AggregateAuctionData>

}
