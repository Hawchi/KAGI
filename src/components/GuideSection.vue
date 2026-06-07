  <template>
  <section id="guide">
    <div class="wrap">

      <div class="guide-split">
        <div class="guide-split-text">
          <p class="eyebrow reveal">06 — START HERE <span class="amber">/ 入門</span></p>
          <h2 class="h-sect reveal">Want to build<br />one like this?</h2>
          <p class="lead reveal">Four calm steps. No soldering required. Just you, your parts, and a little patience.</p>
          <div class="reveal">
            <button class="key-btn primary" data-hot>Show me how →</button>
          </div>
        </div>

        <div class="guide-video-card reveal">
          <video ref="videoRef" loop playsinline src="/images/build.mp4"></video>
          <button class="video-unmute-btn" @click="toggleMute" data-hot>
            {{ muted ? '🔇' : '🔊' }}
          </button>
        </div>
      </div>

      <ol class="steps">
        <li
          v-for="(step, i) in STEPS"
          :key="i"
          class="step reveal"
          :style="{ transitionDelay: i * 0.06 + 's' }"
        >
          <div class="st-num">0{{ i + 1 }}</div>
          <div class="st-title">{{ step.t }}</div>
          <div class="st-text">{{ step.d }}</div>
        </li>
      </ol>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { STEPS } from '../data/keyboard.js'

const videoRef = ref(null)
const muted = ref(true)
let observer = null

function toggleMute() {
  muted.value = !muted.value
  videoRef.value.muted = muted.value
}

onMounted(() => {
  videoRef.value.muted = true

  observer = new IntersectionObserver(
    entries => {
      if (entries[0].isIntersecting) {
        videoRef.value?.play()
      } else {
        videoRef.value?.pause()
      }
    },
    { threshold: 0.3 }
  )
  observer.observe(document.getElementById('guide'))
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>