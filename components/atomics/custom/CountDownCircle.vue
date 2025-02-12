<script setup lang="ts">
const props = defineProps({
  duration: { type: Number, required: true }, //ms
  radius: { type: Number, default: 10 },
  class: { type: String, required: false },
  isPaused: { type: Boolean, default: false },
});

const diameter = computed(() => props.radius * 2);
const circumference = computed(() => 2 * Math.PI * (props.radius - 2));
</script>

<template>
  <div
    :class="cn('countdown relative stroke-white', props.class)"
    :style="{ width: `${diameter}px`, height: `${diameter}px` }"
  >
    <svg class="absolute inset-0 h-full w-full -rotate-90">
      <circle
        :r="props.radius - 2"
        :cx="props.radius"
        :cy="props.radius"
        :style="{
          strokeDasharray: `${circumference}px`,
          strokeDashoffset: `${circumference}px`,
          strokeLinecap: 'round',
          strokeWidth: '2px',
          stroke: 'inherit',
          fill: 'none',
          animation: `countdown ${duration}ms linear forwards`,
          'animation-play-state': isPaused ? 'paused' : 'running',
        }"
      />
    </svg>
  </div>
</template>

<style>
@keyframes countdown {
  to {
    stroke-dashoffset: 0px;
  }
}
</style>
