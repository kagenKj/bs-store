<script setup>
    import axios from 'axios'
    import DrawerHead from './UI/DrawerHead.vue';
    import CardListDrawer from './CardListDrawer.vue';
    import InfoBlock from './UI/InfoBlock.vue';
    import { computed, inject,  ref } from 'vue';

    const props = defineProps({
        totalPrice: Number,
        vatPrice: Number,
    })

    const { cart, closeDrawer } = inject('cart')
    
    const isCreatingOrder = ref(false)
    const orderId = ref(null)

    const cartIsEmpty = computed(() => cart.value === 0)
    const buttonDisabled = computed(() => isCreatingOrder.value || cartIsEmpty.value)
   

    const createOrder = async () => {
        try {
            isCreatingOrder.value = true
            const { data } = await axios.post(`https://b56e406d46f923e3.mokky.dev/orders`, {
                items: cart.value,
                totalPrice: props.totalPrice
            })
            
            cart.value = []
            orderId.value = data.id
        } catch (e) {
            alert('Ошибка!')
        } finally {
            isCreatingOrder.value = false
        }
    }
</script>

<template>
    <div class="sticky z-50">
        <div @click="closeDrawer" class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-60"> </div>
        <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">
            <drawer-head></drawer-head>


            <div v-if="!totalPrice || orderId" class="flex h-full items-center">
                <InfoBlock v-if="!totalPrice && !orderId"  title="Корзина пустая" description="Добавьте товар, чтобы сделать заказ"></InfoBlock>
                <InfoBlock v-if="orderId" title="Ура! Ваш заказ оформлен!" :description="`Номер заказа: #${orderId}. Совсем скоро он будет передан в доставку :)`"></InfoBlock>
                
            </div>

            <div v-else>
                <card-list-drawer></card-list-drawer>
                <div class="flex flex-col gap-4 mt-7">
                    <div class="flex gap-2">
                        <span>Итого:</span>
                        <div class="flex-1 border-b border-dashed mb-1.5"></div>
                        <b>{{ totalPrice }} руб</b>
                    </div>
                    <div class="flex gap-2">
                        <span>Налог 5%:</span>
                        <div class="flex-1 border-b border-dashed mb-1.5"></div>
                        <b>{{ vatPrice }} руб</b>
                    </div>
                    <button @click="createOrder" :disabled="buttonDisabled"
                        class="bg-lime-500 rounded-xl py-3 mt-4 text-white font-bold hover:bg-lime-400 transition active:bg-lime-600 disabled:bg-slate-300 cursor-pointer"
                        >Оформить заказ
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

