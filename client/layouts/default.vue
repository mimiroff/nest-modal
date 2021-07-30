<template>
  <v-app>
    <v-app-bar clipped-left fixed app>
      <v-toolbar-title class="text-capitalize" v-text="pageTitle" />
      <v-spacer />
      <v-menu bottom :offset-y="true">
        <template #activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on">
            <v-icon class="ml-2">mdi-account</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click.stop="logOut">
            <v-list-item-title>Log Out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  computed: {
    pageTitle() {
      const { path, name } = this.$route;
      return path === '/' ? 'Home' : name;
    },
  },
  methods: {
    async logOut() {
      this.$auth.reset();
    },
  },
};
</script>
