import { useCartContext } from "../../../context/CartShoppingProvider"





function Checkout() {
    const { cart } = useCartContext()

    const total = cart.reduce((total, product) => total + product.product_price * product.quantity, 0)
    console.log(total)
    return (
        <section style={{display: "flex"}}>
            {cart.map(productCart => (
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