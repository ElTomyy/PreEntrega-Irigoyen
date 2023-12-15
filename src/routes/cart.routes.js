import { Router } from "express";
import CartManager from "../classes/CartManager.js";
import { CreateFile, UpdateFile, ReadFile, DeleteFile } from "../data/managerCartData.js"

const useRouter = Router()

const mainCartData = await ReadFile()
console.log(mainCartData)
const mainCart = mainCartData.map(e => new CartManager(e))
console.log(mainCart)
let currentId = mainCart.length

useRouter.post("/", (req, res) =>{

    currentId++
    const obj = {}
    const cart = new CartManager(obj)
    cart.cartId = currentId
    mainCart.push(cart)
    CreateFile(mainCart)
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
        CreateFile(mainCart)
        res.status(201).json({message: "Producto agregado con exito"})
    }
    else{
        res.status(400).json({ error: "La id no corresponde"})
    }
})

export default useRouter