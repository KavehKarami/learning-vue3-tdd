<template>
  <div class="card">
    <div class="card-header">
      <h3>Users</h3>
    </div>

    <ul v-if="page.content.length" class="list-group list-group-flush">
      <li
        v-for="user in page.content"
        :key="user.id"
        class="list-group-item list-group-item-action"
        @click="$router.push('/user/' + user.id)"
      >
        {{ user.username }}
      </li>
    </ul>
    <div class="card-footer">
      <button
        v-if="page.page"
        class="btn btn-outline-secondary btn-sm"
        @click="loadData(page.page - 1)"
      >
        &lt; previous
      </button>
      <button
        v-if="page.page + 1 < page.totalPages"
        class="btn btn-outline-secondary btn-sm float-end"
        @click="loadData(page.page + 1)"
      >
        next &gt;
      </button>
    </div>
  </div>
</template>
<script>
import services from "../api/api.js";
export default {
  data() {
    return {
      page: {
        content: [],
        page: 0,
        size: 0,
        totalPages: 0,
      },
    };
  },
  mounted() {
    this.loadData();
  },

  methods: {
    loadData(page = 0) {
      services
        .getUsers(page)
        .then((response) => (this.page = response.data))
        .catch((e) => console.log(e));
    },
  },
};
</script>

<style scoped>
li.list-group-item-action {
  cursor: pointer;
}
</style>
