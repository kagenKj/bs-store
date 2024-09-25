<script setup>
import { watch, computed } from 'vue'
import { useStore } from 'vuex';

import Navbar from '@/components/Navbar.vue'
import Drawer from '@/components/Drawer.vue'
import Footer from '@/components/Footer.vue'


const store = useStore()

const cart = computed(() => store.state.cart)

const isDrawerOpen = computed(() => store.state.isDrawerOpen)

const totalPrice = computed(() => store.getters.totalPrice)

const vatPrice = computed(() => store.getters.vatPrice)

const openDrawer = () => store.commit('openDrawer')


watch(cart, () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
},{ deep: true })


</script>

<template>
    <div class="bg-yellow-100 min-h-screen flex flex-col">
        <Drawer v-if="isDrawerOpen" :total-price="totalPrice" :vat-price="vatPrice"></Drawer>
        <Navbar :total-price="totalPrice" @open-drawer="openDrawer"></Navbar>
        <div class=" bg-white h-auto mt-10 w-4/5 m-auto rounded-2xl shadow-2xl p-10">
            <div class="p-5">
                <router-view></router-view>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

