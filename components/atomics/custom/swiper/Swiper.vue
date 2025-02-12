<script setup lang="ts">
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { Swiper } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import type { SwiperOptions } from "swiper/types";

const props = defineProps({
  options: {
    type: Object as PropType<SwiperOptions>,
    default: () => {},
  },
  showNavigation: {
    type: Boolean,
    default: false,
  },
});

const defaultModules = [Autoplay, Pagination, Navigation];
const defaultOptions: Partial<SwiperOptions> = reactive({
  grabCursor: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  autoplay: false,
  pagination: false,
  loop: true,
  slidesPerView: 1,
  slidesPerGroup: 1,
  centeredSlides: false,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const swiperOptions = computed<any>(() => {
  return {
    ...defaultOptions,
    ...props.options,
    modules: [...defaultModules, ...(props.options?.modules || [])],
  };
});

const emit = defineEmits(["slideChange"]);
</script>

<template>
  <Swiper v-bind="swiperOptions" @slide-change="emit('slideChange', $event)">
    <slot />

    <slot v-if="showNavigation" name="navigation">
      <div class="container absolute bottom-[30px] left-1/2 z-10 flex -translate-x-1/2 transform gap-2">
        <button class="swiper-button-prev h-7 w-7 rounded-md bg-neutral-700 text-center">
          <SvgoArrow class="m-auto rotate-180 text-xl text-white" />
        </button>

        <button class="swiper-button-next h-7 w-7 rounded-md bg-neutral-700 text-center">
          <SvgoArrow class="m-auto text-xl text-white" />
        </button>
      </div>
    </slot>
  </Swiper>
</template>

<style lang="scss" scoped>
.swiper-button-disabled {
  @apply cursor-not-allowed opacity-50;
}

:deep(.swiper-pagination) {
  @apply bottom-0 left-4 text-left;
}

:deep(.swiper-pagination-bullet) {
  @apply h-1.5 w-1.5 gap-1 bg-white opacity-30;
  margin: 0 2px !important;
}

:deep(.swiper-pagination-bullet-active) {
  @apply bg-[#0d66cc] opacity-100;
}
</style>
