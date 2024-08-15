<script setup>
    import axios from 'axios'
    import { onMounted, ref } from 'vue';
    import CardList from '@/components/CardList.vue';

    const orders = ref([])

    onMounted(async () => {
        try {
            const { data } = await axios.get(`https://b56e406d46f923e3.mokky.dev/orders`)
            orders.value = data.flatMap((obj) =>  obj.items)
            console.log(orders.value)

        } catch(e) {
            alert("Ошибка!")
        }
    })
</script>

<template>
    <h2 class="text-3xl font-bold mb-8">Мои покупки</h2>
    <card-list :items="orders"></card-list>
</template> 