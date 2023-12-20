import express from "express";
import productsRouter from "./routes/products.routes.js"
import cartRouter from "./routes/cart.routes.js"

const port = 8080
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// app.engine("handlebars", handlebars.engine())
// app.set("views")
// app.set("view engine", "handlebars")

app.use("/api/products", productsRouter)
app.use("/api/cart", cartRouter)

app.listen(port, () =>{
    console.log(`Escuchando en el puerto http://localhost:${port}`)
})

