<script lang="ts" setup>
type IProps = {
  bonusStatisticItem: IBonusStatisticItem;
};

defineProps<IProps>();
</script>

<template>
  <Image :src="bonusStatisticItem.icon" width="40px" height="40px" class="mt-8" :alt="bonusStatisticItem.title" />
  <div class="text mt-2 text-base text-primary">{{ formatVNDCurrency(bonusStatisticItem.amount) }}</div>
  <span>
    <span class="text mt-2 text-sm text-neutral-200">{{ bonusStatisticItem.title }}</span>
    <span class="text-sm text-neutral-200">
      <slot name="cta" />
    </span>
  </span>
  <!--  bonusStatisticItem.descriptionHtml is static data, no chance to modify from external-->
  <div class="mt-1 text-xs text-neutral-300" v-html="bonusStatisticItem.descriptionHtml"></div>
</template>
