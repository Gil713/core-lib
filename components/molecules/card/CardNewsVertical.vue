<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import type { PrimitiveProps } from "radix-vue";

type IProps = PrimitiveProps & {
  class?: HTMLAttributes["class"];
  url: string;
  alt?: string;
  thumbnail: string;
  title: string;
  description?: string;
  datePublished?: string;
  thumbnailClass?: HTMLAttributes["class"];
  titleClass?: HTMLAttributes["class"];
  descriptionClass?: HTMLAttributes["class"];
  datePublishedClass?: HTMLAttributes["class"];
};

const props = withDefaults(defineProps<IProps>(), {});

const datePublishedTimeParts = computed(() => (props.datePublished ? getDateTimeForNews(props.datePublished) : []));
const [hour, date] = datePublishedTimeParts.value;
</script>

<template>
  <NuxtLink :to="props.url" :class="cn('block', props.class)">
    <Image
      :src="thumbnail"
      :alt="alt || title"
      :class="cn('aspect-[240/138] min-w-[240px] rounded-xl', thumbnailClass)"
      effect="mirror"
    />
    <CardTitle
      :class="
        cn(
          'mt-2 line-clamp-2 font-semibold text-primary md:text-2xl md:font-bold md:leading-10 md:text-primary',
          titleClass,
        )
      "
    >
      {{ title }}
    </CardTitle>
    <CardDescription v-if="description" :class="cn('mt-3 line-clamp-2 md:mt-1 md:line-clamp-3', descriptionClass)">{{
      description
    }}</CardDescription>
    <CardDatePublished v-if="datePublishedTimeParts.length" :class="cn('mt-2', datePublishedClass)">
      <span>{{ hour }}</span>
      <span>{{ date }}</span>
    </CardDatePublished>
  </NuxtLink>
</template>
