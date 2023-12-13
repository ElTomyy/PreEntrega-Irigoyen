
class ProductManager {

    constructor() {
        this.SetId = 0;
        this.products = []
    }

    //Agregar un producto

    addProduct(objeto) {
        const ids = this.products.map(e => e.code)
        if (!ids.includes(objeto.code)) {
            this.SetId++
            this.products.push({
                ...objeto,
                id: this.SetId
            })
            return true
        }
        else {
            return false
        }

    }

    //Obtener productos

    getProduct() {
        const NewArray = this.products.map(e => e)
        return NewArray
    }

    //Obtener productos por id

    getProductById(id) {
        const objeto = this.products.find(e => e.id == id)
        if (objeto) {
            return objeto
        }
        else {
            return false
        }
    }

    //Actualiar producto por id

    updateProduct(id, nuevoObjeto) {
        const index = this.products.findIndex(e => e.id == id)
        if (index !== -1) {
            this.products[index] = {
                ...this.products[index],
                ...nuevoObjeto
            }
            return true
        }
        else {
            return false
        }
    }

    //Eliminar un producto por id

    deleteProduct(id) {
        const index = this.products.findIndex(e => e.id == id)
        if (index !== -1) {
            this.products.splice(index, 1)
            return true
        }
        else {
            return false
        }
    }

}

export default ProductManager