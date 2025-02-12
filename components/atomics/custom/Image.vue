<script setup lang="ts">
import type { PrimitiveProps } from "radix-vue";
import type { ComponentPublicInstance, HTMLAttributes } from "vue";

type IProps = PrimitiveProps & {
  class?: string;
  imgClass?: HTMLAttributes["class"];
  placeholderClass?: string;
  overlayClass?: string;
  src: string;
  alt?: string;
  preload?: boolean;
  loading?: "lazy" | "eager";
  width?: string;
  height?: string;
  densities?: string;
  showSpinner?: boolean;
  showPlaceholder?: boolean;
  showOverlay?: boolean;
  usePadding?: boolean;
  effect?: "mirror";
  provider?: string;
  imgOnLoading?: string;
  hasAnimation?: boolean; // true/false: force to show/hide animation, undefined: skip animation if the image has loaded on mounted
  selfHost?: boolean;
};

const props = withDefaults(defineProps<IProps>(), {
  preload: false,
  loading: "lazy",
  width: "auto",
  height: "auto",
  showPlaceholder: true,
  showSpinner: false,
  showOverlay: false,
  usePadding: false,
  alt: "",
  imgOnLoading: "faded-logo.webp",
  hasAnimation: undefined,
  selfHost: false,
});

const IMAGE_DIR = "images";
const { $config } = useNuxtApp();

const imageRef = ref<ComponentPublicInstance>();

const isLoaded = ref(false);
const isCompletedOnMounted = ref(false);

const handleLoaded = () => {
  isLoaded.value = true;
};

const hasError = ref(false);
const handleError = () => {
  isLoaded.value = true;
  hasError.value = true;
  console.error(`Load image failed: ${props.src}`);
};

const customAlt = String(`${$config.public.BRAND_NAME} ${props.alt}`).trim();

const baseUrl = props.selfHost ? "" : $config.public.NUXT_APP_CDN_URL;
const customSrc = computed(() => {
  if (props.src.startsWith("http") || props.src.startsWith("blob")) return props.src;
  const src = props.src.startsWith("/") ? props.src.substring(1) : props.src;
  return `${baseUrl}/${IMAGE_DIR}/${src}`;
});

const checkImageLoaded = () => {
  if (imageRef.value?.$el.complete) {
    isCompletedOnMounted.value = true;
    isLoaded.value = true;
  }
};

const shouldShowAnimation = computed<boolean>(() => {
  if (props.hasAnimation !== undefined) return props.hasAnimation;
  return !isCompletedOnMounted.value;
});

onMounted(() => {
  checkImageLoaded();
});
</script>

<template>
  <div
    :class="cn('group relative overflow-hidden', props.class, isLoaded && props.effect)"
    :style="{
      width,
      paddingBottom: usePadding ? height : 0,
      height: usePadding ? 0 : height,
    }"
  >
    <NuxtImg
      ref="imageRef"
      :src="customSrc"
      :class="
        cn(
          'z-image h-full w-full object-cover opacity-100 transition-opacity duration-500',
          usePadding ? 'absolute' : 'relative',
          { 'opacity-0': !showPlaceholder && !isLoaded && shouldShowAnimation },
          imgClass,
        )
      "
      :alt="customAlt"
      :preload="preload"
      :loading="loading"
      :densities="densities"
      :provider="provider"
      @load="handleLoaded"
      @error="handleError"
    />

    <Transition :name="shouldShowAnimation ? 'fade' : undefined">
      <slot v-if="!isLoaded && showPlaceholder" name="placeholder-content">
        <div
          :class="
            cn(
              'absolute inset-0 z-image-placeholder flex h-full w-full items-center justify-center bg-neutral-700',
              placeholderClass,
            )
          "
        >
          <NuxtImg
            :src="`${$config.public.NUXT_APP_CDN_URL}/${IMAGE_DIR}/${imgOnLoading}`"
            alt="image-placeholder"
            width="103px"
            preload
            class="max-w-[70%]"
          />
        </div>
      </slot>
    </Transition>

    <slot v-if="!isLoaded && showSpinner" name="spinner">
      <div class="absolute left-1/2 top-1/2 z-image-spinner -translate-x-1/2 -translate-y-1/2">
        <LoadingSpinner />
      </div>
    </slot>

    <div
      v-if="isLoaded && showOverlay"
      :class="
        cn(
          'image-spinner absolute inset-0 z-image-overlay flex scale-75 items-center justify-center bg-[#060606]/70 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100',
          overlayClass,
        )
      "
    >
      <slot name="hovered-overlay" />
    </div>

    <slot name="sub" :is-loaded="isLoaded" />
  </div>
</template>

<style lang="scss" scoped>
@keyframes mirror {
  0% {
    left: -75%;
  }
  100% {
    left: 125%;
  }
}

.mirror {
  &::before {
    content: "";
    @apply invisible absolute top-0 z-image-overlay block h-full w-1/2 skew-x-[-25deg];
    background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 100%);
  }

  &:hover::before {
    @apply visible;
    animation: mirror 0.8s forwards;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
