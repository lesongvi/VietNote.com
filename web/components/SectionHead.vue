<script setup lang="ts">
defineProps<{ eyebrow: string; title: string; lead?: string }>()
</script>

<template>
  <header class="section-head">
    <p class="eyebrow"><span class="eyebrow-mark" aria-hidden="true" />{{ eyebrow }}</p>
    <h2>{{ title }}</h2>
    <p v-if="lead" class="section-lead">{{ lead }}</p>
  </header>
</template>
