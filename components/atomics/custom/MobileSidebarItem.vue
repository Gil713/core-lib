<script lang="ts" setup>
defineProps<{
  item: IMobileSidebarItem;
  isActive?: boolean;
}>();
</script>
<template>
  <NuxtLink
    class="flex w-full flex-col items-center justify-center bg-[#2A2E31] p-1"
    :class="{ 'active-bg rounded-r-lg': isActive }"
    :to="{ path: item.url, query: item.options?.[0]?.query }"
  >
    <div class="relative">
      <component :is="`svgo-${item.icon}`" class="relative z-20 text-4xl text-white" />
      <Image
        src="ellipse-dark.webp"
        class="absolute -bottom-1 left-1/2 z-10 -translate-x-1/2"
        width="36px"
        :show-placeholder="false"
      />
    </div>
    <p class="text-center text-xs font-medium capitalize" :class="[isActive ? 'text-white' : 'text-neutral-200']">
      {{ item.name }}
    </p>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.active-bg {
  background-image: url("/images/mb-menu-item-active.webp");
  @apply bg-cover bg-center bg-no-repeat;
}
</style>
