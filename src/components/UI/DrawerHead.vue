<script setup>
    import { useStore } from 'vuex';

    const store = useStore()
    const closeDrawer = () => store.commit('closeDrawer')
</script>

<template>
    <div class="flex items-center gap-3 mb-10">
        <img
            @click = "closeDrawer" 
            src="/public/arrow-next.svg"
            class="opacity-30 cursor-pointer hover:opacity-100 rotate-180 mt-1 transition hover:-translate-x-1">
        <h2 class="text-2xl font-bold">Корзина</h2>
    </div>
</template>
