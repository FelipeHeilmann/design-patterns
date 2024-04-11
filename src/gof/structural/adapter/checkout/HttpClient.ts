import axios from "axios"
import { Body } from "node-fetch"

export default interface IHttpClient {
    get(url: string): Promise<any>
    post(url: string, body: any): Promise<any>
}

export class AxiosAdapter implements IHttpClient {

    async get(url: string): Promise<any> {
        const response = await axios.get(url)
        return response.data
    }

    async post(url: string, body: any): Promise<any> {
        const response = await axios.post(url,body)
        return response.data
    }

}