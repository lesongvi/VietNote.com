<script setup lang="ts">
defineProps<{ num: string; label: string; title: string; lead?: string }>()
</script>

<template>
  <header class="section-head">
    <p class="section-label"><span class="section-num">{{ num }}</span><span class="section-rule" aria-hidden="true" />{{ label }}</p>
    <h2>{{ title }}</h2>
    <p v-if="lead" class="section-lead">{{ lead }}</p>
  </header>
</template>
