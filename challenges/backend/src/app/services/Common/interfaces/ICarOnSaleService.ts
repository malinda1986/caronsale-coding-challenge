
import { AuctionSummary, AggregateAuctionData } from '../types'


export interface ICarOnSale {
    getAuctionData(): Promise<any>
    readRunningAuctionsSummary(auctions: any):any
    aggregateAuctionData(summary: AuctionSummary):AggregateAuctionData
}
