import axios from "axios"
import IHttpClient from "./HttpClient"

export default interface ICatalogGateway {
    getProductById(productId: number): Promise<ProductDTO>
}

export type ProductDTO = {
    productId: number,
    description: string, 
    price: number
}

export class CatalogGatewayHttp implements ICatalogGateway {
    constructor(readonly httpClient: IHttpClient){}

    async getProductById(productId: number): Promise<ProductDTO> {
        const response = await this.httpClient.get(`http://localhost:3001/products/${productId}`)
        return response
    }
}

