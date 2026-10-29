<script setup lang="ts">
// A sheet of ruled notebook paper: the hero illustration. Sample content, clearly stamped.
import { Square } from 'lucide-vue-next'

const { t } = useCopy()

function parts(text: string) {
  return text.split(/(\{[^}]+\})/).filter(Boolean).map((p) => ({ en: p.startsWith('{'), text: p.replace(/[{}]/g, '') }))
}
</script>

<template>
  <figure class="note" :aria-label="`${t.note.stamp}: ${t.note.title}`">
    <span class="stamp" aria-hidden="true">{{ t.note.stamp }}</span>
    <figcaption class="note-title">{{ t.note.title }}</figcaption>

    <p v-for="l in t.note.lines" :key="l.time" class="note-line">
      <span class="note-meta">{{ l.time }} {{ l.who }}</span>
      <span>
        <template v-for="(p, i) in parts(l.text)" :key="i"><mark v-if="p.en">{{ p.text }}</mark><template v-else>{{ p.text }}</template></template>
      </span>
    </p>

    <p class="note-sub">{{ t.note.todoTitle }}</p>
    <p v-for="todo in t.note.todos" :key="todo.text" class="note-todo">
      <Square :size="15" :stroke-width="1.75" aria-hidden="true" />
      <span>{{ todo.text }}</span>
      <span v-if="todo.scrawl" class="scrawl" aria-hidden="true">&larr; {{ todo.scrawl }}</span>
    </p>
  </figure>
</template>
