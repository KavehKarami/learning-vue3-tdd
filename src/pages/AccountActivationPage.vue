<template>
  <div data-testid="activation-page">
    <div
      v-if="isSuccess"
      class="mt-3 alert alert-success"
      data-testid="success-message-box"
    >
      {{ $t("account_activated_successful") }}
    </div>
    <div
      v-if="isFail"
      class="mt-3 alert alert-danger"
      data-testid="failure-message-box"
    >
      {{ $t("account_activated_failure") }}
    </div>

    <BaseSpinner v-if="!isSuccess && !isFail" size="normal" />
  </div>
</template>

<script>
import BaseSpinner from "../components/BaseSpinner.vue";
import services from "../api/api.js";

export default {
  components: { BaseSpinner },
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
