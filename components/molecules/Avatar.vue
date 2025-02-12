<script setup lang="ts">
const props = defineProps({
  class: {
    type: String,
  },
  avatarImg: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <div :class="cn('relative h-10 w-10', props.class)">
    <Image :src="avatarImg" width="40px" height="40px" class="absolute z-10 rounded-full" />
    <Image src="hamburger.webp" width="16px" height="16px" class="absolute bottom-0 right-0 z-20" :preload="true" />
  </div>
</template>
