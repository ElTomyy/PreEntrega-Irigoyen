
class CartManager{

    constructor(obj){
        this.cartId = obj.cartId || 0
        this.products = obj.products || []
    }

    //Crear/Agregar un nuevo producto

    addProductCart(id) {
        const ids = this.products.map(e => e.productId)
        if (!ids.includes(id)) {
            this.products.push({
                productId: id,
                quantity: 1
            })
            return true
        }
        else if(ids.includes(id)){
            const index = this.products.findIndex(e => e.productId == id)
            this.products[index].quantity++
            return true
        }
        else{
            return false
        }

    }

    printId(){
        return this.cartId
    }
}

export default CartManager