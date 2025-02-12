<!-- use to validate form has at least submit when using FormField component for vee-validate 
example:
<FormField v-slot="{ componentField }" name="username">
  <FormItem>
    <FormLabel>Tên đăng nhập</FormLabel>
    <FormControl>
      <CustomFieldValidation name="componentField.name" />
    </FormControl>
    <FormMessage />
  </FormItem>  
</FormField> -->

<script setup lang="ts">
import { useSubmitCount } from "vee-validate";
type ICustomFieldProps = {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  className?: string;
};
const submittedCount = useSubmitCount();
defineProps<ICustomFieldProps>();
const isSubmitted = computed(() => {
  return submittedCount?.value > 0;
});
</script>

<template>
  <FormField
    v-slot="{ componentField }"
    :name="name"
    :validate-on-input="isSubmitted"
    :validate-on-change="isSubmitted"
    :validate-on-model-update="isSubmitted"
    :validate-on-blur="isSubmitted"
  >
    <FormItem>
      <FormLabel>{{ label }}</FormLabel>
      <FormControl>
        <slot :component-field="componentField">
          <Input
            v-bind="componentField"
            :type="type || 'text'"
            :placeholder="placeholder || ''"
            :class="className || 'h-12'"
          />
        </slot>
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
