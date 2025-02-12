<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import type { PrimitiveProps } from "radix-vue";

type IProps = PrimitiveProps & {
  class?: HTMLAttributes["class"];
  url: string;
  title: string;
  thumbnail: string;
  alt?: string;
};

const props = withDefaults(defineProps<IProps>(), {});
</script>

<template>
  <NuxtLink :to="props.url" :class="cn('block', props.class)">
    <Image :src="thumbnail" :alt="alt || title" class="rounded-lg" effect="mirror" />
    <CardTitle class="mt-2 line-clamp-2 md:mt-3">{{ title }}</CardTitle>
  </NuxtLink>
</template>
