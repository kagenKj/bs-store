<script setup>
    import axios from 'axios'
    import debounce from 'lodash.debounce';
    import CardList from '@/components/CardList.vue'
    import { inject, reactive, watch,  onMounted, provide } from 'vue';

   
    const { items } = inject('items')
    const {cart, addToCart, removeFromCart} = inject('cart')

    const filters = reactive({
        sortBy: 'title',
        searchQuery: ''
    })
    
    const onChangeSelect = event => {
        filters.sortBy = event.target.value
    }

    const onChangeSearchInput = debounce(event => {
        filters.searchQuery = event.target.value
    }, 500)

    const onClickAddPlus = (item) => {
        if (!item.isAdded) {
            addToCart(item)
        } else {
            removeFromCart(item)
        }
    }


    const addToFavorites = async (item) => {
        try {
            if (!item.isFavorite) {
                const obj = {
                    item_id: item.id,
                    item
                }
                item.isFavorite = true
                const { data } = await axios.post(`https://b56e406d46f923e3.mokky.dev/favorites`, obj)
                item.favoriteId = data.id
            } else {
                item.isFavorite = false
                await axios.delete(`https://b56e406d46f923e3.mokky.dev/favorites/${item.favoriteId}`)
                item.favoriteId = null
            }
        } catch (e) {
            alert("Ошибка!", e)
        }
    }

    const fetchFavorites = async () => {
        try {
            const { data: favorites } = await axios.get(`https://b56e406d46f923e3.mokky.dev/favorites`)
            items.value = items.value.map(item => {
                const favorite = favorites.find(favorite => favorite.item_id === item.id)

                if (!favorite) {
                    return item
                }

                return {
                    ...item,
                    isFavorite: true,
                    favoriteId: favorite.id,
                }
            })
        } catch (e) {
            alert('Ошибка!')
        }
    }

    const fetchItems = async () => {
        try {
            const params = {
                sortBy: filters.sortBy,
            }

            if (filters.searchQuery) {
                params.title = `*${filters.searchQuery}*`
            }

            const { data } = await axios.get('https://b56e406d46f923e3.mokky.dev/items',
                {
                    params
                }
            )
            items.value = data.map((obj) => ({
                ...obj,
                isFavorite: false,
                favoriteId: null,
                idAdded: false
            }))
        } catch (e) {
            alert('Ошибка!')
        }
    }

    watch(filters, fetchItems)

    watch(cart, () => {
        items.value = items.value.map((item) => ({
            ...item,
            isAdded: false
        }))
    })

    onMounted(async () => {
        const localCart = localStorage.getItem('cart')
        cart.value = localCart ? JSON.parse(localCart) : []
        await fetchItems()
        await fetchFavorites()
        items.value = items.value.map((item) => ({
            ...item,
            isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
        }))
    })
    provide('addToFavorites',  addToFavorites)
    provide('onClickAddPlus',  onClickAddPlus)
    
   
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
