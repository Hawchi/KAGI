<template>
  <section id="hero">
    <div class="hero-watermark kanji" aria-hidden="true">鍵</div>
    <div class="hero-inner wrap">
      <p class="eyebrow reveal">鍵 — KAGI <span class="amber">/ THE CUSTOM KEYBOARD, FELT</span></p>
      <h1 class="display reveal">Build a keyboard<br />you can <span class="amber-text">feel</span>.</h1>
      <p class="lead reveal">A calm, hands-on guide to your first custom mechanical keyboard, switch by switch, sound by sound. Move your cursor. The board is listening.</p>
      <div class="hero-cta reveal">
        <button class="key-btn primary" data-hot @click="scrollTo('#anatomy')">
          Take it apart <span class="arrow">↓</span>
        </button>
        <button class="key-btn" data-hot @click="scrollTo('#sounds')">
          Hear the switches
        </button>
      </div>
    </div>
    <div class="scroll-cue reveal" data-hot @click="scrollTo('#anatomy')">
      <span class="mono-label">Scroll</span>
      <span class="cue-line"></span>
    </div>
    <div class="hero-meta">
      <span class="mono-label">001 — 60% LAYOUT</span>
      <span class="mono-label">REAL-TIME · WEBGL</span>
    </div>
  </section>
</template>

<script setup>
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

function scrollTo(selector) {
  const el = document.querySelector(selector)
  if (el) el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
}
</script>