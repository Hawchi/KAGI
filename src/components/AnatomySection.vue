<template>
  <section id="anatomy">
    <div class="anatomy-sticky">
      <div class="anatomy-head wrap">
        <div>
          <p class="eyebrow">02 — ANATOMY <span class="amber">/ 解剖</span></p>
          <h2 class="h-sect">Six layers,<br />one satisfying whole.</h2>
        </div>
        <p class="anatomy-sub">Every custom keyboard is a quiet stack of parts. Scroll to pull it apart, layer by layer, and see what you're really building.</p>
      </div>

      <div class="layer-labels" id="layer-labels">
        <div
          v-for="layer in LAYERS"
          :key="layer.key"
          class="layer-label"
          :class="{ flip: layer.side === 'left', show: visibleLayers.has(layer.key) }"
          :style="getLabelStyle(layer)"
        >
          <span class="dot"></span>
          <span class="ll-line"></span>
          <span class="ll-text">
            <span class="idx">{{ layer.idx }}</span>
            <span class="nm">{{ layer.n }}<span class="jp">{{ layer.jp }}</span></span>
            <span class="ds">{{ layer.d }}</span>
          </span>
        </div>
      </div>

      <div class="anatomy-progress" aria-hidden="true"> 
        <span class="bar" :style="{ width: progress * 100 + '%' }"></span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { LAYERS } from '../data/keyboard.js'
import { useScene } from '../composables/useScene.js'

const progress = ref(0)
const visibleLayers = ref(new Set())
const labelStyles = ref({})

const scene = useScene()

const clamp = (v, a, b) => Math.min(b, Math.max(a, v))

function getLabelStyle(layer) {
  const style = labelStyles.value[layer.key] || {}
  return {
    left: style.x + 'px',
    top: style.y + 'px',
    transform: layer.side === 'left' ? 'translate(-100%, -50%)' : 'translate(0, -50%)',
  }
}

function onScroll() {
  const anatomy = document.getElementById('anatomy')
  if (!anatomy) return

  const vh = window.innerHeight
  const aTop = anatomy.offsetTop
  const aH = anatomy.offsetHeight
  const scroll = window.scrollY

  const run = aH - vh
  const p = clamp((scroll - aTop) / run, 0, 1)
  progress.value = p

  scene.setExplode(p)

  const aBottom = aTop + aH
  const fadeStart = aBottom - vh * 1.15
  const fadeEnd = aBottom - vh * 0.35
  const op = 1 - clamp((scroll - fadeStart) / (fadeEnd - fadeStart), 0, 1)
  const canvas = document.getElementById('kbd-canvas')
  if (canvas) {
    canvas.style.opacity = op.toFixed(3)
    scene.setRendering(op > 0.02)
  }

  const labelsActive = p > 0.04 && op > 0.05
  const newVisible = new Set()
  const newStyles = {}

  LAYERS.forEach(layer => {
    const show = labelsActive && p > layer.t
    if (show) {
      const pos = scene.layerScreen(layer.key)
      if (pos && pos.visible) {
        newVisible.add(layer.key)
        newStyles[layer.key] = pos
      }
    }
  })

  visibleLayers.value = newVisible
  labelStyles.value = newStyles
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>