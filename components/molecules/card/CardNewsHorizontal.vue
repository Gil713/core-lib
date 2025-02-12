<script lang="ts" setup>
import type { PrimitiveProps } from "radix-vue";
import type { HTMLAttributes } from "vue";

type IProps = PrimitiveProps & {
  class?: HTMLAttributes["class"];
  url: string;
  alt?: string;
  thumbnail: string;
  title: string;
  description: string;
  datePublished?: string;
  showBottomDivider?: boolean;
  showTopDivider?: boolean;
  topDividerClass?: HTMLAttributes["class"];
};

const props = withDefaults(defineProps<IProps>(), {});

const datePublishedTimeParts = computed(() => (props.datePublished ? getDateTimeForNews(props.datePublished) : []));
const [hour, date] = datePublishedTimeParts.value;
</script>

<template>
  <NewsDivider v-if="showTopDivider" :class="cn('my-4', topDividerClass)" />
  <NuxtLink :to="props.url" :class="cn('flex gap-3 md:min-h-[137px] md:gap-4', props.class)">
    <div>
      <Image
        :src="thumbnail"
        :alt="alt || title"
        width="revert-layer"
        class="aspect-[240/138] w-[165px] rounded-xl md:w-60"
        effect="mirror"
      />
    </div>
    <div>
      <CardTitle class="line-clamp-3 text-primary md:line-clamp-2 md:font-semibold md:text-primary">
        {{ title }}
      </CardTitle>
      <CardDescription class="line-clamp-2 text-xs md:line-clamp-3 md:text-sm">{{ description }}</CardDescription>
      <CardDatePublished v-if="datePublishedTimeParts.length" class="hidden md:flex">
        <span>{{ hour }}</span>
        <span>{{ date }}</span>
      </CardDatePublished>
    </div>
  </NuxtLink>
  <NewsDivider v-if="showBottomDivider" />
</template>
