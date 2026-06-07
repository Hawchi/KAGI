<template>
  <footer class="footer">
    <div class="wrap footer-inner">
      <div class="footer-brand">
        <span class="mark kanji">鍵</span>
        <div>
          <p class="name">KAGI</p>
          <p class="mono-label">THE CUSTOM KEYBOARD, FELT</p>
        </div>
      </div>
      <div class="footer-cols">
        <div>
          <p class="mono-label mute">EXPLORE</p>
          <a href="#anatomy" data-hot>Anatomy</a>
          <a href="#parts" data-hot>Parts</a>
          <a href="#sounds" data-hot>Sounds</a>
          <a href="#guide" data-hot>Guide</a>
        </div>
        <div>
          <p class="mono-label mute">MADE WITH</p>
          <span class="mute">Vue 3 · Three.js</span>
          <span class="mute">Web Audio · WebGL</span>
        </div>
      </div>
      <p class="footer-note mono-label">鍵 — "key". Built for the curious. © 2026 KAGI</p>
    </div>
  </footer>
</template>

<script setup>
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

function scrollTo(selector) {
  const el = document.querySelector(selector)
  if (el) el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
}
</script>