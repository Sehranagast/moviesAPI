<template>
  <div class="container mx-auto px-6 py-7 lg:px-40 lg:py-14">
    <Header />

    <router-view v-slot="{ Component, route }">
      <transition
        :enter-active-class="route.meta.enterClass as string"
        :leave-active-class="route.meta.leaveClass as string"
        mode="out-in"
      >
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import Header from './components/Header.vue'

const props = defineProps({
  route: {
    type: Object,
    required: true
  }
})
</script>

<style></style>
