import { CreateFile } from "../data/managerCartData.js"
class CartManager {

    constructor() {
        this.id = 0
        this.carts = []
    }

    addCart(object){
        this.carts.push(object)
        CreateFile(this.carts)
    }
    //Crear/Agregar un nuevo producto

    addProductCart(cid, pid) {

        const cartIndex = this.carts.findIndex(e => e.cartId == cid)

        if (cartIndex !== -1) {
            const ids = this.carts[cartIndex].products.map(e => e.productId)

            if (!ids.includes(pid)) {
                this.carts[cartIndex].products.push({
                    productId: pid,
                    quantity: 1
                })
                CreateFile(this.carts)
                return true
            }
            else {
                const productIndex = this.carts[cartIndex].products.findIndex(e => e.productId == pid)
                this.carts[cartIndex].products[productIndex].quantity++
                CreateFile(this.carts)
                return true
            }
        }
        else {
            return false
        }

    }

    printId() {
        return this.cartId
    }

}
export default CartManager