import "reflect-metadata"
import {instance, mock} from "ts-mockito"
import { expect } from 'chai'
import 'mocha'
import { CarOnSaleService } from '../../../Common/services/CarOnSaleService'
import { Logger } from '../../../Logger/classes/Logger'

import {CarOnSaleClient} from '../CarOnSaleClient'

describe('CarOnSaleClient Class Tests', () => {
    let mockedLoggerClass: Logger
    let mockedLoggerInstance: Logger
    let mockedServiceClass: CarOnSaleService
    let mockedServiceInstance: CarOnSaleService
  
    let service: CarOnSaleClient
  
    beforeEach(() => {
      mockedLoggerClass = mock(Logger);
      mockedLoggerInstance = instance(mockedLoggerClass);
      mockedServiceClass = mock(CarOnSaleService);
      mockedServiceInstance = instance(mockedServiceClass);

      service = new CarOnSaleClient(mockedServiceInstance);
    })

    it('should return the aggregated result', async () => {
        
        mockedServiceInstance.getAuctionData = () => {return Promise.resolve([])}
        mockedServiceInstance.readRunningAuctionsSummary = () => {return {
            numBids: 2,
            currentHighestBidValue: 2,
            minimumRequiredAsk: 3,
            count:2,
            totalPercentAuctionProgress:3
        } }
        mockedServiceInstance.aggregateAuctionData = () => {return {
            numAuctions: 2,
            avgNumBids: 2,
            avgPercentAuctionProgress: 3,
        } }
        const result = await service.getRunningAuctions();       
        console.log(result)
        expect(result).to.deep.equal({ numAuctions: 2, avgNumBids: 2, avgPercentAuctionProgress: 3 });
    });


});