<script setup lang="ts">
import { computed } from "vue";
import { type ICardCategoryVariants, cardCategoryVariants } from ".";
import { Primitive, type PrimitiveProps } from "radix-vue";

type IProps = PrimitiveProps & {
  prefix?: string;
  suffix?: string;
  title?: string;
  description?: string;
  isUnderMaintenance?: boolean;
  class?: string;
  width?: ICardCategoryVariants["width"];
};

const props = withDefaults(defineProps<IProps>(), {
  isUnderMaintenance: false,
  width: "auto",
  as: "div",
});

const cardClass = computed(() =>
  cardCategoryVariants({
    width: props.width,
    class: props.class,
  }),
);
</script>

<template>
  <Primitive :class="`${cardClass} p-2`" :as="as">
    <div v-if="isUnderMaintenance" class="absolute right-0 top-0">
      <slot name="suffix-top">
        <div class="h-max min-w-12 rounded-bl-lg bg-background-disable px-2 text-xs font-bold text-primary">
          Bảo trì
        </div>
      </slot>
    </div>

    <div class="flex w-full items-center justify-between gap-2">
      <div class="flex items-center gap-2">
        <slot v-if="prefix" name="prefix">
          <Image
            :src="prefix"
            height="25px"
            width="25px"
            :style="{ filter: isUnderMaintenance ? 'grayscale(1)' : 'none' }"
          />
        </slot>

        <div>
          <slot v-if="title" name="title">
            <div class="text-sm font-semibold" :class="isUnderMaintenance ? 'text-disable' : 'text-primary'">
              {{ title }}
            </div>
          </slot>
          <slot v-if="description" name="description">
            <p class="text-xs" :class="isUnderMaintenance ? 'text-disable' : 'text-neutral-200'">
              {{ description }}
            </p>
          </slot>
        </div>
      </div>

      <div v-if="suffix">
        <slot name="suffix">
          <Image :src="suffix" height="25px" width="25px" />
        </slot>
      </div>
    </div>
  </Primitive>
</template>

<style scoped></style>
