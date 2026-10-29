<script setup lang="ts">
import { ArrowRight, Globe } from 'lucide-vue-next'
import { MAKER_LINKS } from '~/composables/useCopy'

const { t, locale, toggle } = useCopy()

// "{deadline}" -> highlighted English term
function parts(text: string) {
  return text.split(/(\{[^}]+\})/).filter(Boolean).map((p) => ({ en: p.startsWith('{'), text: p.replace(/[{}]/g, '') }))
}
</script>

<template>
  <div class="page">
    <a class="skip" href="#main">{{ t.skip }}</a>

    <div class="topstrip">
      <div class="wrap"><MakerLine arrow /></div>
    </div>

    <header class="masthead">
      <div class="wrap bar">
        <a class="logo" href="#top" aria-label="VietNote">
          <span class="seal" aria-hidden="true">V</span>
          <span class="wordmark">VietNote</span>
        </a>
        <nav class="nav-links" aria-label="Main">
          <a href="#why">{{ t.nav.why }}</a>
          <a href="#example">{{ t.nav.example }}</a>
          <a href="#features">{{ t.nav.features }}</a>
          <a href="#progress">{{ t.nav.progress }}</a>
        </nav>
        <div class="bar-actions">
          <button class="lang" type="button" :aria-label="t.langLabel" @click="toggle">
            <Globe :size="15" aria-hidden="true" /> {{ locale === 'vi' ? 'EN' : 'VI' }}
          </button>
          <a class="link-cta" href="#join">{{ t.nav.join }}</a>
        </div>
      </div>
    </header>

    <main id="main">
      <!-- Hero -->
      <section id="top" class="hero">
        <div class="wrap hero-grid">
          <div class="hero-copy">
            <p class="issue"><span class="issue-dot" aria-hidden="true" />{{ t.hero.issue }}</p>
            <h1>
              {{ t.hero.h1a }}
              <span class="scribble"><em>{{ t.hero.h1em }}</em>
                <svg viewBox="0 0 220 14" preserveAspectRatio="none" aria-hidden="true"><path d="M3 9 C 30 2, 58 12, 100 6 S 178 2, 217 8" /></svg>
              </span>
              {{ t.hero.h1b }}
            </h1>
            <p class="lead">{{ t.hero.lead }}</p>
            <div id="join" class="hero-form"><WaitlistForm /></div>
            <p class="platforms">
              <span>{{ t.hero.platformsLabel }}</span>
              <b v-for="p in t.hero.platforms" :key="p">{{ p }}</b>
            </p>
          </div>
          <NotePage />
        </div>
      </section>

      <!-- Why -->
      <section id="why" class="section">
        <div class="wrap split">
          <SectionHead :num="t.why.num" :label="t.why.label" :title="t.why.title" />
          <ol class="principles">
            <li v-for="(it, i) in t.why.items" :key="it.t">
              <span class="p-num" aria-hidden="true">{{ i + 1 }}</span>
              <div>
                <h3>{{ it.t }}</h3>
                <p>{{ it.d }}</p>
                <p class="tagline">{{ it.tag }}</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <!-- Example: speech -> notes -->
      <section id="example" class="section section-paper2">
        <div class="wrap">
          <SectionHead :num="t.example.num" :label="t.example.label" :title="t.example.title" :lead="t.example.lead" />
          <div class="s2n">
            <div class="s2n-col s2n-raw">
              <p class="col-label">{{ t.example.spokenLabel }}</p>
              <p class="spoken">
                <template v-for="(s, i) in t.example.spoken" :key="i">
                  <s class="filler">{{ s.filler }}</s>
                  {{ ' ' }}<template v-for="(p, j) in parts(s.text)" :key="j"><mark v-if="p.en">{{ p.text }}</mark><template v-else>{{ p.text }}</template></template>{{ ' ' }}
                </template>
              </p>
            </div>
            <div class="s2n-arrow" aria-hidden="true"><ArrowRight :size="28" :stroke-width="1.5" /></div>
            <div class="s2n-col s2n-clean">
              <p class="col-label">{{ t.example.noteLabel }}</p>
              <h3>{{ t.example.decisions }}</h3>
              <ul>
                <li v-for="d in t.example.decisionsList" :key="d">
                  <template v-for="(p, j) in parts(d)" :key="j"><mark v-if="p.en">{{ p.text }}</mark><template v-else>{{ p.text }}</template></template>
                </li>
              </ul>
              <h3>{{ t.example.todosTitle }}</h3>
              <ul>
                <li v-for="d in t.example.todos" :key="d">
                  <template v-for="(p, j) in parts(d)" :key="j"><mark v-if="p.en">{{ p.text }}</mark><template v-else>{{ p.text }}</template></template>
                </li>
              </ul>
            </div>
          </div>
          <p class="caveat">{{ t.example.caveat }}</p>
        </div>
      </section>

      <!-- Features ledger -->
      <section id="features" class="section">
        <div class="wrap">
          <SectionHead :num="t.features.num" :label="t.features.label" :title="t.features.title" />
          <ul class="ledger">
            <li v-for="f in t.features.items" :key="f.t" :class="`is-${f.s}`">
              <h3>{{ f.t }}</h3>
              <p>{{ f.d }}</p>
              <span class="status"><i aria-hidden="true" />{{ f.st }}</span>
            </li>
          </ul>
        </div>
      </section>

      <!-- Makers -->
      <section class="makers">
        <div class="wrap makers-grid">
          <div>
            <p class="section-label"><span class="section-num">{{ t.makerSection.num }}</span><span class="section-rule" aria-hidden="true" />{{ t.makerSection.label }}</p>
            <p class="maker-big"><MakerLine /></p>
          </div>
          <div class="makers-side">
            <p>{{ t.makerSection.body }}</p>
            <ul>
              <li v-for="m in MAKER_LINKS" :key="m.name">
                <a :href="m.href" target="_blank" rel="noopener">{{ t.makerSection.visit }} {{ m.name }} <ArrowRight :size="16" aria-hidden="true" /></a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Progress -->
      <section id="progress" class="section">
        <div class="wrap split">
          <SectionHead :num="t.progress.num" :label="t.progress.label" :title="t.progress.title" />
          <ol class="toc">
            <li v-for="s in t.progress.steps" :key="s.t" :class="`is-${s.s}`">
              <span class="toc-title">{{ s.t }}</span>
              <span class="toc-leader" aria-hidden="true" />
              <span class="status"><i aria-hidden="true" />{{ s.st }}</span>
            </li>
          </ol>
        </div>
      </section>

      <!-- CTA -->
      <section class="cta">
        <div class="wrap cta-grid">
          <div>
            <h2>{{ t.cta.title }}</h2>
            <p>{{ t.cta.lead }}</p>
          </div>
          <WaitlistForm tone="dark" />
        </div>
      </section>
    </main>

    <footer class="colophon">
      <div class="wrap foot">
        <span>{{ t.foot }}</span>
        <MakerLine />
      </div>
    </footer>
  </div>
</template>
