<script setup lang="ts">
import { NuxtLink } from "#components";
import type { HTMLAttributes } from "vue";

type ICategoryTabProps = {
  categoryTabs: ICommonTab[];
  class?: HTMLAttributes["class"];
  tabContainerClass?: HTMLAttributes["class"];
  tabContentClass?: HTMLAttributes["class"];
  iconClass?: HTMLAttributes["class"];
  isPrefixMatch?: boolean;
  autoScrollToValue?: string;
};

const scrollContainerId = "scroll-container";

const props = withDefaults(defineProps<ICategoryTabProps>(), {
  isPrefixMatch: false,
});

const isDisabled = (url?: string) => {
  return props.isPrefixMatch ? useRoute().path.startsWith(url || "") : useRoute().path === url;
};

const scrollElementToCenter = (element: HTMLElement): void => {
  const scrollContainer = document.getElementById(scrollContainerId);
  if (!scrollContainer) return;
  const containerRect = scrollContainer.getBoundingClientRect();
  const itemRect = element.getBoundingClientRect();
  const scrollOffset = itemRect.left - containerRect.left + scrollContainer.scrollLeft;
  const centerOffset = scrollOffset - (containerRect.width - itemRect.width) / 2;
  scrollContainer.scrollTo({ left: centerOffset, behavior: "smooth" });
};

const scrollToCurrentItem = (): void => {
  const scrollContainer = document.getElementById(scrollContainerId);
  if (!scrollContainer) return;
  const targetElement = Array.from(scrollContainer?.children).find(
    (child) => (child as HTMLElement).dataset.id === props.autoScrollToValue,
  ) as HTMLElement | undefined;

  if (targetElement) {
    scrollElementToCenter(targetElement);
  }
};

const scrollToItem = (event: MouseEvent): void => {
  const targetItem = event.currentTarget as HTMLElement;
  if (targetItem) scrollElementToCenter(targetItem);
};

// Handle auto scroll to current item when reload page
onMounted(() => nextTick(() => scrollToCurrentItem()));
</script>

<template>
  <TabsList
    :id="scrollContainerId"
    :class="cn('overflow-hidden rounded-none rounded-tl-md rounded-tr-md p-0', props.class)"
  >
    <TabsTrigger
      v-for="tab in categoryTabs"
      :key="tab.value"
      :as="NuxtLink"
      :value="tab.value"
      :data-id="tab.value"
      :to="tab.url"
      :class="
        cn(
          'rounded-none border-b-0 bg-[#FFFFFF12] hover:bg-primary-400 data-[state=active]:border-[transparent] data-[state=active]:bg-primary-400',
          props.tabContainerClass,
          { 'pointer-events-none': isDisabled(tab.url) },
        )
      "
      @click="scrollToItem($event)"
    >
      <span :class="cn('flex flex-row items-center gap-1 text-base font-semibold text-white', props.tabContentClass)">
        <Image v-if="tab.icon" :src="tab.icon" :class="cn('min-h-7 min-w-7', iconClass)" />
        {{ tab.name }}
      </span>
    </TabsTrigger>
  </TabsList>
</template>
