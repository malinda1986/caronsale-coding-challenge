
import { AuthData } from '../types'

export interface IAPIService {
    getAuthToken(): Promise<AuthData>
}
