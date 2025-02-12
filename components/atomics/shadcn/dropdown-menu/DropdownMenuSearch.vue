<script setup lang="ts">
import type { PrimitiveProps } from "radix-vue";
import type { HTMLAttributes } from "vue";
import SearchIcon from "~/assets/icons/search.svg";

type IProps = PrimitiveProps & {
  placeholder?: string;
  class?: HTMLAttributes["class"];
  modelValue: string | number;
  iconPosition?: "left" | "right";
};

const props = withDefaults(defineProps<IProps>(), {
  modelValue: "",
  iconPosition: "left",
});

const inputValue = defineModel("modelValue", {
  type: [String, Number] as PropType<string | number>,
  required: true,
});
</script>

<template>
  <div class="p-2">
    <InputText
      v-model="inputValue"
      name="search"
      type="text"
      :placeholder="placeholder"
      :class="cn('h-[40px]', props.class)"
    >
      <template v-if="iconPosition === 'left'" #prefix>
        <SearchIcon />
      </template>

      <template v-if="iconPosition === 'right'" #suffix>
        <SearchIcon />
      </template>
    </InputText>
  </div>
</template>
