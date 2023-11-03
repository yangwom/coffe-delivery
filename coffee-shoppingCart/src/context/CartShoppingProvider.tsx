import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react"
import { imagens } from "./Services";
import { product } from "../types";
import { getAllProducts } from "../services";
import { toast } from "react-toastify";


const DEFAULT_QUANTITY = 1
const DEFAULT_MAX_QUANTITY = 10

const newImagens = imagens.map((img, index) => {
    return {
      id: index + 1,
      img
    }
  })

interface cartShoppingType {
    cart: product[];
    products: product[]
    productsExist: product[]
    setCart: (data: product[]) => void;
    setProducts: (data: product[]) => void;
    handleAddQuantity: (number: number) => void;
    handleRemoveQuantity: (number: number) => void;
    handleAddCart: (product: product) => void
}


const CartShoppingContext = createContext<cartShoppingType | undefined>(undefined)

export const CartShoppingProvider = ({children} : { children: ReactNode }) => {
const [products, setProducts] = useState<product[]>(() => {
    const allProducts = localStorage.getItem("quantityUpdate");
    return allProducts ? JSON.parse(allProducts) as product[] : []
})
const [cart, setCart] = useState<product[]>(() => {
    const productInCart = localStorage.getItem('add-cart');
    return productInCart ? JSON.parse(productInCart) as product[] : [];
  });

  const getProductLocalStorage = localStorage.getItem("quantityUpdate")
  const productsStorage = getProductLocalStorage ? JSON.parse(getProductLocalStorage) as product[] : []
  const productsExist = getProductLocalStorage === null ? products : productsStorage;




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


  useEffect(() => {
    localStorage.setItem('add-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('upadateQuantity', JSON.stringify(products))
  }, [])


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

  const handleAddCart = (product: product) => {
    const productExistCart = cart.some((productExist) => product.id === productExist.id)
 
 
    if(productExistCart) {
     toast("produto atualizado no carrinho")
    return setCart(cart.map(item => 
     item.id === product.id ? { ...item, quantity: product.quantity } : item
   ));
    }
    toast("Produto adcionado no carrinho com sucesso")
   return setCart([...cart, product])
    
   }

   console.log(cart)

    return (
    <CartShoppingContext.Provider value={{ products, cart, productsExist, setCart, setProducts, handleAddQuantity, handleRemoveQuantity, handleAddCart}}>
        {children}
    </CartShoppingContext.Provider>
    )
}

export function useCartContext() {
    const context = useContext(CartShoppingContext);
    if (context === undefined) {
      throw new Error('context not found');
    }
    return context;
  }