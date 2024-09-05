<script setup>
    import axios from 'axios'
    import { computed, onMounted, watch } from 'vue';
    import CardList from '@/components/CardList.vue';
    import InfoBlock from '@/components/UI/InfoBlock.vue';
    import { useStore } from 'vuex';

    const store = useStore()

    const onClickAddPlus = (item) => store.dispatch('onClickAddPlus', item)

    const addToFavorites = (item) => store.dispatch('addToFavorites', item)
  
    const favorites = computed(() => store.state.favorites)
    const cart = computed(() => store.state.cart)

    onMounted(async () => {
        try {
            const { data } = await axios.get(`https://b56e406d46f923e3.mokky.dev/favorites`)
            store.commit('setFavorites', data.map((obj) => {
                const item = obj.item
                item.favoriteId = obj.id
                item.isFavorite = true
                item.isAdded = cart.value.some(cartItem => cartItem.id === item.id)
                return item
            }))
            console.log(favorites)
        } catch(e) {
            console.log("Ошибка!")
        }
    })

    watch(cart, () => {
        store.commit('setFavorites', favorites.value.map((item) => ({
            ...item,
            isAdded: false
        })))
    })
</script>

<template>
    <h2 class="text-3xl font-bold mb-8">Избранные товары</h2>
    <div  v-if="!favorites.length" class="flex h-96 items-center">
        <InfoBlock  title="В избранном пусто :(" description="Добавьте любой понравившийся вам товар"></InfoBlock>
    </div>
    <card-list v-else :items="favorites" @add-to-favorite="addToFavorites" @add-to-cart="onClickAddPlus"></card-list>
</template> 