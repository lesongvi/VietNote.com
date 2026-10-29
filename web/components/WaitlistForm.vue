<script setup lang="ts">
withDefaults(defineProps<{ tone?: 'light' | 'dark' }>(), { tone: 'light' })

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
  <div class="waitlist-wrap" :class="`tone-${tone}`">
    <form class="waitlist" @submit.prevent="submit">
      <input
        v-model="email"
        class="input"
        type="email"
        required
        autocomplete="email"
        :placeholder="t.form.emailPh"
        :aria-label="t.form.emailPh"
      />
      <AppSelect v-model="useCase" :options="t.form.useCases" :label="t.form.useCaseLabel" name="use_case" />
      <button class="btn" :class="tone === 'dark' ? 'btn-light' : 'btn-primary'" :disabled="status === 'sending'">
        {{ status === 'sending' ? t.form.sending : t.form.join }}
      </button>
    </form>
    <p class="form-msg" :class="status" role="status" aria-live="polite">
      <template v-if="status === 'ok'">{{ t.form.ok }}</template>
      <template v-else-if="status === 'err'">{{ t.form.err }}</template>
    </p>
    <p class="fineprint">{{ t.form.fine }}</p>
  </div>
</template>
