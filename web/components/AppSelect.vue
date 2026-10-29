<script setup lang="ts">
// Accessible custom select (WAI-ARIA "select-only combobox" pattern).
// Keyboard: Enter / Space / ArrowDown open; Arrow keys, Home, End move; Enter or Space picks;
// Escape closes and returns focus; Tab closes; typing jumps to a matching label.
import { Check, ChevronDown } from 'lucide-vue-next'

export interface SelectOption {
  value: string
  label: string
  hint?: string
}

const props = withDefaults(
  defineProps<{
    modelValue: string
    options: readonly SelectOption[]
    /** Accessible name (there is no visible label in the waitlist form). */
    label: string
    placeholder?: string
    name?: string
    disabled?: boolean
  }>(),
  { placeholder: '', name: undefined, disabled: false },
)

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const uid = useId()
const listId = `${uid}-list`
const optionId = (i: number) => `${uid}-opt-${i}`

const root = ref<HTMLElement>()
const trigger = ref<HTMLButtonElement>()
const open = ref(false)
const active = ref(-1)
const dropUp = ref(false)

const selectedIndex = computed(() => props.options.findIndex((o) => o.value === props.modelValue))
const selected = computed(() => props.options[selectedIndex.value])
const isPlaceholder = computed(() => !props.modelValue)
// The empty option acts as the placeholder, so it never shows the "chosen" check or bold style.
const isChosen = (o: SelectOption) => o.value === props.modelValue && o.value !== ''

function openList() {
  if (props.disabled) return
  const rect = trigger.value?.getBoundingClientRect()
  if (rect) {
    const below = window.innerHeight - rect.bottom
    dropUp.value = below < 300 && rect.top > below
  }
  active.value = Math.max(selectedIndex.value, 0)
  open.value = true
}

function close(refocus = true) {
  open.value = false
  if (refocus) trigger.value?.focus()
}

function choose(i: number) {
  const option = props.options[i]
  if (option) emit('update:modelValue', option.value)
  close()
}

let typed = ''
let typedTimer: ReturnType<typeof setTimeout> | undefined

function typeahead(char: string) {
  typed += char.toLowerCase()
  clearTimeout(typedTimer)
  typedTimer = setTimeout(() => (typed = ''), 600)
  const i = props.options.findIndex((o) => o.label.toLowerCase().startsWith(typed))
  if (i < 0) return
  if (open.value) active.value = i
  else emit('update:modelValue', props.options[i].value)
}

function onKeydown(e: KeyboardEvent) {
  const last = props.options.length - 1
  if (!open.value) {
    if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
      e.preventDefault()
      openList()
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      typeahead(e.key)
    }
    return
  }
  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault()
      active.value = Math.min(active.value + 1, last)
      break
    case 'ArrowUp':
      e.preventDefault()
      active.value = Math.max(active.value - 1, 0)
      break
    case 'Home':
      e.preventDefault()
      active.value = 0
      break
    case 'End':
      e.preventDefault()
      active.value = last
      break
    case 'Enter':
    case ' ':
      e.preventDefault()
      choose(active.value)
      break
    case 'Escape':
      e.preventDefault()
      close()
      break
    case 'Tab':
      close(false)
      break
    default:
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) typeahead(e.key)
  }
}

watch(active, async (i) => {
  if (!open.value || i < 0) return
  await nextTick()
  document.getElementById(optionId(i))?.scrollIntoView({ block: 'nearest' })
})

function onPointerDown(e: PointerEvent) {
  if (open.value && root.value && !root.value.contains(e.target as Node)) close(false)
}

onMounted(() => document.addEventListener('pointerdown', onPointerDown))
onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onPointerDown)
  clearTimeout(typedTimer)
})
</script>

<template>
  <div ref="root" class="select" :class="{ 'is-open': open, 'is-up': dropUp }">
    <input v-if="name" type="hidden" :name="name" :value="modelValue" />
    <button
      ref="trigger"
      type="button"
      class="select-trigger"
      role="combobox"
      aria-haspopup="listbox"
      :aria-label="label"
      :aria-expanded="open"
      :aria-controls="listId"
      :aria-activedescendant="open && active >= 0 ? optionId(active) : undefined"
      :disabled="disabled"
      @click="open ? close() : openList()"
      @keydown="onKeydown"
    >
      <span class="select-value" :class="{ 'is-placeholder': isPlaceholder }">
        {{ selected?.label || placeholder }}
      </span>
      <ChevronDown class="select-chevron" :size="18" :stroke-width="2" aria-hidden="true" />
    </button>

    <Transition name="select-pop">
      <ul v-show="open" :id="listId" class="select-list" role="listbox" :aria-label="label" tabindex="-1">
        <li
          v-for="(o, i) in options"
          :id="optionId(i)"
          :key="o.value"
          class="select-option"
          :class="{ 'is-active': i === active, 'is-selected': isChosen(o) }"
          role="option"
          :aria-selected="o.value === modelValue"
          @pointermove="active = i"
          @mousedown.prevent
          @click="choose(i)"
        >
          <span class="select-option-text">
            <span class="select-option-label">{{ o.label }}</span>
            <small v-if="o.hint" class="select-option-hint">{{ o.hint }}</small>
          </span>
          <Check v-if="isChosen(o)" class="select-check" :size="16" :stroke-width="2.25" aria-hidden="true" />
        </li>
      </ul>
    </Transition>
  </div>
</template>

<style scoped>
.select { position: relative; min-width: 0; }

.select-trigger {
  width: 100%;
  height: var(--control-h);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 0 14px;
  font: inherit;
  font-size: 15px;
  color: var(--ink);
  text-align: left;
  background: var(--paper);
  border: 1px solid var(--line-strong);
  border-radius: var(--r-sm);
  cursor: pointer;
  transition: border-color .15s ease, box-shadow .15s ease;
}
.select-trigger:hover { border-color: var(--ink-3); }
.select-trigger:focus-visible,
.is-open .select-trigger {
  outline: none;
  border-color: var(--blue);
  box-shadow: 0 0 0 3px var(--blue-ring);
}
.select-trigger:disabled { opacity: .55; cursor: not-allowed; }

.select-value { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.select-value.is-placeholder { color: var(--ink-3); }
.select-chevron { flex: none; color: var(--ink-2); transition: transform .15s ease; }
.is-open .select-chevron { transform: rotate(180deg); color: var(--blue); }

.select-list {
  position: absolute;
  z-index: 40;
  left: 0;
  right: 0;
  top: calc(100% + 6px);
  margin: 0;
  padding: 6px;
  list-style: none;
  max-height: 288px;
  overflow-y: auto;
  background: var(--paper);
  border: 1px solid var(--line-strong);
  border-radius: var(--r);
  box-shadow: var(--shadow-pop);
  text-align: left;
}
.is-up .select-list { top: auto; bottom: calc(100% + 6px); }

.select-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 12px;
  border-radius: var(--r-sm);
  color: var(--ink);
  cursor: pointer;
}
.select-option-text { display: grid; gap: 2px; min-width: 0; }
.select-option-label { font-size: 15px; line-height: 1.35; }
.select-option-hint { font-size: 12.5px; color: var(--ink-2); }
.select-option.is-active { background: var(--blue-tint); }
.select-option.is-selected .select-option-label { font-weight: 600; color: var(--blue); }
.select-check { flex: none; color: var(--blue); }

.select-pop-enter-active, .select-pop-leave-active { transition: opacity .12s ease, transform .12s ease; }
.select-pop-enter-from, .select-pop-leave-to { opacity: 0; transform: translateY(-4px); }
.is-up .select-pop-enter-from, .is-up .select-pop-leave-to { transform: translateY(4px); }

@media (prefers-reduced-motion: reduce) {
  .select-pop-enter-active, .select-pop-leave-active, .select-chevron, .select-trigger { transition: none; }
}
</style>
