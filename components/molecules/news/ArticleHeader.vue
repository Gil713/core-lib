<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import type { IBreadcrumb } from "~/components/atomics/custom/breadcumb/type";

type IProps = {
  class?: HTMLAttributes["class"];
  title?: string;
  datePublished?: string;
  datePublishedClass?: HTMLAttributes["class"];
  titleClass?: HTMLAttributes["class"];
  breadcrumbs?: IBreadcrumb[];
};

const props = withDefaults(defineProps<IProps>(), {});

const datePublishedTimeParts = computed(() => (props.datePublished ? getDateTimeForNews(props.datePublished) : []));
const [hour, date] = datePublishedTimeParts.value;
</script>

<template>
  <div :class="cn('mb-2', props.class)">
    <Breadcrumb v-if="breadcrumbs?.length" class="mb-4" :breadcrumbs="breadcrumbs ?? []" />
    <CardTitle :class="cn('line-clamp-2 font-bold text-primary md:text-base md:text-primary', titleClass)">
      {{ title }}
    </CardTitle>
    <CardDatePublished v-if="datePublishedTimeParts.length" :class="cn('mt-2', datePublishedClass)">
      <span>{{ hour }}</span>
      <span>{{ date }}</span>
    </CardDatePublished>
  </div>
</template>
