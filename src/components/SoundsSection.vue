<template>
  <section id="sounds">
    <div class="wrap">
      <div class="sect-head reveal">
        <div>
          <p class="eyebrow">05 — THE SOUND <span class="amber">/ 音</span></p>
          <h2 class="h-sect">Listen before<br />you build.</h2>
        </div>
        <p class="mute" style="max-width:34ch">Three switch families, recorded live. Tap one or just start typing on your real keyboard.</p>
      </div>

      <div class="sound-stage reveal">
        <div class="viz-wrap">
          <canvas ref="vizRef" class="viz"></canvas>
          <div class="viz-readout">
            <span class="mono-label" style="color: var(--amber)">{{ currentSwitch.n.toUpperCase() }}</span>
            <span class="mono-label mute">{{ currentSwitch.jp }}</span>
          </div>
          <div class="viz-hint mono-label">TYPE ANYWHERE TO PLAY ↓</div>
        </div>

        <div class="switch-rack">
          <button
            v-for="sw in SWITCHES"
            :key="sw.id"
            class="switch-key"
            :class="{ active: current === sw.id, pressed: pressedId === sw.id }"
            data-hot
            @click="selectSwitch(sw.id)"
          >
            <span class="sk-dot" :style="{ background: sw.dot }"></span>
            <div class="sk-name">{{ sw.n }}</div>
            <div class="sk-jp">{{ sw.jp }}</div>
            <div class="sk-sound">▸ {{ sw.sound }}</div>
          </button>
        </div>

        <div class="switch-detail">
          <div class="sd-block">
            <span class="k">Sound profile</span>
            <span class="v">{{ currentSwitch.sound.charAt(0) + currentSwitch.sound.slice(1).toLowerCase() }}, recorded live</span>
          </div>
          <div class="sd-block">
            <span class="k">Actuation force</span>
            <span class="v">{{ currentSwitch.force }}</span>
          </div>
          <div class="sd-block">
            <span class="k">Feel</span>
            <span class="v">{{ currentSwitch.feel }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { SWITCHES } from '../data/keyboard.js'
import { useSound } from '../composables/useSound.js'

const { ensure, play, stop, attachVisualizer } = useSound()

const current = ref('linear')
const pressedId = ref(null)
const vizRef = ref(null)
const isVisible = ref(false)

const currentSwitch = computed(() => SWITCHES.find(s => s.id === current.value))

function selectSwitch(id) {
  current.value = id
  pressedId.value = id
  setTimeout(() => pressedId.value = null, 130)
}

const ignore = new Set(['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Tab', 'Escape'])

function onKeydown(e) {
  if (!isVisible.value) return
  if (e.repeat || ignore.has(e.key)) return
  if (e.target.matches('input, textarea')) return
  ensure()
  play(current.value)
}

function onKeyup(e) {
  if (ignore.has(e.key)) return
  stop()
}

onMounted(() => {
  attachVisualizer(vizRef.value)
  window.addEventListener('pointerdown', () => ensure(), { once: true })
  window.addEventListener('keydown', onKeydown)
  window.addEventListener('keyup', onKeyup)

  const observer = new IntersectionObserver(
    entries => { isVisible.value = entries[0].isIntersecting },
    { threshold: 0.3 }
  )
  observer.observe(document.getElementById('sounds'))
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  window.removeEventListener('keyup', onKeyup)
})
</script>