<script setup>
    import { computed } from 'vue';
    import { useStore } from 'vuex';
    import { useRoute, useRouter } from 'vue-router'

    const store = useStore()
    const route = useRoute()
    const router = useRouter()


    const totalPrice = computed(() => store.getters.totalPrice)
    
    const openDrawer = () => store.commit('openDrawer')

    const onLogoClick = () => {
        if (route.path === '/') {
            window.location.reload()
        } else {
            router.push('/')
        }
    }
</script>


<template>
    <header class="sticky top-0 z-40">
        <div class="flex justify-between bg-white h-20 m-auto shadow-md px-8">
            <div class="flex items-center">
                <h1 @click="onLogoClick" class="text-2xl font-bold font-mono-monaco cursor-pointer">SNEAKER PICKER</h1>
            </div>
            <div class="flex items-center">
                <ul class="flex items-center gap-5">
                    <li @click="openDrawer"
                        class="flex items-center cursor-pointer text-slate-400 hover:text-black">
                        <img src="/public/cart.svg" class="mr-1"><span>Корзина ({{ totalPrice }} руб.)</span>
                    </li>
                    <router-link to="/favorites">
                        <li class="flex items-center cursor-pointer text-slate-400 hover:text-black">
                            <img src="/public/heart.svg" class="mr-1"><span>Избранное</span>
                        </li>
                    </router-link>
                    <router-link to="/profile">
                        <li class="flex items-center cursor-pointer text-slate-400 hover:text-black">
                            <img src="/public/profile.svg" class="mr-1"><span>Личный кабинет</span>
                        </li>
                    </router-link>
                </ul>
            </div>
        </div>
    </header>
</template>
