import { Router } from "express";
import { ReadFile } from "../data/managerProductsData.js";
import ProductManager from "../classes/ProductManager.js";

const useRouter = Router()

const manager = new ProductManager()
manager.products = await ReadFile()

useRouter.get("/", (req, res) => {

    const productos = manager.getProduct()

    res.render("realTimeProducts", { producto: productos, title: "Productos real time", script: "../../public/js/index.js" })
})

export default useRouter