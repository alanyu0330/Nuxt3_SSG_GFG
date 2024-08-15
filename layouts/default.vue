<template>
  <MainHeader />

  <slot />

  <MainFooter />
</template>

<script setup>
import MainHeader from "~/components/MainHeader.vue";
import MainFooter from "~/components/MainFooter.vue";
</script>

<style lang="scss" scoped>
.MyNuxtLink {
  @apply p-2 text-xl font-semibold hover:bg-gray-200;
}
</style>
