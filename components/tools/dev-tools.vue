<script setup lang="ts">
const { isOpen, isTranslationDebug, toggle, close, toggleTranslationDebug } =
  useDevTools();
const route = useRoute();

watch(route, () => close());
</script>

<template>
  <div>
    <button
      @click="toggle"
      class="fixed bottom-6 left-6 z-50 bg-primary-blue text-white px-4 py-2 rounded-full shadow-lg hover:bg-light-blue transition-all duration-300 dark:bg-neutral-800 dark:hover:bg-neutral-700"
    >
      Open Dev Tools
    </button>

    <div
      v-if="isOpen"
      @click="close"
      class="fixed inset-0 bg-black bg-opacity-50 z-40"
    />

    <aside
      :class="[
        'fixed top-0 left-0 h-full w-80 bg-white dark:bg-neutral-900 shadow-xl z-50 transform transition-transform duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : '-translate-x-full',
      ]"
    >
      <div class="p-6 h-full flex flex-col">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-bold text-neutral-900 dark:text-white">
            Dev Tools
          </h2>
          <button
            @click="close"
            class="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
          >
            <Icon name="mdi:close" size="24" />
          </button>
        </div>

        <div class="flex-grow overflow-y-auto">
          <div class="space-y-6">
            <div class="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="font-medium text-neutral-900 dark:text-white">
                    Translation Debug
                  </h3>
                  <p
                    class="text-sm text-neutral-600 dark:text-neutral-400 mt-1"
                  >
                    Show translation keys and status
                  </p>
                </div>
                <ToolsDevToolToggle
                  :model-value="isTranslationDebug"
                  @update:model-value="toggleTranslationDebug"
                  checked-value="On"
                  unchecked-value="Off"
                />
              </div>

              <div
                class="mt-4 p-3 bg-white dark:bg-neutral-700 rounded text-sm"
              >
                <p class="text-neutral-800 dark:text-neutral-200">
                  When enabled, translations will show as:
                  <code class="bg-neutral-200 dark:bg-neutral-600 px-1 rounded"
                    >key|1</code
                  >
                  (translated) or
                  <code class="bg-neutral-200 dark:bg-neutral-600 px-1 rounded"
                    >key|0</code
                  >
                  (untranslated)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>
