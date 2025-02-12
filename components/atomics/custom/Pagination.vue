<script lang="ts" setup>
import {
  PaginationList,
  Pagination,
  PaginationListItem,
  PaginationPrev,
  PaginationEllipsis,
  PaginationNext,
} from "@/components/atomics/shadcn/pagination";
import { type PaginationRootEmits, type PaginationRootProps, useForwardPropsEmits } from "radix-vue";
import { computed, type HTMLAttributes } from "vue";

type IPaginationProps = PaginationRootProps & { class?: HTMLAttributes["class"] };

const props = defineProps<IPaginationProps>();
const emits = defineEmits<PaginationRootEmits>();
const delegatedProps = computed(() => {
  const { ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <Pagination v-slot="{ page }" v-bind="forwardedProps" :sibling-count="1" show-edges>
    <PaginationList v-slot="{ items }" class="flex items-center gap-[6px]">
      <PaginationPrev class="h-9 w-9 border-none disabled:bg-[transparent]" />

      <template v-for="(item, index) in items">
        <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
          <Button class="h-10 w-10 p-0 text-base font-normal" :variant="item.value === page ? 'dark' : 'ghost'">
            {{ item.value }}
          </Button>
        </PaginationListItem>
        <PaginationEllipsis v-else :key="item.type" :index="index" />
      </template>

      <PaginationNext class="h-9 w-9 border-none disabled:bg-[transparent]" />
    </PaginationList>
  </Pagination>
</template>
