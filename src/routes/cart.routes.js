import { Router } from "express";
import CartManager from "../CartManager.js";

const useRouter = Router()

let currentId = 1
const mainCart = []

useRouter.post("/", (req, res) =>{

    const cart = new CartManager()
    cart.cartId = currentId
    currentId++
    mainCart.push(cart)
    res.status(201).json({ message: "Carrito creado con exito", carrito: mainCart})
})

useRouter.get("/:cid", (req, res) =>{

    const { cid } = req.params

    const index = mainCart.findIndex(e => e.cartId == cid)

    if(index !== -1){
        const result = mainCart[index]
        res.status(201).json({ message: `Ejecucion exitosa carrito ${cid}`, cart: result})
    }
    else{
        res.status(400).json({ error: "La id del carrito no existe"})
    }

})

useRouter.post("/:cid/product/:pid", (req, res) =>{

    const { cid, pid } = req.params

    const index = mainCart.findIndex(e => e.cartId == cid)

    const result = mainCart[index].addProductCart(pid)

    if(result){
        res.status(201).json({message: "Producto agregado con exito"})
    }
    else{
        res.status(400).json({ error: "La id no corresponde"})
    }
})

export default useRouter