<template>
  <HeroSection />
  <AnatomySection />
  <PhilosophySection />
  <PartsSection />
  <SoundsSection />
  <GuideSection />
</template>

<script setup>
import { onMounted } from 'vue'
import { useReveal } from '../composables/useReveal.js'

import HeroSection from '../components/HeroSection.vue'
import AnatomySection from '../components/AnatomySection.vue'
import PhilosophySection from '../components/PhilosophySection.vue'
import PartsSection from '../components/PartsSection.vue'
import SoundsSection from '../components/SoundsSection.vue'
import GuideSection from '../components/GuideSection.vue'

const reveal = useReveal()

onMounted(() => {
  reveal.init()
})
</script>