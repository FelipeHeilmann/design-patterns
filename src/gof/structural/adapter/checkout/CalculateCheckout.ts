import ICatalogGateway from "./CatalogGatewat";
import Order from "./Order";

export default class CalculateCheckout {
    constructor(readonly catalogGateway: ICatalogGateway){}

    async execute(input: Input): Promise<Output> {
        const order = new Order()
        for(const item of input.items) {
            const product = await this.catalogGateway.getProductById(item.productId)
            order.addProduct(product, item.quantity)
        }
        return {
            total: order.getTotal()
        }
    }
}

type Input = {
    items: {productId: number, quantity: number}[]
}

type Output = {
    total: number
}