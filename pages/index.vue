<template>
    <main>
        <ContentDoc />
    </main>
</template>

<script setup>
    const {$sayHello} = useNuxtApp();
    $sayHello("Elvin Kyungu");
    definePageMeta({
        middleware: 'auth'
    })
</script>