<script setup>
    defineProps({
        title: String,
        description: String
    })
</script>

<template>
    <div class="flex flex-col items-center text-center mx-auto">
        <h2 class="mt-4 text-2xl font-medium">{{ title }}</h2>
        <p class="text-gray-400 mt-2 w-72">{{ description }}</p>
    </div>
</template>



