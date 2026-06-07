<template>
  <section id="parts">
    <div class="wrap">
      <div class="sect-head reveal">
        <div>
          <p class="eyebrow">04 — THE PARTS <span class="amber">/ 部品</span></p>
          <h2 class="h-sect">Know every piece.</h2>
        </div>
        <p class="mute" style="max-width:34ch">Hover a component to learn what it does and why it matters for feel and sound.</p>
      </div>

      <div class="parts-grid">
        <div
          v-for="(part, i) in PARTS"
          :key="part.n"
          class="part-card reveal"
          :style="{ transitionDelay: (i % 3) * 0.07 + 's' }"
        >
          <div class="pc-media">
            <span class="pc-num">{{ String(i + 1).padStart(2, '0') }}</span>
            <img :src="part.img" :alt="part.n" class="pc-img" />
          </div>
          <div class="pc-body">
            <div class="pc-name">
              {{ part.n }} <span class="jp">{{ part.jp }}</span>
            </div>
            <p class="pc-desc">{{ part.d }}</p>
            <div class="pc-tag">{{ part.k }} · <b>{{ part.v }}</b></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { PARTS } from '../data/keyboard.js'
</script>