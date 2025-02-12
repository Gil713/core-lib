<script setup lang="ts">
import type { HTMLAttributes } from "vue";

type IProps = {
  icon?: string;
  title?: string;
  description?: string;
  class?: HTMLAttributes["class"];
  titleClass?: HTMLAttributes["class"];
  descriptionClass?: HTMLAttributes["class"];
  iconClass?: HTMLAttributes["class"];
};

const props = withDefaults(defineProps<IProps>(), {
  icon: "empty.webp",
  title: "Dữ liệu đang cập nhật",
});
</script>

<template>
  <div class="flex flex-col" :class="props.class">
    <Image width="100px" height="100px" :src="icon" alt="icon empty" :class="iconClass" />
    <div v-if="title" :class="cn('mt-2 text-base font-normal leading-[22px] text-primary', titleClass)">
      {{ title }}
    </div>
    <div v-if="description" :class="cn('text-center text-base font-normal text-neutral-300', descriptionClass)">
      {{ description }}
    </div>
    <slot name="cta" />
  </div>
</template>
