<template>
  <v-container class="mb-4">
    <v-text-field
      v-model="searchTerm"
      :loading="loading"
      @input="onInput"
      density="compact"
      label="Search user by ID"
      variant="outlined"
      outlined
      hide-details
      single-line
      @click:append-inner="onClick"
    >
      <template v-slot:append>
        <v-avatar style="padding-bottom: 11px">
          <v-icon>mdi-magnify</v-icon>
        </v-avatar>
      </template></v-text-field
    >
    <p v-if="message" class="text-red-500 mt-2">{{ message }}</p>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: "",
      message: "",
      loading: false,
      loaded: false,
    };
  },
  methods: {
    onInput() {
      if (this.searchTerm.trim() === "") {
        this.message = "Search by User ID to fetch details.";
        this.$emit("clear"); // Emit an event to clear user data
      } else if (isNaN(this.searchTerm)) {
        this.message = "Please enter a valid user ID (numeric).";
      } else {
        this.message = "";
        this.$emit("search", this.searchTerm);
      }
    },
    onClick() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.loaded = true;
      }, 2000);
    },
  },
};
</script>

<style scoped>
.v-application--is-ltr .v-text-field .v-label {
    top: 22px;
}
</style>