import 'reflect-metadata'
import { sha512 } from 'js-sha512'
import Axios from 'axios'
import { injectable } from 'inversify'
import {
  AUTH_EMAIL, AUTH_PASS, HASH_CYCLES, BASE_URL
} from '../constant'
import { AuthData } from '../types'
import { IAPIService } from '../interfaces/IAPIService'

@injectable()
export class APIService implements IAPIService {
    private apiClient: any

    private authData: any

    public constructor() {
      this.apiClient = Axios.create({ baseURL: BASE_URL })
    }

    public async getAuthToken():Promise <AuthData> {
      let response
      if (this.authData) {
        try {
          response = await this.refreshAuthData(this.authData)
        } catch (error) {
          response = await this.getAuthData()
        }
      } else {
        response = await this.getAuthData()
      }

      this.authData = response.data

      return response.data
    }

    private async refreshAuthData(authData: AuthData): Promise<AuthData> {
      return await this.apiClient.post(
        `/v1/authentication/${AUTH_EMAIL}`,
        authData
      )
    }

    private async getAuthData(): Promise<AuthData> {
      const password = this.hashPasswordWithCycles(AUTH_PASS, HASH_CYCLES)

      return await this.apiClient.put(
        `/v1/authentication/${AUTH_EMAIL}`,
        { password }
      )
    }

    /*
     * Method described in challenge notes to hash password in prep for communication
     * to authentication API.
     */
    private hashPasswordWithCycles(plainTextPassword: string, cycles: number): string {
      let hash = `${plainTextPassword}`
      for (let i = 0; i < cycles; i++) {
        hash = sha512(hash)
      }

      return hash
    }
}
