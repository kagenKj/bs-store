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
            return state.cart.reduce((acc, item) => acc + item.price, 0);
        },
        vatPrice(state, getters) {
            return Math.round((getters.totalPrice * 5) / 100);
        },
    },

    mutations: {
        setItems(state, items) {
            state.items = items;
        },
        setCart(state, cart) {
            state.cart = cart;
        },
        setOrders(state, orders) {
            state.orders = orders;
        },
        setFavorites(state, favorites) {
            state.favorites = favorites;
        },
        openDrawer(state) {
            state.isDrawerOpen = true;
        },
        closeDrawer(state) {
            state.isDrawerOpen = false;
        },
        
        addToCart(state, item) {
            state.cart.push(item);
            const itemInList = state.items.find(listItem => listItem.id === item.id);
            if (itemInList) {
              itemInList.isAdded = true;
            }
        },

        removeFromCart(state, item) {
            const index = state.cart.findIndex(cartItem => cartItem.id === item.id);
            if (index > -1) {
              state.cart.splice(index, 1);
              const itemInList = state.items.find(listItem => listItem.id === item.id);
              if (itemInList) {
                itemInList.isAdded = false;
              }
            }
        },
    },

    actions: {
        async fetchItems({ commit, state }) {
            try {
                const params = {
                    sortBy: state.filters.sortBy,
                };
      
                if (state.filters.searchQuery) {
                    params.title = `*${state.filters.searchQuery}*`;
                 }
      
                const { data } = await axios.get('https://b56e406d46f923e3.mokky.dev/items', { params });
                const items = data.map(obj => ({
                    ...obj,
                    isFavorite: false,
                    favoriteId: null,
                    dAdded: false,
                    isAdded: state.cart.some(cartItem => cartItem.id === obj.id),
                }));
                commit('setItems', items);
            } catch (e) {
                alert('Ошибка!');
            }
        },
      
        async fetchFavorites({ commit, state }) {
            try {
                const { data: favorites } = await axios.get('https://b56e406d46f923e3.mokky.dev/favorites');
                const items = state.items.map(item => {
                const favorite = favorites.find(favorite => favorite.item_id === item.id);
      
                if (!favorite) {
                    return item;
                }
      
                return {
                    ...item,
                    isFavorite: true,
                    favoriteId: favorite.id,
                };
            });
                commit('setItems', items);
            } catch (e) {
                alert('Ошибка!');
            }
        },
      
        async addToFavorites(item) {
            try {
                if (!item.isFavorite) {
                    const obj = {
                        item_id: item.id,
                        item,
                    };
                    item.isFavorite = true;
                    const { data } = await axios.post('https://b56e406d46f923e3.mokky.dev/favorites', obj);
                    item.favoriteId = data.id;
                } else {
                    item.isFavorite = false;
                    await axios.delete(`https://b56e406d46f923e3.mokky.dev/favorites/${item.favoriteId}`);
                    item.favoriteId = null;
                }
            } catch (e) {
                alert('Ошибка!', e);
            }
        },
    }
});
      