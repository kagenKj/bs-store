<script setup>
    import axios from 'axios'
    import { inject, onMounted, ref } from 'vue';
    import CardList from '@/components/CardList.vue';

    const onClickAddPlus = inject('onClickAddPlus')
    const addToFavorites = inject('addToFavorites')
    const favorites = ref([])

    onMounted(async () => {
        try {
            const { data } = await axios.get(`https://b56e406d46f923e3.mokky.dev/favorites`)
            favorites.value = data.map((obj) => obj.item)
        } catch(e) {
            alert("Ошибка!")
        }
    })
</script>

<template>
    <h2 class="text-3xl font-bold mb-8">Избранные товары</h2>
    <card-list :items="favorites" @add-to-favorite="addToFavorites" @add-to-cart="onClickAddPlus"></card-list>
</template> 