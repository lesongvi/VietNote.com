<script setup lang="ts">
const { t, locale } = useCopy()
const { public: { apiBase } } = useRuntimeConfig()

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
  <div class="cta-row" id="join">
    <form class="waitlist" @submit.prevent="submit">
      <input v-model="email" type="email" required autocomplete="email" :placeholder="t.emailPh" :aria-label="t.emailPh" />
      <select v-model="useCase" :aria-label="t.useCase">
        <option v-for="(label, key) in t.useCases" :key="key" :value="key">{{ label }}</option>
      </select>
      <button class="btn" :disabled="status === 'sending'">{{ status === 'sending' ? t.sending : t.join }}</button>
    </form>
    <p class="form-msg" :class="status" role="status" aria-live="polite">
      <template v-if="status === 'ok'">{{ t.ok }}</template>
      <template v-else-if="status === 'err'">{{ t.err }}</template>
    </p>
    <p class="fineprint">{{ t.fine }}</p>
  </div>
</template>
