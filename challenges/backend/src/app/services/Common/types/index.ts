export interface RunningAuction {
    numBids: number;
    currentHighestBidValue: number;
    minimumRequiredAsk: number;
    count?:number;
    totalPercentAuctionProgress?:number
}

export interface AggregateAuctionData {
    numAuctions: number;
    avgNumBids: number;
    avgPercentAuctionProgress: number;
}

export interface AuthData {
    token: string;
    authenticated: boolean;
    userId: string;
    internalUserId: number;
    InternalUserUUID: string;
    type: number;
    privilages: string;
}

export interface AuctionSummary {
    count: number
    numBids: number
    totalPercentAuctionProgress: number
}
