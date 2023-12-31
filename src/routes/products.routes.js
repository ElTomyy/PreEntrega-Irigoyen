import { Router } from "express";
import ProductManager from "../classes/ProductManager.js";
import { ReadFile } from "../data/managerProductsData.js";

const useRouter = Router()

const manager = new ProductManager()
manager.products = await ReadFile()
manager.SetId = manager.products.length

useRouter.get("/", (req, res) => {

    //res.status(201).json({ message: "Estos son los productos", data: manager.getProduct()})

    const productos = manager.getProduct()

    res.render("home", {producto: productos, title: "Todos los productos"})
})

useRouter.get("/:id", (req, res) => {

    const {id} = req.params
    const result = manager.getProductById(id)

    if(result){
        res.render("productById", result)
    }
    else{
        res.status(400).json({error: "Producto no encontrado"})
    }

})

useRouter.post("/", (req, res) => {

    const { title, description, price, thumbnail, code, stock, state, category} = req.body

    if (!code || !title || !price) {
        res.status(400).json({ error: "Faltan datos minimos (title, code, price)" })
    }
    else{

        const result = manager.addProduct({
            title,
            state: state ?? true,
            description: description ?? "Sin descripcion",
            category: category ?? "Sin categoria", 
            price,
            thumbnail: thumbnail ?? [],
            code,
            stock: stock ?? 0
        })

        if(result){
            res.status(201).json({ message: "Ejecucion exitosa" })
        }
        else{
            res.status(400).json({error: "El code utilizado ya esta en uso"})
        }
    }
})

useRouter.put("/:id", (req, res) => {

    const {id} = req.params
    const newObject = req.body

    if(!newObject.title || !newObject.price || !newObject.code){
        res.status(400).json({ error: "Faltan datos minimos (title, code, price)"})
    }
    else{
        
        const result = manager.updateProduct(id, newObject)

        if(result){
            res.status(201).json({message: "Elemento actualizado con exito"})
        }
        else{
            res.status(400).json({message: "El code introducido no fue encontrado"})
        }
    }

})

useRouter.delete("/:id", (req, res) => {

    const {id} = req.params

    const result = manager.deleteProduct(id)

    if(result){
        res.status(201).json({message: "Elemento borrado con exito"})
    }
    else{
        res.status(400).json({ error: "Elemento no encontrado"})
    }
})

export default useRouter