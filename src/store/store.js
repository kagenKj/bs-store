import { createStore } from 'vuex';
import axios from 'axios'

export default createStore({
    state: () => ({
        items: [],
        cart: [],
        orders: [],
        favorites: [], 
        isDrawerOpen: false,
        filters: {
            sortBy: 'title',
            searchQuery: ''
        }
    }),

    getters: {
        totalPrice(state) {
            return state.cart.reduce((acc, item) => acc + item.price, 0)
        },
        vatPrice(state, getters) {
            return Math.round((getters.totalPrice * 5) / 100)
        },
    },

    mutations: {
        setItems(state, items) {
            state.items = items
        },
        setCart(state, cart) {
            state.cart = cart
        },
        setOrders(state, orders) {
            state.orders = orders
        },
        setFavorites(state, favorites) {
            state.favorites = favorites
        },
        setFiltersSearchQuery(state, filter) {
            state.filters.searchQuery = filter
        },
        setFiltersSortBy(state, filter) {
            state.filters.sortBy = filter
        },
        openDrawer(state) {
            state.isDrawerOpen = true
        },
        closeDrawer(state) {
            state.isDrawerOpen = false
        },
        
        addToCart(state, item) {
            state.cart.push(item)
            const itemInItems = state.items.find(listItem => listItem.id === item.id)
            if (itemInItems) {
                itemInItems.isAdded = true;
            }
            const itemInFavorites = state.favorites.find(favItem => favItem.id === item.id);
            if (itemInFavorites) {
                itemInFavorites.isAdded = true;
            }
        },

        removeFromCart(state, item) {
            const index = state.cart.findIndex(cartItem => cartItem.id === item.id)
            if (index > -1) {
                state.cart.splice(index, 1);
                const itemInItems = state.items.find(listItem => listItem.id === item.id)
                if (itemInItems) {
                    itemInItems.isAdded = false
                }
                const itemInFavorites = state.favorites.find(favItem => favItem.id === item.id);
                if (itemInFavorites) {
                    itemInFavorites.isAdded = false;
                }
            }
        },

    },

    actions: {
        onClickAddPlus({ commit }, item) {
            if (!item.isAdded) {
                commit('addToCart', item)
            } else {
                commit('removeFromCart', item)
            }
        },

        async fetchItems({ commit, state }) {
            try {
                const params = {
                    sortBy: state.filters.sortBy,
                }

                if (state.filters.searchQuery) {
                    params.title = `*${state.filters.searchQuery}*`
                }

                const { data } = await axios.get('https://b56e406d46f923e3.mokky.dev/items', {
                    params
                })

                commit('setItems', data.map(item => ({
                    ...item,
                    isFavorite: false,
                    favoriteId: null,
                    isAdded: false
                })))
            } catch (e) {
                console.log('Ошибка при получении товаров:', e)
            }
        },

        async fetchFavorites({ commit, state }) {
            try {
                const { data: favorites } = await axios.get('https://b56e406d46f923e3.mokky.dev/favorites')
                commit('setItems', state.items.map(item => {
                    const favorite = favorites.find(favorite => favorite.item_id === item.id)
                    if (favorite) {
                        return {
                            ...item,
                            isFavorite: true,
                            favoriteId: favorite.id,
                        }
                    }
                    return item
                }))
            } catch (e) {
                console.log('Ошибка при получении избранного:', e)
            }
        },

        async addToFavorites({ commit, state }, item) {
            try {
                if (!item.isFavorite) {
                    const obj = {
                        item_id: item.id,
                        item
                    }
                    
                    item.isFavorite = true
                    const { data } = await axios.post('https://b56e406d46f923e3.mokky.dev/favorites', obj)
                    item.favoriteId = data.id
                    await axios.patch(`https://b56e406d46f923e3.mokky.dev/favorites/${data.id}`, {
                        item_id: item.id,
                        item: {
                            ...item,
                            favoriteId: data.id,
                            isFavorite: true
                        }
                    })
                } else {
                    item.isFavorite = false
                    await axios.delete(`https://b56e406d46f923e3.mokky.dev/favorites/${item.favoriteId}`)
                    item.favoriteId = null

                    const { data } = await axios.get(`https://b56e406d46f923e3.mokky.dev/favorites`)
                    commit('setFavorites',data.map((obj) => {
                        const item = obj.item
                        item.favoriteId = obj.id
                        item.isFavorite = true
                        return item
                    }))
                    
                }
            } catch (e) {
                console.log('Ошибка при добавлении/удалении из избранного:', e)
            }
        }
    }
});
      