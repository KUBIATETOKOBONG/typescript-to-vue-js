<template>
  <div class="min-h-screen bg-white text-black font-sans">
    <!-- Header -->
    <header class="border-b border-gray-200 py-5">
      <div class="max-w-6xl mx-auto px-5 flex justify-between items-center">
        <h1 class="logo text-2xl font-bold tracking-wider">BEJAMAS_</h1>
        <button
          class="relative p-2 hover:bg-gray-50 rounded"
          @click="showCartDialog = !showCartDialog"
        >
          <ShoppingCart :size="24" />
          <span
            v-if="cartStore.totalItems > 0"
            class="absolute -top-1 -right-1 bg-black text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-semibold"
          >
            {{ cartStore.totalItems }}
          </span>
        </button>
      </div>
    </header>

    <div class="max-w-6xl mx-auto px-5">
      <main>
        <!-- Featured Product Section -->
        <section class="py-10 border-b border-gray-200">
          <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
            <h2 class="text-3xl font-semibold">Samurai King Resting</h2>
            <button
              class="bg-black text-white px-6 py-3 text-xs font-semibold uppercase hover:bg-gray-800 transition-colors"
              @click="addFeaturedToCart"
            >
              ADD TO CART
            </button>
          </div>

          <div class="block">
            <div class="relative mb-10">
              <img
                src="/images/group-2044.png"
                alt="Samurai King Resting - Photo of the day"
                class="w-full h-auto max-h-[500px] object-contain rounded"
              />
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <!-- About Section -->
              <div class="lg:col-span-2">
                <h3 class="text-lg font-semibold mb-2">About the Samurai King Resting</h3>
                <span class="text-sm text-gray-600 block mb-4">Pets</span>
                <p class="text-sm text-gray-600 leading-relaxed mb-4">
                  So how did the classical Latin become so incoherent? According to McClintock, a 15th century
                  typesetter likely scrambled part of Cicero's De Finibus in order to provide placeholder text to
                  mockup various fonts for a type specimen book.
                </p>
                <p class="text-sm text-gray-600 leading-relaxed">
                  So how did the classical Latin become so incoherent? According to McClintock, a 15th century
                  typesetter likely scrambled part of Cicero's De Finibus in order to provide placeholder text to
                  mockup various fonts for a type specimen book. So how did the classical Latin become so incoherent?
                  According to McClintock.
                </p>
              </div>

              <!-- Related Images / Details -->
              <div class="flex flex-col items-end text-right">
                <h4 class="text-base font-semibold mb-4 w-full">People also buy</h4>
                <div class="flex gap-4 mb-8 flex-wrap justify-end">
                  <img
                    v-for="(image, index) in relatedImages"
                    :key="index"
                    :src="image"
                    :alt="`Related ${index + 1}`"
                    class="w-20 h-20 object-cover rounded"
                  />
                </div>

                <div class="border-t border-gray-200 pt-6 w-full">
                  <h4 class="text-base font-semibold mb-4">Details</h4>
                  <p class="text-sm mb-2">Size: 1020 x 1020 pixel</p>
                  <p class="text-sm">Size: 15 mb</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Product Grid Section -->
        <section class="py-10">
          <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-4">
            <div class="flex items-center gap-2 mb-3 lg:mb-0">
              <h2 class="text-2xl font-semibold">Photography</h2>
              <span class="text-gray-500">/ Premium Photos</span>
            </div>

            <div class="flex gap-5 text-sm text-gray-500 items-center">
              <span class="flex items-center gap-2 cursor-pointer hover:text-black transition-colors">
                <ChevronUp :size="16" />
                <ChevronDown :size="16" />
                Sort By
              </span>
              <span class="flex items-center gap-2 cursor-pointer hover:text-black transition-colors">
                Price
                <ChevronDown :size="12" />
              </span>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <!-- Left Sidebar -->
            <aside class="lg:pt-5 space-y-10">
              <div>
                <h3 class="text-lg font-semibold mb-5">Category</h3>
                <div class="flex flex-col gap-3">
                  <label
                    v-for="(checked, category) in categoryFilters"
                    :key="category"
                    class="flex items-center gap-2 cursor-pointer text-sm"
                  >
                    <input
                      type="checkbox"
                      :checked="checked"
                      @change="toggleCategoryFilter(category)"
                      class="w-4 h-4"
                    />
                    {{ category }}
                  </label>
                </div>
              </div>

              <div>
                <h3 class="text-lg font-semibold mb-5">Price range</h3>
                <div class="flex flex-col gap-3">
                  <label
                    v-for="(checked, range) in priceFilters"
                    :key="range"
                    class="flex items-center gap-2 cursor-pointer text-sm"
                  >
                    <input
                      type="checkbox"
                      :checked="checked"
                      @change="togglePriceFilter(range)"
                      class="w-4 h-4"
                    />
                    {{ range }}
                  </label>
                </div>
              </div>
            </aside>

            <!-- Product Grid -->
            <div class="lg:col-span-3">
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                <div v-for="product in products" :key="product.id" class="text-left">
                  <div class="relative mb-4">
                    <img
                      :src="product.image"
                      :alt="product.name"
                      class="w-full h-80 object-cover rounded"
                    />
                    <button
                      class="absolute bottom-0 left-0 right-0 bg-black text-white py-3 px-6 text-xs font-semibold uppercase hover:bg-gray-800 transition-colors w-full"
                      @click="(e: Event) => addProductToCart(product, e)"
                    >
                      ADD TO CART
                    </button>
                  </div>
                  <div>
                    <span class="text-xs text-gray-600 block mb-1">{{ product.category }}</span>
                    <h3 class="text-base font-semibold mb-2">{{ product.name }}</h3>
                    <p class="text-sm text-gray-600 mb-4">${{ product.price.toFixed(2) }}</p>
                  </div>
                </div>
              </div>

              <!-- Pagination -->
              <nav class="flex justify-center items-center gap-3">
                <button
                  class="w-10 h-10 border border-gray-200 bg-white text-gray-600 flex items-center justify-center hover:border-black hover:text-black transition-colors"
                >
                  <ChevronLeft :size="16" />
                </button>
                <button
                  v-for="page in [1,2,3,4]"
                  :key="page"
                  :class="[
                    'w-10 h-10 border flex items-center justify-center text-sm font-medium transition-colors',
                    currentPage === page
                      ? 'bg-black text-white border-black'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-black hover:text-black'
                  ]"
                  @click="currentPage = page"
                >
                  {{ page }}
                </button>
                <button
                  class="w-10 h-10 border border-gray-200 bg-white text-gray-600 flex items-center justify-center hover:border-black hover:text-black transition-colors"
                >
                  <ChevronRight :size="16" />
                </button>
              </nav>
            </div>
          </div>
        </section>
      </main>
    </div>

    <!-- Cart Dialog -->
    <div
      v-if="showCartDialog"
      class="fixed top-20 right-5 w-80 bg-white border border-gray-200 rounded-lg shadow-xl z-50 p-5"
    >
      <div class="flex flex-col gap-5">
        <div v-for="item in cartStore.items" :key="item.id" class="flex gap-4 items-center">
          <img :src="item.image" :alt="item.name" class="w-20 h-20 object-cover rounded" />
          <div class="flex-1">
            <h4 class="text-base font-semibold mb-1">{{ item.name }}</h4>
            <p class="text-sm text-gray-600">${{ item.price.toFixed(2) }}</p>
            <p v-if="item.quantity > 1" class="text-xs text-gray-500">Qty: {{ item.quantity }}</p>
          </div>
        </div>
        <button
          class="w-full border border-black py-3 px-10 text-sm font-semibold uppercase hover:bg-black hover:text-white transition-colors"
          @click="handleClearCart"
        >
          CLEAR
        </button>
      </div>
    </div>

    <div v-if="showCartDialog" class="fixed inset-0 z-40" @click="showCartDialog = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ShoppingCart, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { useCartStore } from '../stores/cart'
import type { Product } from '../stores/cart'

const cartStore = useCartStore()
const showCartDialog = ref(false)
const currentPage = ref(1)

const categoryFilters = ref({
  People: false,
  Premium: false,
  Pets: true,
  Food: true,
  Landmarks: true,
  Cities: false,
  Nature: false,
})

const priceFilters = ref({
  'Lower than $20': false,
  '$20 - $100': false,
  '$100 - $200': false,
  'More than $200': false,
})

const products: Product[] = [
  { id: 1, name: 'Red Bench', category: 'People', price: 3.89, image: '/images/group-2028.png' },
  { id: 2, name: 'Egg Balloon', category: 'Food', price: 93.89, image: '/images/rectangle-2010.png' },
  { id: 3, name: 'Egg Balloon', category: 'Food', price: 93.89, image: '/images/rectangle-2010.png' },
  { id: 4, name: 'Man', category: 'People', price: 100.0, image: '/images/group-2028-20-282-29.png' },
  { id: 5, name: 'Architecture', category: 'Landmarks', price: 101.0, image: '/images/group-2028-20-281-29.png' },
  { id: 6, name: 'Architecture', category: 'Landmarks', price: 101.0, image: '/images/group-2028-20-281-29.png' },
]

const relatedImages = [
  '/images/rectangle-2010.png',
  '/images/rectangle-2010.png',
  '/images/rectangle-2010.png',
]

const addFeaturedToCart = () => {
  cartStore.addToCart({
    id: 0,
    name: 'Samurai King Resting',
    category: 'Pets',
    price: 10000.0,
    image: '/images/group-2044.png',
  })
}

const addProductToCart = (product: Product, event: Event) => {
  const button = event.currentTarget as HTMLButtonElement
  const originalText = button.textContent
  button.textContent = 'ADDED!'
  button.style.background = '#28a745'

  setTimeout(() => {
    button.textContent = originalText || 'ADD TO CART'
    button.style.background = '#000'
  }, 1000)

  cartStore.addToCart(product)
}

const handleClearCart = () => {
  cartStore.clearCart()
  showCartDialog.value = false
}

const toggleCategoryFilter = (category: string) => {
  categoryFilters.value[category as keyof typeof categoryFilters.value] =
    !categoryFilters.value[category as keyof typeof categoryFilters.value]
}

const togglePriceFilter = (range: string) => {
  priceFilters.value[range as keyof typeof priceFilters.value] =
    !priceFilters.value[range as keyof typeof priceFilters.value]
}

onMounted(() => {
  cartStore.initializeCart()
})
</script>
