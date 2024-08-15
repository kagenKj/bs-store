<script setup>
    const emit = defineEmits(['onClickRemove'])

    defineProps({
        id: Number,
        imageUrl: String,
        title: String,
        price: Number,
    })

</script>

<template>
    <div class="border border-slate-200 p-4 rounded-xl flex gap-4 items-center">
        <img :src="imageUrl" :alt="title" class="w-16 h-16 mb-3" />
        <div class="flex flex-col">
            <p>{{ title }}</p>
            <div class="flex mt-2">
                <b>{{ price }} руб</b>
                <img @click="emit('onClickRemove')" src="/public/close.svg" class="ml-44 fixed opacity-50 hover:opacity-100 cursor-pointer transition">
            </div>
        </div>
    </div>
</template>