<template>
  <button
    class="btn btn-outline-primary mt-3"
    data-testid="submit"
    :disabled="disabled"
    @click.prevent="onClick"
  >
    <base-spinner v-if="isLoading" />
    <slot>{{ $t("click") }}</slot>
  </button>
</template>

<script>
import BaseSpinner from "./BaseSpinner.vue";
export default {
  components: { BaseSpinner },
  props: {
    disabled: { type: Boolean },
    isLoading: { type: Boolean },
    onClick: { type: Function },
  },
};
</script>
