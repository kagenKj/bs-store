<script setup>
import { ref, watch, provide, computed } from 'vue'
import Navbar from '@/components/Navbar.vue'
import Drawer from '@/components/Drawer.vue'

 
const items = ref([])

const cart = ref([])

const isDrawerOpen = ref(false)


const totalPrice = computed(
    () => cart.value.reduce((acc, item) => acc + item.price, 0)
)

const vatPrice = computed(
    () => Math.round((totalPrice.value * 5) / 100)
)

const closeDrawer = () => {
    isDrawerOpen.value = false
}
const openDrawer = () => {
    isDrawerOpen.value = true
}


const removeFromCart = (item) => {
    const index = cart.value.findIndex(cartItem => cartItem.id === item.id);
    if (index > -1) {
        cart.value.splice(index, 1);
        const itemInList = items.value.find(listItem => listItem.id === item.id);
        if (itemInList) {
            itemInList.isAdded = false;
        }
    }
}

const addToCart = (item) => {
    cart.value.push(item);
    const itemInList = items.value.find(listItem => listItem.id === item.id);
    if (itemInList) {
        itemInList.isAdded = true;
    }
}

watch(cart, () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
},
    { deep: true }
)

provide('items', {items})

provide('cart', {
    cart,
    closeDrawer,
    openDrawer,
    addToCart,
    removeFromCart
})


</script>

<template>
    <div class="bg-yellow-100 min-h-screen">
        <Drawer v-if="isDrawerOpen" :total-price="totalPrice" :vat-price="vatPrice"></Drawer>
        <Navbar :total-price="totalPrice" @open-drawer="openDrawer"></Navbar>
        <div class=" bg-white h-auto mt-10 w-4/5 m-auto rounded-2xl shadow-2xl p-10">
            <div class="p-5">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

