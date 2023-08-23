<template>
    <div>Hello Nuxt 3</div>
    <ProfileHeaderAvatar />
    <img src="../assets/IMG_5465.jpg" alt="" srcset="">
</template>

<script setup>
    const {$sayHello} = useNuxtApp();
    $sayHello("Elvin Kyungu");
    definePageMeta({
        middleware: 'auth'
    })
</script>