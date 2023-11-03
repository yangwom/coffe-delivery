import maisImg from '../../assets/+.svg'
import menosImg from '../../assets/-.svg'
import buttonCart from '../../assets/ShoppingCartSimple.svg'
import S from '../CoffeList/CoffeList.module.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCartContext } from '../../context/CartShoppingProvider'

const CoffeList = () => {
	const { productsExist, handleAddQuantity, handleRemoveQuantity, handleAddCart } = useCartContext()

	return (
		<div className={S.containerCoffe}>
			<ToastContainer toastStyle={{ color: "black" }} />
			<h1>Nossos Cafés</h1>

			<section className={S.containerList}>
				{productsExist?.map((product) => (
					product?.id &&
					<div key={product.id} className={S.cardCoffe}>
						<img src={product.image_default?.img} alt="" />
						<div className={S.cardDescriptionAndName}>
							<strong className={S.categoryStyle}>{product.categoria}</strong>
							<h3>{product.product_name}</h3>
							<p>{product.description}</p>
						</div>
						<div className={S.cartAddQuantity}>
							<div className={S.containerPrice}>
								<p>R$</p>
								<strong>{`${(Math.round((product.product_price * product.quantity) * 100) / 100).toFixed(2)}`}</strong>
							</div>
							<div className={S.containerQuantity}>
								<button onClick={() => handleAddQuantity(product.id)} className={S.buttonQuantity}><img id={`${product.id}`} src={maisImg} alt="" /></button>
								<strong>{product.quantity}</strong>
								<button onClick={() => handleRemoveQuantity(product.id)} className={S.buttonQuantity}><img src={menosImg} alt="" /></button>
							</div>

							<button onClick={() => handleAddCart(product)} className={S.buttonAddCart}>
								<img src={buttonCart} alt="" />
							</button>
						</div>
					</div>
				))}
			</section>
		</div>
	)
}

export default CoffeList;