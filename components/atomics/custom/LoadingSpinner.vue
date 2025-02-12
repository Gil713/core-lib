<script lang="ts" setup>
import type { HTMLAttributes } from "vue";

type IProps = {
  position?: "center";
  class?: HTMLAttributes["class"];
  width?: string;
};

const props = withDefaults(defineProps<IProps>(), {
  position: "center",
  width: "100%",
});
</script>

<template>
  <div :class="cn({ 'flex h-full w-full items-center justify-center': position === 'center' }, props.class)">
    <SvgoSpinner class="h-full max-h-10 max-w-10 animate-spin" :font-controlled="false" filled :style="{ width }" />
  </div>
</template>
