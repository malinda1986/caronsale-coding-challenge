import { Container } from 'inversify'
import { ILogger } from './services/Logger/interface/ILogger'
import { Logger } from './services/Logger/classes/Logger'
import { AuctionMonitorApp } from './AuctionMonitorApp'
import { DependencyIdentifier } from './DependencyIdentifiers'

import { IAPIService } from './services/Common/interfaces/IAPIService'
import { APIService } from './services/Common/services/APIService'

import { ICarOnSale } from './services/Common/interfaces/ICarOnSaleService'
import { CarOnSaleService } from './services/Common/services/CarOnSaleService'


import { ICarOnSaleClient } from './services/CarOnSaleClient/interface/ICarOnSaleClient'
import { CarOnSaleClient } from './services/CarOnSaleClient/classes/CarOnSaleClient'

/*
 * Create the DI container.
 */
const container = new Container({
  defaultScope: 'Singleton',
})

/*
 * Register dependencies in DI environment.
 */
container.bind<ILogger>(DependencyIdentifier.LOGGER).to(Logger)
container.bind<IAPIService>(DependencyIdentifier.API_SERVICE).to(APIService)
container.bind<ICarOnSale>(DependencyIdentifier.CAR_ON_SALE_SERVICE).to(CarOnSaleService)
container.bind<ICarOnSaleClient>(DependencyIdentifier.CAR_ON_SALE_CLIENT).to(CarOnSaleClient)

/*
 * Inject all dependencies in the application & retrieve application instance.
 */
const app = container.resolve(AuctionMonitorApp);

/*
 * Start the application
 */
(async () => {
  await app.start()
})()
