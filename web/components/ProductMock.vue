<script setup lang="ts">
// Illustrative product UI built in HTML/CSS (no screenshots, no fabricated metrics).
import { AudioLines, FileText, Library, ListChecks, Settings } from 'lucide-vue-next'

defineProps<{ full?: boolean }>()
const { t } = useCopy()
const navIcons = [FileText, Library, ListChecks, Settings]

// "{deadline}" -> highlighted English term
function parts(text: string) {
  return text.split(/(\{[^}]+\})/).filter(Boolean).map((p) => ({
    en: p.startsWith('{'),
    text: p.replace(/[{}]/g, ''),
  }))
}
</script>

<template>
  <figure class="mock" :class="{ 'mock-full': full }" :aria-label="t.mock.sample">
    <aside v-if="full" class="mock-side" aria-hidden="true">
      <div class="mock-brand"><AudioLines :size="16" /> VietNote</div>
      <ul>
        <li v-for="(label, i) in t.mock.nav" :key="label" :class="{ on: i === 0 }">
          <component :is="navIcons[i]" :size="15" /> {{ label }}
        </li>
      </ul>
    </aside>

    <div class="mock-main">
      <div class="mock-top">
        <div>
          <p class="mock-kicker">{{ t.mock.sample }}</p>
          <p class="mock-title">{{ t.mock.title }}</p>
        </div>
        <span class="mock-live"><i aria-hidden="true" /> {{ t.mock.live }}</span>
      </div>

      <div class="mock-wave" aria-hidden="true">
        <i v-for="n in 44" :key="n" :style="{ height: `${18 + ((n * 37) % 70)}%` }" />
      </div>

      <div class="mock-cols">
        <section class="mock-panel">
          <h4>{{ t.mock.transcript }}</h4>
          <p v-for="l in t.mock.lines" :key="l.time" class="mock-line">
            <span class="mock-who">{{ l.who }} <time>{{ l.time }}</time></span>
            <span>
              <template v-for="(p, i) in parts(l.text)" :key="i">
                <mark v-if="p.en">{{ p.text }}</mark><template v-else>{{ p.text }}</template>
              </template>
            </span>
          </p>
        </section>

        <section class="mock-panel">
          <h4>{{ t.mock.summary }}</h4>
          <ul class="mock-bullets">
            <li v-for="b in t.mock.bullets" :key="b">{{ b }}</li>
          </ul>
          <h4 class="mock-gap">{{ t.mock.actions }}</h4>
          <ul class="mock-tasks">
            <li v-for="task in t.mock.tasks" :key="task.what">
              <b>{{ task.who }}</b> {{ task.what }} <em>{{ task.due }}</em>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </figure>
</template>
