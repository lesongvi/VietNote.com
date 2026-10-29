<script setup lang="ts">
import {
  ArrowRight, AudioLines, Check, CircleCheck, Circle, FileText, GraduationCap, Globe, Languages,
  LoaderCircle, MessageSquare, Mic, Monitor, Puzzle, Search, Sparkles, Users, Video, Zap, ArrowRightCircle,
} from 'lucide-vue-next'

const { t, locale, toggle } = useCopy()

const icons = {
  mic: Mic, sparkles: Sparkles, message: MessageSquare, languages: Languages, puzzle: Puzzle,
  monitor: Monitor, users: Users, graduation: GraduationCap, video: Video, file: FileText,
  check: Check, audio: AudioLines, zap: Zap, search: Search,
} as const
type IconKey = keyof typeof icons

const stepIcons = { done: CircleCheck, now: LoaderCircle, next: ArrowRightCircle, plan: Circle } as const
type StepKey = keyof typeof stepIcons
</script>

<template>
  <div class="page">
    <a class="skip" href="#main">{{ t.skip }}</a>

    <header class="site-header">
      <div class="wrap bar">
        <a class="logo" href="#top" aria-label="VietNote">
          <span class="logo-mark"><AudioLines :size="18" :stroke-width="2.25" aria-hidden="true" /></span>
          VietNote
        </a>
        <nav class="nav-links" aria-label="Main">
          <a href="#features">{{ t.nav.features }}</a>
          <a href="#how">{{ t.nav.how }}</a>
          <a href="#progress">{{ t.nav.progress }}</a>
        </nav>
        <div class="bar-actions">
          <button class="btn btn-ghost btn-sm" type="button" :aria-label="t.langLabel" @click="toggle">
            <Globe :size="15" aria-hidden="true" /> {{ locale === 'vi' ? 'EN' : 'VI' }}
          </button>
          <a class="btn btn-primary btn-sm" href="#join">{{ t.nav.join }}</a>
        </div>
      </div>
    </header>

    <main id="main">
      <!-- Hero -->
      <section id="top" class="hero">
        <div class="wrap hero-grid">
          <div class="hero-copy">
            <p class="eyebrow">
              <span class="eyebrow-mark" aria-hidden="true" />{{ t.hero.eyebrow }}
              <span class="status-tag">{{ t.hero.status }}</span>
            </p>
            <h1>{{ t.hero.h1a }} <span class="accent">{{ t.hero.h1b }}</span></h1>
            <p class="lead">{{ t.hero.lead }}</p>
            <div id="join" class="hero-form"><WaitlistForm /></div>
          </div>
          <ProductMock />
        </div>

        <div class="wrap">
          <dl class="stats">
            <div v-for="s in t.hero.stats" :key="s.t" class="stat">
              <dt><span class="stat-n">{{ s.n }}</span> {{ s.t }}</dt>
              <dd>{{ s.d }}</dd>
            </div>
          </dl>
        </div>
      </section>

      <!-- Why -->
      <section class="section">
        <div class="wrap">
          <SectionHead :eyebrow="t.why.eyebrow" :title="t.why.title" />
          <div class="why-grid">
            <article v-for="(it, i) in t.why.items" :key="it.t" class="card why-card">
              <p class="num">{{ String(i + 1).padStart(2, '0') }}</p>
              <h3>{{ it.t }}</h3>
              <p>{{ it.d }}</p>
              <p class="card-foot"><span class="tag">{{ it.tag }}</span></p>
            </article>
          </div>
        </div>
      </section>

      <!-- How it works -->
      <section id="how" class="section section-tint">
        <div class="wrap">
          <SectionHead :eyebrow="t.how.eyebrow" :title="t.how.title" />
          <div class="flow">
            <div class="flow-col">
              <p class="flow-label">{{ t.how.sourcesLabel }}</p>
              <div v-for="s in t.how.sources" :key="s.t" class="flow-node">
                <component :is="icons[s.i as IconKey]" :size="18" aria-hidden="true" /> {{ s.t }}
              </div>
            </div>
            <div class="flow-link" aria-hidden="true"><ArrowRight :size="20" /></div>
            <div class="flow-hub">
              <span class="flow-hub-icon"><AudioLines :size="28" :stroke-width="2" aria-hidden="true" /></span>
              <strong>{{ t.how.hub.t }}</strong>
              <span>{{ t.how.hub.d }}</span>
            </div>
            <div class="flow-link" aria-hidden="true"><ArrowRight :size="20" /></div>
            <div class="flow-col">
              <p class="flow-label">{{ t.how.outputsLabel }}</p>
              <div v-for="o in t.how.outputs" :key="o.t" class="flow-node">
                <component :is="icons[o.i as IconKey]" :size="18" aria-hidden="true" /> {{ o.t }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Product depth -->
      <section id="features" class="section">
        <div class="wrap">
          <SectionHead :eyebrow="t.product.eyebrow" :title="t.product.title" :lead="t.product.lead" />
          <div class="module-grid">
            <article v-for="m in t.product.modules" :key="m.t" class="card module">
              <div class="module-top">
                <span class="icon-tile"><component :is="icons[m.i as IconKey]" :size="20" :stroke-width="1.75" aria-hidden="true" /></span>
                <span class="tag">{{ m.tag }}</span>
              </div>
              <h3>{{ m.t }}</h3>
              <p>{{ m.d }}</p>
            </article>
          </div>
        </div>
      </section>

      <!-- Blue band with dashboard -->
      <section class="band on-blue">
        <div class="wrap">
          <SectionHead :eyebrow="t.band.eyebrow" :title="t.band.title" :lead="t.band.lead" />
          <ProductMock full class="band-mock" />
          <ul class="band-points">
            <li v-for="p in t.band.points" :key="p.t">
              <component :is="icons[p.i as IconKey]" :size="20" aria-hidden="true" />
              <div><strong>{{ p.t }}</strong><span>{{ p.d }}</span></div>
            </li>
          </ul>
        </div>
      </section>

      <!-- Progress -->
      <section id="progress" class="section">
        <div class="wrap">
          <SectionHead :eyebrow="t.progress.eyebrow" :title="t.progress.title" :lead="t.progress.lead" />
          <ol class="steps">
            <li v-for="s in t.progress.steps" :key="s.t" class="card step" :class="`is-${s.s}`">
              <component :is="stepIcons[s.s as StepKey]" class="step-icon" :size="22" aria-hidden="true" />
              <p class="step-status">{{ t.progress.status[s.s as StepKey] }}</p>
              <p class="step-title">{{ s.t }}</p>
            </li>
          </ol>
        </div>
      </section>

      <!-- Final CTA -->
      <section class="band cta on-blue">
        <div class="wrap cta-inner">
          <h2>{{ t.cta.title }}</h2>
          <p class="section-lead">{{ t.cta.lead }}</p>
          <WaitlistForm tone="dark" />
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="wrap foot">
        <a class="logo" href="#top" aria-label="VietNote">
          <span class="logo-mark"><AudioLines :size="18" :stroke-width="2.25" aria-hidden="true" /></span>
          VietNote
        </a>
        <p>{{ t.foot }}</p>
      </div>
    </footer>
  </div>
</template>
