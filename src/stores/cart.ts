import { defineStore } from "pinia"
import { ref, computed } from "vue"

export interface Product {
  id: number
  name: string
  category: string
  price: number
  image: string
}

export interface CartItem extends Product {
  quantity: number
}

export const useCartStore = defineStore("cart", () => {
  const items = ref<CartItem[]>([])

  const totalItems = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })

  const addToCart = (product: Product) => {
    const existingItem = items.value.find((item) => item.id === product.id)
    if (existingItem) {
      existingItem.quantity++
    } else {
      items.value.push({ ...product, quantity: 1 })
    }
  }

  const clearCart = () => {
    items.value = []
  }

  const initializeCart = () => {
    // Initialize with featured item
    items.value = [
      {
        id: 0,
        name: "Samurai King Resting",
        category: "Pets",
        price: 10000.0,
        image: "/images/group-2044.png",
        quantity: 1,
      },
    ]
  }

  return {
    items,
    totalItems,
    addToCart,
    clearCart,
    initializeCart,
  }
})
