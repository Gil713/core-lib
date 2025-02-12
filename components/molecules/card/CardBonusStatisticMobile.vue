<script lang="ts" setup>
type IProps = {
  bonusStatisticItem: IBonusStatisticItem;
};

defineProps<IProps>();
</script>

<template>
  <div class="flex min-h-14 items-center">
    <Image :src="bonusStatisticItem.icon" width="32px" height="32px" :alt="bonusStatisticItem.title" />
    <div class="flex flex-1 flex-col content-center justify-center pl-2 pr-3">
      <span class="text text-sm text-primary">{{ bonusStatisticItem.title }}</span>
      <!--  bonusStatisticItem.descriptionHtml is static data, no chance to modify from external-->
      <div
        v-if="bonusStatisticItem.descriptionHtml"
        class="mt-[3px] text-2xs text-neutral-300"
        v-html="bonusStatisticItem.descriptionHtml"
      ></div>
    </div>
    <div class="flex h-full flex-col items-end justify-center whitespace-nowrap">
      <span class="text text-sm text-primary">
        <span>{{ formatVNDCurrency(bonusStatisticItem.amount, { currencySymbol: CurrencySymbolEnum.NONE }) }}</span>
        <span class="ml-1 text-xs text-neutral-300">{{ CurrencySymbolEnum.VND }}</span>
      </span>
      <slot name="cta" />
    </div>
  </div>
</template>
