<script lang="ts" setup>
const props = defineProps({
  isIconLeft: {
    type: Boolean,
    default: false,
  },
  class: {
    type: String,
    default: "",
  },
  icon: {
    type: [String, Object],
    required: true,
  },
  value: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div :class="cn('relative h-11 w-full items-center', props.class)">
    <DropdownMenuRadioItem
      :value="props.value"
      :class="
        cn(
          isIconLeft && 'pl-[50px]',
          'h-full',
          'font-nunito text-sm font-normal text-primary',
          'inset-0 after:absolute after:left-0 after:top-0 after:z-200 after:h-full after:w-[2px] after:bg-tab-payment-fgActive after:content-[\'\'] hover:bg-white/5 data-[state=checked]:bg-white/5 data-[state=checked]:after:block data-[state=unchecked]:after:hidden',
        )
      "
      >{{ label }}
    </DropdownMenuRadioItem>
    <span
      class="absolute inset-y-0 flex items-center justify-center pl-[10px] pr-2"
      :class="isIconLeft ? 'start-0' : 'end-0'"
    >
      <template v-if="typeof icon === 'string'">
        <Image :src="icon" height="32px" width="32px" />
      </template>
      <template v-else>
        <component :is="icon" />
      </template>
    </span>
  </div>
</template>
