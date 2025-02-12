<script lang="ts" setup>
import { IMaskComponent } from "vue-imask";
import type { PropType } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    default: "",
  },
  maxLength: {
    type: Number,
    default: undefined,
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
  thousandsSeparator: {
    type: String,
    default: ",",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  validateOnChange: {
    type: Boolean,
    default: false,
  },
});

const { handleChange } = useField(props.name);
const submittedCount = useSubmitCount();

defineEmits<{
  (e: "update:modelValue", payload: string | number): void;
}>();
const inputValue = defineModel("modelValue", {
  type: [String, Number] as PropType<string | number>,
  required: true,
  get(val: string | number) {
    return val || undefined;
  },
});

const elWrapperInput = ref<HTMLInputElement | undefined>(undefined);

const initWidthInput = () => {
  nextTick(() => {
    const elPrefix = elWrapperInput.value?.querySelector(".prefix.flex") as HTMLElement;
    const elSuffix = elWrapperInput.value?.querySelector(".suffix.flex") as HTMLElement;
    const elInput = (elWrapperInput.value?.querySelector("input") as HTMLElement) ?? { style: {} };
    elInput.style.paddingRight = `${elSuffix?.offsetWidth ?? 12}px`;
    elInput.style.paddingLeft = `${elPrefix?.offsetWidth ?? 12}px`;
  });
};

onMounted(() => {
  initWidthInput();
});

const onAcceptNumberTyped = (value: number) => {
  initWidthInput();
  if (!props.validateOnChange) {
    handleChange(value, submittedCount.value > 0);
  } else {
    handleChange(value);
  }
};

const handleFocus = (e: Event) => {
  (e.target as HTMLInputElement)?.setAttribute("placeholder", "");
};

const handleBlur = (e: Event) => {
  (e.target as HTMLInputElement)?.setAttribute("placeholder", props.placeholder);
};
</script>
<template>
  <div ref="elWrapperInput" :class="cn('relative h-12 w-full', `flex items-center`, props.class)">
    <div v-if="$slots.prefix" :class="cn('prefix', 'z-1 absolute left-0 top-0 flex h-full items-center px-3')">
      <slot name="prefix" />
    </div>
    <IMaskComponent
      v-model:typed="inputValue"
      :class="
        cn(
          'file:bg-transparent flex h-10 w-full rounded-lg border border-input-border bg-input-bg px-3 py-2 text-sm font-normal ring-offset-input-focus-border',
          'text-text-primary file:border-0 file:text-sm file:font-medium placeholder:text-text-secondary focus-visible:bg-input-focus-bg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-input-focus-border disabled:cursor-not-allowed disabled:opacity-50',
          props.class,
        )
      "
      :placeholder="placeholder"
      :disabled="disabled"
      :mask="Number"
      :maxlength="maxLength"
      :thousands-separator="thousandsSeparator"
      @accept:typed="onAcceptNumberTyped"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <div v-if="$slots.suffix" :class="cn('suffix', 'z-1 absolute right-0 top-0 flex h-full items-center px-3')">
      <slot name="suffix" />
    </div>
  </div>
</template>
