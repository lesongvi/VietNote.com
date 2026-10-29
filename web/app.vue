<script setup lang="ts">
const { t, locale, toggle } = useCopy()
</script>

<template>
  <div class="shell">
    <header class="nav">
      <a class="logo" href="#"><span class="logo-mark">V</span> VietNote</a>
      <nav class="nav-links" aria-label="Main">
        <a href="#features">{{ t.navFeatures }}</a>
        <a href="#progress">{{ t.navProgress }}</a>
        <a href="#join">{{ t.navJoin }}</a>
      </nav>
      <button class="pill-btn" type="button" @click="toggle">{{ locale === 'vi' ? 'EN' : 'VI' }}</button>
    </header>

    <main>
      <section class="hero">
        <span class="badge">{{ t.badge }}</span>
        <h1>{{ t.h1a }}<br /><span class="grad">{{ t.h1b }}</span></h1>
        <p class="lead">{{ t.lead }}</p>
        <WaitlistForm />

        <div class="stage" aria-hidden="true">
          <div class="fcard c-note">
            <small>{{ t.noteSub }}</small>
            <h3>{{ t.note }}</h3>
            <ul><li>{{ t.n1 }}</li><li>{{ t.n2 }}</li><li>{{ t.n3 }}</li></ul>
          </div>
          <div class="fcard c-live">
            <small>{{ t.liveSub }}</small>
            <h3>{{ t.live }}</h3>
            <div class="wave"><i v-for="n in 28" :key="n" :style="{ animationDelay: `${(n % 9) * 0.11}s` }" /></div>
          </div>
          <div class="fcard c-chat">
            <small>{{ t.chatTitle }}</small>
            <div class="bubble">{{ t.chatQ }}</div>
            <div class="bubble me">{{ t.chatA }}</div>
          </div>
          <div class="fcard c-todo">
            <small>{{ t.todoSub }}</small>
            <h3>{{ t.todo }}</h3>
            <span class="tag">{{ t.tag }}</span>
          </div>
        </div>
      </section>

      <section id="features" class="section">
        <h2>{{ t.fTitle }}</h2>
        <p>{{ t.fSub }}</p>
        <div class="grid">
          <article v-for="f in t.feats" :key="f.t" class="feat">
            <div class="ico">{{ f.i }}</div>
            <h3>{{ f.t }}</h3>
            <p>{{ f.d }}</p>
          </article>
        </div>
      </section>

      <section id="progress" class="section">
        <h2>{{ t.pTitle }}</h2>
        <p>{{ t.pSub }}</p>
        <div class="progress">
          <div v-for="s in t.steps" :key="s.t" class="step" :class="s.s">
            <span class="dot" /><div><b>{{ s.t }}</b><span>{{ s.d }}</span></div>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer"><span>{{ t.foot }}</span><span>vietnote.com</span></footer>
  </div>
</template>
