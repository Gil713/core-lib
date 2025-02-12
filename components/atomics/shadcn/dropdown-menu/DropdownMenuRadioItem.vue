<script setup lang="ts">
import { Circle } from "lucide-vue-next";
import {
  DropdownMenuItemIndicator,
  DropdownMenuRadioItem,
  type DropdownMenuRadioItemEmits,
  type DropdownMenuRadioItemProps,
  useForwardPropsEmits,
} from "radix-vue";
import { computed, type HTMLAttributes } from "vue";

const props = defineProps<DropdownMenuRadioItemProps & { class?: HTMLAttributes["class"] }>();

const emits = defineEmits<DropdownMenuRadioItemEmits>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <DropdownMenuRadioItem
    v-bind="forwarded"
    :tabindex="undefined"
    :class="
      cn(
        'group flex min-h-10 cursor-pointer items-center justify-between border-l-2 border-l-transparent px-3.5 font-nunito text-sm font-normal text-neutral-300 hover:border-l-primary-300 hover:bg-neutral-600 hover:text-white focus:bg-neutral-600 focus:text-white data-[state=checked]:border-l-primary-300 data-[state=checked]:bg-neutral-600 data-[state=checked]:text-white',
        props.class,
      )
    "
  >
    <slot />
    <span
      class="ml-2.5 flex h-4 w-4 flex-none items-center justify-center rounded-full border border-neutral-400 group-data-[state=checked]:border-primary-400"
    >
      <DropdownMenuItemIndicator>
        <Circle class="fill-current h-2 w-2 fill-primary-300 stroke-primary-300" />
      </DropdownMenuItemIndicator>
    </span>
  </DropdownMenuRadioItem>
</template>
