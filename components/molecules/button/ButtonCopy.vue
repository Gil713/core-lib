<script setup lang="ts">
import { Primitive, type PrimitiveProps } from "radix-vue";

type IProps = PrimitiveProps & {
  class?: string;
  classButton?: string;
  classIconCopy?: string;
  isButtonCopy?: boolean;
  copyText: string | number;
};

const emit = defineEmits(["copy"]);

const props = withDefaults(defineProps<IProps>(), {
  as: "div",
  isButtonCopy: false,
});

const handleCopy = async () => {
  await navigator.clipboard.writeText(String(props.copyText));
  emit("copy");
};
</script>

<template>
  <Primitive :as="as" :class="cn(props.class, 'cursor-pointer')" @click="handleCopy">
    <SvgoCopy v-if="!isButtonCopy" :class="cn('text-xl text-text-fgSecondary', props.classIconCopy)" />
    <Button
      v-else
      :class="
        cn('flex h-7 w-[78px] items-center justify-center gap-1 text-xs font-semibold leading-4', props.classButton)
      "
    >
      <SvgoCopy class="text-base" />
      <span>Copy</span>
    </Button>
  </Primitive>
</template>
