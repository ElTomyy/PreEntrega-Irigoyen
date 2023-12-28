import { Router } from "express";
import CartManager from "../classes/CartManager.js";
import { ReadFile } from "../data/managerCartData.js"

const useRouter = Router()

const mainCartData = new CartManager()
mainCartData.carts = await ReadFile()
mainCartData.id = mainCartData.carts.length


useRouter.post("/", (req, res) =>{

    mainCartData.id++
    const cart = {
        cartId: mainCartData.id,
        products: []
    }
    mainCartData.addCart(cart)
    res.status(201).json({ message: "Carrito creado con exito", carrito: mainCartData.carts})

})

useRouter.get("/:cid", (req, res) =>{

    const { cid } = req.params

    const index = mainCartData.carts.findIndex(e => e.cartId == cid)

    if(index !== -1){
        const result = mainCartData.carts[index]
        res.status(201).json({ message: `Ejecucion exitosa carrito ${cid}`, cart: result})
    }
    else{
        res.status(400).json({ error: "La id del carrito no existe"})
    }

})

useRouter.post("/:cid/product/:pid", (req, res) =>{

    const { cid, pid } = req.params

    const result = mainCartData.addProductCart(cid, pid)

    if(result){
        res.status(201).json({message: "Producto agregado con exito"})
    }
    else{
        res.status(400).json({ error: "La id no corresponde"})
    }
})

export default useRouter