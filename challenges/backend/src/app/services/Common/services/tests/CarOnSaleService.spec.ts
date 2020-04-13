import "reflect-metadata"
import {instance, mock, verify, when} from "ts-mockito"
import { expect } from 'chai'
import 'mocha'
import sinon from 'sinon'
import { CarOnSaleService } from '../CarOnSaleService'
import { APIService } from '../APIService'
import { Logger } from '../../../Logger/classes/Logger'

describe('CarOnSaleService Class Tests', () => {
    
    let mockedLoggerClass: Logger
    let mockedLoggerInstance: Logger
    let mockedAPIServiceClass: APIService
    let mockedAPIServiceInstance: APIService
  
    let service: CarOnSaleService
  
    beforeEach(() => {
      mockedLoggerClass = mock(Logger);
      mockedLoggerInstance = instance(mockedLoggerClass);
      mockedAPIServiceClass = mock(APIService);
      mockedAPIServiceInstance = instance(mockedAPIServiceClass);

      service = new CarOnSaleService(mockedAPIServiceInstance, mockedLoggerInstance);
    })

    describe('readRunningAuctionsSummary()', async() => {
        it('should return error if data format is invalid', async () => {
            try{
                service.readRunningAuctionsSummary({data: { }});       
            } catch (e) {
                expect(e.message).to.equal("Invalid API response!")
            }
        });
        it('should return error if data format is invalid', async () => {
            try{
                service.readRunningAuctionsSummary({});       
            } catch (e) {
                expect(e.message).to.equal("Invalid API response!")
            }
        });
        it('should return empty object of no result found', async () => {
            const expected = { numBids: 0, count: 0, totalPercentAuctionProgress: 0 }
            const result = service.readRunningAuctionsSummary({data: { items: [] }});
            expect(result).to.deep.equal(expected);
        });
        it('should succeed and return a list of running action objects when data is found', async () => {
            const data = [
                { numBids: 1, currentHighestBidValue: 1, minimumRequiredAsk: 10 },
                { numBids: 2, currentHighestBidValue: 2, minimumRequiredAsk: 20 },
                { numBids: 3, currentHighestBidValue: 3, minimumRequiredAsk: 30 },
            ]
            const expected = { numBids: 6, count: 3, totalPercentAuctionProgress: 0.30000000000000004 }
            const result = service.readRunningAuctionsSummary({data: { items: data }});
            expect(result).to.deep.equal(expected);
        });

    });

    describe('aggregateAuctionData()', async() => {
        it('should return empty object of invalid inputs', async () => {
            const result = service.aggregateAuctionData({count:0, totalPercentAuctionProgress: 0, numBids: 0}); 
            const expected = {avgNumBids: 0,avgPercentAuctionProgress: 0,numAuctions: 0}      
            expect(result).to.deep.equal(expected);
        });
        it('should return aggregated result for valid inputs', async () => {
            const result = service.aggregateAuctionData({count:1, totalPercentAuctionProgress: 3, numBids: 2 }); 
            const expected = {avgNumBids: 2,avgPercentAuctionProgress: 3,numAuctions: 1}      
            expect(result).to.deep.equal(expected);
        });
    });
});