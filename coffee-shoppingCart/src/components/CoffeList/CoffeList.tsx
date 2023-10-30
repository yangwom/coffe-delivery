import { imagens } from './Services'
import maisImg from '../../assets/+.svg'
import menosImg from '../../assets/-.svg'
import buttonCart from '../../assets/ShoppingCartSimple.svg'
import S from '../CoffeList/CoffeList.module.css'
import { useEffect, useState, useCallback } from 'react'
import { getAllProducts } from '../../services'
import { product } from '../../types'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DEFAULT_QUANTITY = 1
const DEFAULT_MAX_QUANTITY = 10
const INITIAL_PRODUCT = {
  id: 0,
  created_at: '',
  product_name: '',
  categoria: '',
  quantity: 0,
  description: '',
  product_price: 0,
  image: '',
  image_default: undefined
}

const CoffeList = () => {
  const [products, setProducts] = useState<product[]>([INITIAL_PRODUCT])
  const [cart, setCart] = useState<product[]>([])

  const newImagens = imagens.map((img, index) => {
    return {
      id: index + 1,
      img
    }
  })

  const handleAllProducts = useCallback(async () => {
    const dataProducts = await getAllProducts()
    if (dataProducts) {
      const productsImgAndQnty = dataProducts.map(prod => {
        return {
          ...prod,
          quantity: DEFAULT_QUANTITY,
          image_default: newImagens.find(img => prod.id === img.id)
        }
      })
      setProducts(productsImgAndQnty)
    }
  }, [])

  useEffect(() => {
    handleAllProducts()
  }, [])

  const getProductLocalStorage = localStorage.getItem("quantityUpdate")
  const productsStorage = getProductLocalStorage ? JSON.parse(getProductLocalStorage) as product[] : [INITIAL_PRODUCT]
  const productsExist = getProductLocalStorage === null ? products : productsStorage;

  const handleAddQuantity = (productId: number) => {
    const productsWithIncrement = productsExist.map(prod => {
      if (prod.id === productId && prod.quantity < DEFAULT_MAX_QUANTITY) {
        return {
          ...prod,
          quantity: prod.quantity + 1
        }
      }
      return prod
    })

    localStorage.setItem('quantityUpdate', JSON.stringify(productsWithIncrement));
    setProducts(productsWithIncrement)
  }

  const handleRemoveQuantity = (productId: number) => {
    const productsWithDecrement = productsExist.map(prod => {
      if (prod.id === productId && prod.quantity > 1) {
        return {
          ...prod,
          quantity: prod.quantity - 1
        }
      }
      return prod
    })
    localStorage.setItem('quantityUpdate', JSON.stringify(productsWithDecrement));
    setProducts(productsWithDecrement)

  }

  const handleAddCart = (productId: number) => {
    const productSelected = productsExist.find(prod => prod.id === productId) as product
    const productExistInCart = cart.some(prod => prod.id === productId)
    if (productExistInCart === false) {

      setCart(state => [...state, productSelected])
    }

    toast.error("Esse produto já existe no carrinho")
  }





  return (
    <div className={S["container-coffe"]}>
      <ToastContainer toastStyle={{ color: "black" }}/>
      <h1>Nossos Cafés</h1>

      <section className={S["container-list"]}>
        {productsExist?.map((product) => (
          product?.id &&
          <div key={product.id} className={S["card-coffe"]}>
            <img src={product.image_default?.img} alt="" />
            <span>{product.categoria}</span>
            <h3>{product.product_name}</h3>
            <p>{product.description}</p>
            <div className={S["cart-add-quantity"]}>
              <p>R$ <strong>{`${(Math.round((product.product_price * product.quantity) * 100) / 100).toFixed(2)}`}</strong></p>
              <div className={S["container-quantity"]}>
                <button onClick={() => handleAddQuantity(product.id)} className={S["button-quantity"]}><img id={`${product.id}`} src={maisImg} alt="" /></button>
                <strong>{product.quantity}</strong>
                <button onClick={() => handleRemoveQuantity(product.id)} className={S["button-quantity"]}><img src={menosImg} alt="" /></button>
              </div>

              <button onClick={() => handleAddCart(product.id)} className={S["button-add-cart"]}>
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