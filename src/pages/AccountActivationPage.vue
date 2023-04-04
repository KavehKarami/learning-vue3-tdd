<template>
  <div data-testid="activation-page">
    <div
      v-if="isSuccess"
      class="mt-3 alert alert-success"
      data-testid="success-message-box"
    >
      Account Activated Successful
    </div>
    <div
      v-if="isFail"
      class="mt-3 alert alert-danger"
      data-testid="failure-message-box"
    >
      Account Activated Failure
    </div>

    <div
      v-if="!isSuccess && !isFail"
      class="spinner-border text-primary spinner-border-sm"
      role="status"
      data-testid="spinner"
    >
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script>
import services from "../api/api.js";
export default {
  data() {
    return {
      isSuccess: false,
      isFail: false,
    };
  },

  mounted() {
    services
      .activate(this.$route.params.token)
      .then(() => (this.isSuccess = true))
      .catch(() => (this.isFail = true));
  },
};
</script>
