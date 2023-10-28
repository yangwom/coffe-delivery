import supabase from '../api/supabase'
import { product } from '../types'

export const getAllProducts = async () => {
    try {
      const { data , error } = await supabase
        .from('products')
        .select()

      if (error) throw error

      return data as product[]
    } catch(e) {
      console.error(e)
    }
}
