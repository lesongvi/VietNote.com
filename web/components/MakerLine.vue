<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import { MAKER_LINKS } from '~/composables/useCopy'

defineProps<{ arrow?: boolean }>()
const { t } = useCopy()
</script>

<template>
  <span class="maker-line">
    {{ t.maker.prefix }}
    <a :href="MAKER_LINKS[0].href" target="_blank" rel="noopener">{{ MAKER_LINKS[0].name }}<ArrowUpRight v-if="arrow" :size="'0.7em'" aria-hidden="true" /></a>
    {{ t.maker.and }}
    <a :href="MAKER_LINKS[1].href" target="_blank" rel="noopener">{{ MAKER_LINKS[1].name }}<ArrowUpRight v-if="arrow" :size="'0.7em'" aria-hidden="true" /></a>
  </span>
</template>
