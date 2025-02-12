<script lang="ts" setup>
import LockIcon from "~/assets/icons/lock.svg";
import EyeIcon from "~/assets/icons/eye.svg";
import { useSubmitCount } from "vee-validate";

const submittedCount = useSubmitCount();

const props = defineProps({
  type: {
    type: String,
    default: "text",
  },
  name: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: undefined,
  },
  class: {
    type: String,
    default: "",
  },
  classInput: {
    type: String,
    default: "",
  },
  minLength: {
    type: Number,
    default: undefined,
  },
  maxLength: {
    type: Number,
    default: undefined,
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

const [inputValue, modifiers] = defineModel("modelValue", {
  type: [String, Number] as PropType<string | number>,
  required: false,
  set(value: string | number) {
    if (modifiers.trim && typeof value === "string") {
      return value?.replace(/\s+/g, "");
    }
    return value;
  },
});

const elWrapperInput = ref<HTMLInputElement | null>(null);
const isVisible = ref<boolean>(false);

const onInputChange = () => {
  handleChange(inputValue.value, props.validateOnChange || submittedCount.value > 0);
};

const inputType = computed(() => (isVisible.value && props.type === "password" ? "text" : props.type));
const isPasswordType = computed(() => props.type === "password" || inputType.value === "password");

const icon = computed(() => {
  return isVisible.value ? LockIcon : EyeIcon;
});

defineExpose({
  focus: () => {
    const elInput = elWrapperInput.value?.querySelector("input") as HTMLElement;
    elInput?.focus();
  },
});
</script>
<template>
  <div
    ref="elWrapperInput"
    :class="
      cn(
        'relative flex h-12 w-full items-center rounded-lg border border-input-border bg-input-bg focus-within:border-input-focus-border',
        'has-[input:disabled]:border-input-disabled-border has-[input:disabled]:bg-input-disabled-bg',
        props.class,
      )
    "
  >
    <div v-if="$slots.prefix" :class="cn('prefix', 'flex flex-shrink-0 items-center px-3')">
      <slot name="prefix" />
    </div>
    <textarea
      v-model="inputValue"
      v-bind="$attrs"
      type="text"
      :placeholder="placeholder"
      :class="
        cn(
          'flex h-full w-full border-0 bg-[transparent] px-3 py-2 text-sm font-normal text-text-primary shadow-none outline-0 disabled:cursor-auto',
          'file:border-0 file:bg-[transparent] file:text-sm file:font-medium placeholder:text-text-placeholder',
          'focus:caret-primary-300',
          props.classInput,
        )
      "
      :minlength="minLength"
      :maxlength="maxLength"
      :disabled="disabled"
      @input="onInputChange"
    />
    <div v-if="$slots.suffix || isPasswordType" :class="cn('suffix', 'flex flex-shrink-0 items-center px-3')">
      <slot name="suffix">
        <component
          :is="icon"
          v-if="isPasswordType"
          role="button"
          class="text-xl text-text-placeholder"
          @click="isVisible = !isVisible"
        />
      </slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
input {
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}
</style>
