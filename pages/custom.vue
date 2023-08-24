<script setup>
definePageMeta({
    layout: "custom"
});

    const {$sayHello} = useNuxtApp();
    $sayHello("Customs")
</script>
<template>
    <ContentDoc />
</template>