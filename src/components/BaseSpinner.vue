<template>
  <div
    class="spinner-border text-primary"
    :class="{ 'spinner-border-sm': size === 'small' }"
    role="status"
    data-testid="spinner"
  >
    <span class="visually-hidden">Loading...</span>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: "small",
    },
  },
};
</script>
