<template>
  <nav class="nav" :class="{ scrolled: isScrolled }" id="nav">
    <a class="brand" href="#top" data-hot>
      <span class="mark kanji">鍵</span>
      <span class="name">KAGI</span>
    </a>
    <div class="links">
      <a href="#anatomy" data-hot>Anatomy</a>
      <a href="#parts" data-hot>Parts</a>
      <a href="#sounds" data-hot>Sounds</a>
      <a href="#guide" data-hot>Guide</a>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)

function onScroll() {
  isScrolled.value = window.scrollY > 40
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>