<script setup lang="ts">
import { isVNode } from "vue";
import { Toast, ToastDuration, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from ".";

const { toasts } = useToast();
</script>

<template>
  <ClientOnly>
    <ToastProvider :duration="TOAST_DURATION">
      <Toast v-for="toast in toasts" :key="toast.id" v-bind="toast" class="my-1">
        <template #default="{ isPaused }">
          <div class="grid gap-1">
            <ToastTitle v-if="toast.title">
              {{ toast.title }}
            </ToastTitle>
            <template v-if="toast.description">
              <ToastDescription v-if="isVNode(toast.description)">
                <component :is="toast.description" />
              </ToastDescription>
              <ToastDescription v-else :variant="toast.variant">
                {{ toast.description }}
              </ToastDescription>
            </template>
            <ToastDuration :is-paused="isPaused" :duration="TOAST_DURATION" />
          </div>
          <component :is="toast.action" />
        </template>
      </Toast>
      <ToastViewport />
    </ToastProvider>
  </ClientOnly>
</template>
