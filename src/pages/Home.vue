<script setup>
    import debounce from 'lodash.debounce';
    import CardList from '@/components/CardList.vue'
    import { watch, onMounted, computed } from 'vue';
    import { useStore } from 'vuex';

    const store = useStore()

    const items = computed(() => store.state.items)

    const cart = computed(() => store.state.cart)


    const filters = computed(() => store.state.filters)
    
    const onChangeSelect = (event) => store.commit('setFiltersSortBy', event.target.value)

    const onChangeSearchInput = debounce(event => {
        store.commit('setFiltersSearchQuery', event.target.value)
    }, 500)


    const onClickAddPlus = (item) => store.commit('onClickAddPlus', item)
  
 
    const addToFavorites = (item) =>  store.dispatch('addToFavorites', item)


    const fetchItems = () => store.dispatch('fetchItems')


    watch(filters, fetchItems, { deep: true })


    watch(cart, () => {
        store.commit('setItems', items.value.map((item) => ({
            ...item,
            isAdded: false
        })))
    })
    
    onMounted(async () => {
        const localCart = localStorage.getItem('cart')
        store.commit('setCart', localCart ? JSON.parse(localCart) : [] )
        await fetchItems()
        store.commit('setItems', items.value.map((item) => ({
            ...item,
            isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
        })))
    })
</script>

<template>
    <div class="flex items-center justify-between">
        <h2 class="text-3xl font-bold mb-8">Все товары</h2>
        <div class="flex gap-4 mb-4">
            <div class="flex items-center relative">
                <img src="/public/search.svg" class="absolute left-3">
                <input @input="onChangeSearchInput"
                    class="border border-gray-300 rounded-lg py-1 pl-10 pr-5 outline-none focus:border-gray-500"
                    type="text" placeholder="Поиск...">
            </div>
            <select @change="onChangeSelect"
                class="h-8.5 border rounded-lg px-3 outline-none cursor-pointer focus:border-gray-500">
                <option disabled value="">Выберите из списка</option>
                <option value="price">По возрастанию цены</option>
                <option value="-price">По убыванию цены</option>
            </select>
        </div>
    </div>
    <card-list :items="items" @add-to-favorite="addToFavorites" @add-to-cart="onClickAddPlus"></card-list>
</template>
