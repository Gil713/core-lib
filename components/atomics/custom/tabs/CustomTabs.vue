<script setup lang="ts">
type ICustomTab = {
  label: string;
  value: string;
  content: Component;
  url: string;
};

const currentRoute = useRoute();

const props = defineProps<{ tabs: ICustomTab[] }>();

const handleClick = (tabUrl: string) => {
  if (!tabUrl) {
    return;
  }
  navigateTo(tabUrl);
};

const currentTab = computed(() => {
  return props.tabs.find((tab) => tab.value === (currentRoute.query.tab as string))?.value ?? props.tabs[0]?.value;
});
</script>

<template>
  <Tabs class="w-full rounded-lg bg-neutral-750" :default-value="currentTab">
    <TabsList class="grid w-full grid-cols-3 border border-border-primary p-0">
      <TabsTrigger
        v-for="tab in tabs"
        :key="tab.value"
        :value="tab.value"
        class="min-h-12"
        @click="handleClick(tab.url)"
      >
        {{ tab.label }}
      </TabsTrigger>
    </TabsList>

    <TabsContent v-for="tab in tabs" :key="tab.value" :value="tab.value">
      <component :is="tab.content" />
    </TabsContent>
  </Tabs>
</template>
