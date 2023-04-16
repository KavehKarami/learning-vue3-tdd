<template>
  <img
    src="../assets/profile.png"
    width="30"
    class="rounded-circle shadow-sm"
  />
  {{ user.username }}
</template>
<script>
export default {
  props: {
    user: { type: Object },
  },
};
</script>
