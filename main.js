class ProductManager {

    constructor(title, description, price, thumbnail, code, stock){
        this.SetId = 0; 
        this.products = []
        this.products.push({title: title, description: description, price: price, thumbnail: thumbnail, code: code, stock: stock, id:this.SetId})
    }

    addProduct(title, description, price, thumbnail, code, stock){

        this.SetId++
        const ids = this.products.map(e => e.code)
        if(!ids.includes(code)){
            this.products.push({title: title, description: description, price: price, thumbnail: thumbnail, code: code, stock: stock, id:this.SetId})
            console.log("El producto se agrego exitosamente")
        }
        else{
            console.log("El code del objeto ingresado ya esta en uso")
        }

    }

    getProduct() {
        const NewArray = this.products.map(e => console.log(e))
    }

    getProductById(code){
        const objeto = this.products.find(e => e.code == code)
        if(objeto){
            console.log(objeto)
        }
        else{
            console.log("Elemento no encontrado")
        }
    }

}

let ProductArray = new ProductManager("Remera", "Es una remera simple manga corta", 1500, "no hay imagen", 43323, 4)
ProductArray.addProduct("Pantalon", "Pantalon de esports", 3000, "no hay imagen", 12, 2)
ProductArray.addProduct("Play 4", "Consola de videojuegos", 5000, "no hay imagen", 22, 7)

console.log("\n\n********Todos los elementos*********\n\n")
ProductArray.getProduct()
console.log("\n\n********Elemento por id**********\n\n")
ProductArray.getProductById(12)