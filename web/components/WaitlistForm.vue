<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'

withDefaults(defineProps<{ tone?: 'light' | 'dark' }>(), { tone: 'light' })

const { t, locale } = useCopy()
const { public: { apiBase } } = useRuntimeConfig()
const uid = useId()

const email = ref('')
const useCase = ref('')
const status = ref<'idle' | 'sending' | 'ok' | 'err'>('idle')

async function submit() {
  if (status.value === 'sending') return
  status.value = 'sending'
  try {
    await $fetch(`${apiBase}/waitlist`, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: { email: email.value, use_case: useCase.value || null, locale: locale.value },
    })
    status.value = 'ok'
    email.value = ''
  } catch {
    status.value = 'err'
  }
}
</script>

<template>
  <div class="waitlist-wrap" :class="`tone-${tone}`">
    <form class="waitlist" @submit.prevent="submit">
      <div class="field">
        <label :for="`${uid}-email`">{{ t.form.emailLabel }}</label>
        <input :id="`${uid}-email`" v-model="email" class="input" type="email" required autocomplete="email" :placeholder="t.form.emailPh" />
      </div>
      <div class="field">
        <span :id="`${uid}-uc`" class="field-label">{{ t.form.useCaseTitle }}</span>
        <AppSelect v-model="useCase" :options="t.form.useCases" :label="t.form.useCaseLabel" name="use_case" />
      </div>
      <button class="btn" :class="tone === 'dark' ? 'btn-paper' : 'btn-ink'" :disabled="status === 'sending'">
        {{ status === 'sending' ? t.form.sending : t.form.join }}
        <ArrowRight :size="18" aria-hidden="true" />
      </button>
    </form>
    <p class="form-msg" :class="status" role="status" aria-live="polite">
      <template v-if="status === 'ok'">{{ t.form.ok }}</template>
      <template v-else-if="status === 'err'">{{ t.form.err }}</template>
    </p>
    <p class="fineprint">{{ t.form.fine }}</p>
  </div>
</template>
