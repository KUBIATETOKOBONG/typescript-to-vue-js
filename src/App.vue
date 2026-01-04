<template>
  <div class="min-h-screen bg-white text-black font-sans">
    <!-- Header -->
    <header class="border-b border-gray-200 py-5">
      <div class="max-w-6xl mx-auto px-5 flex justify-between items-center">
        <h1 class="logo">BEJAMAS_</h1>
        <button class="relative p-2 hover:bg-gray-50 rounded">
          🛒 <span class="absolute -top-1 -right-1 bg-black text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-semibold">{{ totalCartItems }}</span>
        </button>
      </div>
    </header>

    <main class="max-w-6xl mx-auto px-5">
      <!-- Featured Product Section -->
      <section class="py-10 border-b border-gray-200">
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-3xl font-semibold">Samurai King Resting</h2>
          <button class="bg-black text-white px-6 py-3 text-xs font-semibold uppercase hover:bg-gray-800 transition-colors" @click="addToCart(featured)">ADD TO CART</button>
        </div>

        <div class="relative mb-10">
          <img :src="featured.image" alt="Samurai King Resting" class="w-full h-auto max-h-[500px] object-contain" />
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-15">
          <div class="lg:col-span-2">
            <h3 class="text-lg font-semibold mb-2">About the Samurai King Resting</h3>
            <span class="text-sm text-gray-600 block mb-4">Pets</span>
            <p class="text-sm text-gray-600 leading-relaxed mb-4">{{ featured.description }}</p>
          </div>

          <!-- People Also Buy -->
          <div class="flex flex-col items-end text-right">
            <h4 class="text-base font-semibold mb-4 w-full">People also buy</h4>
            <div class="flex gap-4 mb-6 flex-wrap justify-end">
              <div v-for="(img, index) in relatedImages" :key="index" class="flex flex-col items-center text-center w-24">
                <img :src="img" :alt="`Related ${index + 1}`" class="object-cover rounded mb-2 w-24 h-24" />
                <h5 class="text-xs font-semibold">Item {{ index + 1 }}</h5>
                <span class="text-xs text-gray-500">People</span>
                <span class="text-xs font-bold">$45.00</span>
              </div>
            </div>

            <div class="border-t border-gray-200 pt-6 w-full">
              <h4 class="text-base font-semibold mb-4">Details</h4>
              <p class="text-sm mb-2">Size: 1020 x 1020 pixel</p>
              <p class="text-sm">Size: 15 mb</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Product Grid -->
      <section class="py-15">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          <div v-for="product in products" :key="product.id" class="text-left">
            <div class="relative mb-4">
              <img :src="product.image" :alt="product.name" class="w-full h-[350px] object-contain" />
              <button class="absolute bottom-0 left-0 right-0 bg-black text-white py-3 px-6 text-xs font-semibold uppercase hover:bg-gray-800 transition-colors w-full" @click="addToCart(product)">ADD TO CART</button>
            </div>
            <div>
              <span class="text-xs text-gray-600 block mb-1">{{ product.category }}</span>
              <h3 class="text-base font-semibold mb-2">{{ product.name }}</h3>
              <p class="text-sm text-gray-600 mb-4">${{ product.price.toFixed(2) }}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>


<script setup lang="ts">
import { ref, computed } from 'vue'

interface Product {
  id: number
  name: string
  category: string
  price: number
  image: string
}

const featured: Product & { description: string } = {
  id: 0,
  name: 'Samurai King Resting',
  category: 'Pets',
  price: 10000.0,
  image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group%2044-jTAJ3LVHS4TU7ID5fYETcCoFs2WIPY.png',
  description: "So how did the classical Latin become so incoherent? According to McClintock, a 15th century typesetter likely scrambled part of Cicero's De Finibus in order to provide placeholder text to mockup various fonts for a type specimen book."
}


  const products = ref<Product[]>([
  { id: 1, name: 'Red Bench', category: 'People', price: 3.89, image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group%2028-361OtFPgszl0ZkFb5PBWQxO1jcUj9B.png' },
  { id: 2, name: 'Egg Balloon', category: 'Food', price: 93.89, image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rectangle%2010.2-x1Ofri2F5JJ4j6quxlqA0ARTTg499r.png' },
  { id: 3, name: 'Man', category: 'People', price: 100.0, image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group%2028%20%282%29-y7MoyfX8HAqKFEkx7PYUpgqPBKfjpZ.png' },
  { id: 4, name: 'Architecture', category: 'Landmarks', price: 101.0, image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group%2028%20%281%29-Dq5FS0iBU0sNIuSIRGucpP8P2eNOH5.png' },
  { id: 5, name: 'Architecture', category: 'Landmarks', price: 101.0, image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group%2028%20%281%29-Dq5FS0iBU0sNIuSIRGucpP8P2eNOH5.png' },
  { id: 6, name: 'Architecture', category: 'Landmarks', price: 101.0, image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group%2028%20%281%29-Dq5FS0iBU0sNIuSIRGucpP8P2eNOH5.png' }
])

const relatedImages = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rectangle%2010-A4CkE6OdI49lnC2gRrCHZLIeYDvkmg.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rectangle%2010.1-7VMAeubS4G1Aw7pHLxpSEAnPZoBaxV.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rectangle%2010.2-x1Ofri2F5JJ4j6quxlqA0ARTTg499r.png",
]

const cart = ref<Product[]>([])

const addToCart = (product: Product) => {
  const exists = cart.value.find(item => item.id === product.id)
  if (!exists) cart.value.push(product)
}

const totalCartItems = computed(() => cart.value.length)
</script>

