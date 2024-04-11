import express from "express"
import { ProductRepositoryMemory } from "./ProductRepository"
import GetProduct from "./GetProduct"
import { ExpressAdapter, HapiAdapter } from "./HttpServer"

const productRepository = new ProductRepositoryMemory()
const getProduct = new GetProduct(productRepository)
// const httpServer = new ExpressAdapter()
const httpServer = new HapiAdapter()

httpServer.register("get", "/products/:{productId}", async function (params: any, body: any) {
    const productId = parseInt(params.productId)
    const output = await getProduct.execute(productId)
    return output
})

httpServer.listen(3001)