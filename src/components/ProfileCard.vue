<template>
  <div class="card text-center">
    <div class="card-header">
      <img
        src="../assets/profile.png"
        class="rounded-circle shadow"
        width="200"
        alt="profile"
      />
    </div>
    <div class="card-body">
      <h3>{{ user.username }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: { type: Object },
  },
};
</script>
