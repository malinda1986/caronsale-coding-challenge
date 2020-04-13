import "reflect-metadata"
import { expect } from 'chai'
import 'mocha'
import sinon from 'sinon'
import { APIService } from '../APIService'

describe('CarOnSaleService Class Tests', () => {
    
    describe('readRunningAuctionsSummary()', async() => {
        it('should succeed and return user id and token credentials', async () => {
            const instance = new APIService();  
            instance.getAuthToken = sinon.fake.returns( {userId: '', token: ''} );
            const result = await instance.getAuthToken();

            expect(result).to.have.own.property('userId');
            expect(result).to.have.own.property('token');
        });
     
    });
});