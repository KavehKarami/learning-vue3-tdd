<template>
  <base-card>
    <template v-slot:header>
      <h3>{{ $t("users") }}</h3>
    </template>

    <ul v-if="page.content.length" class="list-group list-group-flush">
      <li
        v-for="user in page.content"
        :key="user.id"
        class="list-group-item list-group-item-action"
        @click="$router.push('/user/' + user.id)"
      >
        <UserListItem :user="user" />
      </li>
    </ul>

    <template v-slot:footer>
      <button
        v-if="page.page && !isLoading"
        class="btn btn-outline-secondary btn-sm float-start"
        @click="loadData(page.page - 1)"
      >
        {{ $t("prevPage") }}
      </button>
      <button
        v-if="page.page + 1 < page.totalPages && !isLoading"
        class="btn btn-outline-secondary btn-sm float-end"
        @click="loadData(page.page + 1)"
      >
        {{ $t("nextPage") }}
      </button>

      <BaseSpinner v-if="isLoading" size="normal" />
    </template>
  </base-card>
</template>
<script>
import services from "../api/api.js";
import BaseCard from "./BaseCard.vue";
import BaseSpinner from "./BaseSpinner.vue";
import UserListItem from "./UserListItem.vue";

export default {
  components: { UserListItem, BaseSpinner, BaseCard },

  data() {
    return {
      page: {
        content: [],
        page: 0,
        size: 0,
        totalPages: 0,
      },
      isLoading: true,
    };
  },
  mounted() {
    this.loadData();
  },

  methods: {
    async loadData(page = 0) {
      try {
        this.isLoading = true;
        const { data: users } = await services.getUsers(page);
        this.page = users;
        this.isLoading = false;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
li.list-group-item-action {
  cursor: pointer;
}
</style>
