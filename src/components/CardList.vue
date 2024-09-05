<script setup>
    import MyCard from '@/components/UI/MyCard.vue';
    import { vAutoAnimate } from '@formkit/auto-animate/vue';
    import { useStore } from 'vuex';

    const props = defineProps({
        items: Array,
        isBought: Boolean
    })

    const store = useStore()

    const addToFavorites = (item) => store.dispatch('addToFavorites', item)
    const addToCart = (item) => store.dispatch('onClickAddPlus', item)
</script>

<template>
    <div class="grid grid-cols-4 gap-6" v-auto-animate>
        <my-card 
            v-for="item in props.items" 
            :key="item.id" 
            :id="item.id" 
            :image-url="item.imageUrl" 
            :title="item.title"
            :price="item.price" 
            :onClickFavorite="isBought ? null : () => addToFavorites(item)"
            :onClickAdd="isBought ? null : () => addToCart(item)" 
            :isFavorite="item.isFavorite" 
            :isAdded="item.isAdded"
        ></my-card>
    </div>
</template>
