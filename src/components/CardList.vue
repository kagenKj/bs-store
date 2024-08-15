<script setup>
    import MyCard from '@/components/UI/MyCard.vue';
    import { vAutoAnimate } from '@formkit/auto-animate/vue';

    defineProps({
        items: Array,
    })
    const emit = defineEmits(['addToFavorite', 'addToCart'])
</script>

<template>
    <div class="grid grid-cols-4 gap-6" v-auto-animate>
        <my-card 
            v-for="item in items" 
            :key="item.id" 
            :id="item.id" 
            :image-url="item.imageUrl" 
            :title="item.title"
            :price="item.price" 
            :onClickFavorite="() => emit('addToFavorite', item)"
            :onClickAdd="() => emit('addToCart', item)" 
            :isFavorite="item.isFavorite" 
            :isAdded="item.isAdded"
        ></my-card>
    </div>
</template>

