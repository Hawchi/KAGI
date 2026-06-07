<template>
  <div id="cursor" :class="{ 'is-hot': cursorHot, 'is-down': cursorDown, 'is-hidden': cursorHidden }"></div>
  <div id="cursor-dot" :class="{ 'is-hidden': cursorHidden }"></div>

  <canvas ref="canvasRef" id="kbd-canvas"></canvas>

  <TheNav />

  <main id="top">
    <HeroSection @request-sound="handleSound" />
    <AnatomySection />
    <PhilosophySection />
    <PartsSection />
    <SoundsSection />
    <GuideSection />
  </main>

  <TheFooter />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useScene } from './composables/useScene.js'
import { useSound } from './composables/useSound.js'
import { useReveal } from './composables/useReveal.js'  // ← toevoegen

import TheNav from './components/TheNav.vue'
import HeroSection from './components/HeroSection.vue'
import AnatomySection from './components/AnatomySection.vue'
import PhilosophySection from './components/PhilosophySection.vue'
import PartsSection from './components/PartsSection.vue'
import SoundsSection from './components/SoundsSection.vue'
import GuideSection from './components/GuideSection.vue'
import TheFooter from './components/TheFooter.vue'

const canvasRef = ref(null)
const cursorHot = ref(false)
const cursorDown = ref(false)
const cursorHidden = ref(false)

const scene = useScene()
const { ensure, play } = useSound()
const reveal = useReveal()  // ← toevoegen

function handleSound(type) {
  play(type)
}

function initCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return
  const cur = document.getElementById('cursor')
  const dot = document.getElementById('cursor-dot')
  let x = innerWidth / 2, y = innerHeight / 2
  let cx = x, cy = y

  document.addEventListener('pointermove', e => {
    x = e.clientX; y = e.clientY
    dot.style.transform = `translate(${x}px, ${y}px)`
  })
  document.addEventListener('pointerdown', () => cursorDown.value = true)
  document.addEventListener('pointerup', () => cursorDown.value = false)
  document.addEventListener('mouseleave', () => cursorHidden.value = true)
  document.addEventListener('mouseenter', () => cursorHidden.value = false)
  document.addEventListener('pointerover', e => {
    cursorHot.value = !!e.target.closest('[data-hot], a, button')
  })

  ;(function ring() {
    cx += (x - cx) * 0.18
    cy += (y - cy) * 0.18
    cur.style.transform = `translate(${cx}px, ${cy}px)`
    requestAnimationFrame(ring)
  })()
}

onMounted(() => {
  reveal.init()  // ← toevoegen

  window.addEventListener('pointerdown', () => ensure(), { once: true })
  window.addEventListener('keydown', () => ensure(), { once: true })

  scene.init(canvasRef.value)
  initCursor()
})
</script>