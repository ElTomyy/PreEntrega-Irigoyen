import express from "express";
import productsRouter from "./routes/products.routes.js"
import cartRouter from "./routes/cart.routes.js"
import socketRoutes from "./routes/socket.routes.js"
import handlebars from "express-handlebars"
import { Server } from "socket.io"
import { __dirname } from "./utils.js";
import ProductManager from "./classes/ProductManager.js";
import { ReadFile } from "./data/managerProductsData.js";

const port = 8080
const app = express();

const manager = new ProductManager()
manager.products = await ReadFile()

const httpServer = app.listen(port, () =>{
    console.log(`Escuchando en el puerto http://localhost:${port}`)
})

const socketServer = new Server(httpServer)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine("handlebars", handlebars.engine())
app.set("view engine", "handlebars")
app.set("views", __dirname + "/views")

app.use("/api/products", productsRouter)
app.use("/api/cart", cartRouter)
app.use("/api/realTimeProducts", socketRoutes)
app.use(express.static(__dirname + "/public"))

// app.listen(port, () =>{
//     console.log(`Escuchando en el puerto http://localhost:${port}`)
// })



socketServer.on("connection", (socket) =>{

    console.log("Nuevo usuario conectado")

    socket.on("deleteProduct", (id) =>{
    try {
        console.log(`Borrado el elemento: ${id}`)
        // const result = manager.deleteProduct(id)
        // return result
    } catch (error) {
        console.log(error)
    }
    })

    socket.on("addProduct", (producto) =>{
        try {
           const result = manager.addProduct(producto)
           if(result){

           }
           else{

           }
        } catch (error) {
            console.log(error)
        }
    })
})