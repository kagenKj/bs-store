<script setup>
    import axios from 'axios'
    import { computed, onMounted } from 'vue';
    import CardList from '@/components/CardList.vue';
    import InfoBlock from '@/components/UI/InfoBlock.vue';
    import { useStore } from 'vuex';
    
    const store = useStore()
      
    const orders = computed(() => store.state.orders)

    onMounted(async () => {
        try {
            const { data } = await axios.get(`https://b56e406d46f923e3.mokky.dev/orders`)
            store.commit('setOrders', data.flatMap((obj) =>  obj.items))
        } catch(e) {
            alert("Ошибка!")
        }
    })
</script>

<template>
    <h2 class="text-3xl font-bold mb-8">Мои покупки</h2>
    <div  v-if="!orders.length" class="flex h-96 items-center">
        <InfoBlock  title="Пока что пусто :(" description="Здесь будут отображаться ваши покупки"></InfoBlock>
    </div>
    <card-list :items="orders" is-bought></card-list>
</template> 