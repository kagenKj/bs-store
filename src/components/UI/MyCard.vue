<script setup>

defineProps({
    id: Number,
    imageUrl: String,
    title: String,
    price: Number,
    isFavorite: Boolean,
    isAdded: Boolean,
    onClickFavorite: Function,
    onClickAdd: Function
})

</script>

<template>
    <div
        class="relative  bg-white border p-8 border-slate-100 rounded-2xl cursor-pointer transition hover:-translate-y-2 hover:shadow-xl">
        <img @click="onClickFavorite" :src="isFavorite ? '/public/like-2.svg' : '/public/like-1.svg'"
            class="absolute top-8 left-8">
        <div class="flex flex-col items-center">
            <img :src="imageUrl" alt="Кроссовок" class="max-h-56" />
        </div>
        <p class="mt-2">
            {{ title }}
        </p>

        <div class="flex justify-between mt-5">
            <div class="flex flex-col">
                <span class="text-slate-500">
                    Цена:
                </span>
                <b>
                    {{ price }} руб
                </b>

            </div>
            <img @click="onClickAdd" :src="!isAdded ? '/public/plus.svg' : '/public/checked.svg'" alt="Добавить" />
        </div>
    </div>
</template>


