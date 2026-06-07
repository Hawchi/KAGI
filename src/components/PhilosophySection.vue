<template>
  <section id="philosophy">
    <div class="wrap philosophy-inner">
      <p class="eyebrow reveal">03 — WHY BUILD</p>
      <p class="big-quote reveal">
        It's the one tool you touch all day. 
        <span class="mute">A custom board isn't about specs. It's about making the thing under your fingers feel like</span> 
        <span class="amber-text"> yours</span>.
      </p>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

const reveals = []

function checkReveals() {
  const vh = window.innerHeight
  reveals.forEach((el, i) => {
    const r = el.getBoundingClientRect()
    if (r.top < vh * 0.9) el.classList.add('in')
  })
}

onMounted(() => {
  document.querySelectorAll('#philosophy .reveal').forEach(el => reveals.push(el))
  window.addEventListener('scroll', checkReveals, { passive: true })
  checkReveals()
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkReveals)
})
</script>