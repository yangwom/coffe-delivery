import { useState } from "react"
import { product } from "../../../types"

const productStorage = localStorage.getItem("add-cart")
const productList = productStorage ? JSON.parse(productStorage) as product[] : []

function Checkout() {
const [cartList, setCartList] = useState<product[]>([])
    const total = productList.reduce((total, product) => total + product.product_price * product.quantity, 0)
    setCartList(productList)
    console.log(total)
    return (
        <section>
            {cartList.map(productCart => (
                <div key={productCart.id}>
                    <img src={productCart.image_default?.img} alt="" />
                    <p>{productCart.product_name}</p>
                    <strong>{productCart.quantity}</strong>

                    <strong> {`R$ ${(Math.round((productCart.product_price * productCart.quantity) * 100) / 100).toFixed(2)}`}</strong>
                </div>
            ))}
        </section>
    )
}

export default Checkout