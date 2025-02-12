<script setup lang="ts">
//TODO: Meidai refactor to use shadcn breadcumb
import type { IBreadcrumb } from "~/components/atomics/custom/breadcumb/type";

type IProps = {
  breadcrumbs: IBreadcrumb[];
};

defineProps<IProps>();
</script>

<template>
  <div class="flex items-center text-base font-normal text-primary">
    <template v-for="(item, index) in breadcrumbs" :key="index">
      <NuxtLink
        v-if="item.url && breadcrumbs.length - 1 !== index"
        class="cursor-pointer text-neutral-300 hover:text-primary"
        :to="item.url"
      >
        {{ item.label }}
      </NuxtLink>
      <span v-else>
        {{ item.label }}
      </span>
      <span v-if="index < breadcrumbs.length - 1" class="px-3 text-neutral-300">|</span>
    </template>
  </div>
</template>
