<template>
  <div class="relative flex min-h-dvh flex-col">
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Toaster />
  </div>

  <AppDialog />
  <SideMenuSheet />
</template>
