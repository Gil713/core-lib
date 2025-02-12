<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Primitive, type PrimitiveProps } from "radix-vue";
import { maintenanceStatusIndicatorBtnVariants, MaintenanceStatusIndicatorBtnStatusEnum } from ".";

type IProps = PrimitiveProps & {
  class?: HTMLAttributes["class"];
  img: string;
  isUnderMaintenance?: boolean;
  status?: MaintenanceStatusIndicatorBtnStatusEnum;
};

const props = withDefaults(defineProps<IProps>(), {
  as: "div",
  isUnderMaintenance: false,
  status: MaintenanceStatusIndicatorBtnStatusEnum.DEFAULT,
});

const btnClass = computed<string>(() =>
  maintenanceStatusIndicatorBtnVariants({
    status: props.status,
  }),
);
</script>

<template>
  <Primitive :as="as" :class="cn(btnClass, props.class)">
    <div v-if="isUnderMaintenance" class="absolute right-0 top-0">
      <div
        class="z-10 flex h-3.5 w-11 items-center justify-center rounded-bl-lg rounded-tr-lg bg-neutral-500 text-[8px] font-bold uppercase leading-3 text-text-primary"
      >
        Bảo trì
      </div>
    </div>
    <Image :src="img" height="24px" width="93px" :style="isUnderMaintenance && { filter: 'grayscale(1)' }" />
  </Primitive>
</template>
