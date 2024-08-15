<script setup>
    import MyDrawerCard from '@/components/UI/MyDrawerCard.vue';
    import { inject } from 'vue';

    const { cart, removeFromCart} = inject('cart')
</script>

<template>
    <div class="flex flex-col gap-5 flex-1" v-auto-animate>
        <my-drawer-card 
            v-for="item in cart" 
            :key="item.id" 
            :image-url="item.imageUrl"
            :title="item.title"
            :price="item.price"
            @on-click-remove="() => removeFromCart(item)"
        ></my-drawer-card> 
    </div>
</template>

