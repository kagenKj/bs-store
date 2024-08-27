<script setup>
    import MyDrawerCard from '@/components/UI/MyDrawerCard.vue';
    import { computed } from 'vue';
    import { useStore } from 'vuex';

    const store = useStore()
    const cart = computed(() => store.state.cart)
    const removeFromCart = (item) => {
        store.commit('removeFromCart', item)
    }
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

