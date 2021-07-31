<template>
  <div>
    <v-card class="py-5 mt-10">
      <h3 class="text-h3 ml-5">User Profile</h3>
      <v-card-text>
        <v-form ref="form" v-model="isValid">
          <div>
            <h4
              class="text-h4 mt-5 pointer"
              @click.stop="showFirstNameInput = !showFirstNameInput"
            >
              First name: {{ firstName }}
            </h4>
            <v-text-field
              v-if="showFirstNameInput"
              v-model="firstName"
            ></v-text-field>
          </div>
          <div>
            <h4
              class="text-h4 mt-5 pointer"
              @click.stop="showLastNameInput = !showLastNameInput"
            >
              Last name: {{ lastName }}
            </h4>
            <v-text-field
              v-if="showLastNameInput"
              v-model="lastName"
            ></v-text-field>
          </div>
          <div>
            <h4
              class="text-h4 mt-5 pointer"
              @click.stop="showEmailInput = !showEmailInput"
            >
              Email: {{ email }}
            </h4>
            <v-text-field
              v-if="showEmailInput"
              v-model="email"
              required
              :rules="requiredRules"
            ></v-text-field>
          </div>
        </v-form>
      </v-card-text>
      <v-card-actions class="flex-row px-5">
        <v-btn x-large color="green" class="mx-0" @click="update">Update</v-btn>
        <v-btn x-large color="red" class="" @click="remove">Delete</v-btn>
      </v-card-actions>
    </v-card>
    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import * as axios from '~/utils/axios.ts';
import { requiredRules } from '~/utils/validationRules.ts';

export default {
  data() {
    return {
      initial: null,
      firstName: null,
      lastName: null,
      email: null,
      id: null,
      showFirstNameInput: false,
      showLastNameInput: false,
      showEmailInput: false,
      isValid: false,
      requiredRules,
      isLoading: true,
    };
  },
  async beforeMount() {
    try {
      const { id, firstName, lastName, email } = await axios.get(
        'api/users/me',
      );
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.id = id;
      this.initial = { id, firstName, lastName, email };
    } catch (ex) {
      console.error(ex);
    } finally {
      this.isLoading = false;
    }
  },
  methods: {
    async remove() {
      try {
        if (!this.id) {
          return;
        }
        await axios.del(`api/users/${this.id}`);
        this.$auth.reset();
      } catch (ex) {
        console.error(ex);
      }
    },
    async update() {
      try {
        this.$refs.form.validate();
        if (!this.isValid || !this.id) {
          return;
        }
        const { email, firstName, lastName } = this;
        const update = {};
        if (firstName !== this.initial.firstName) {
          update.firstName = firstName;
        }
        if (lastName !== this.initial.lastName) {
          update.lastName = lastName;
        }
        if (email !== this.initial.email) {
          update.email = email;
        }
        if (Object.keys(update).length > 0) {
          const user = await axios.patch(`api/users/${this.id}`, update);
          this.initial.firstName = user.firstName;
          this.initial.lastName = user.lastName;
          this.initial.email = user.email;
        }
      } catch (ex) {
        console.error(ex);
      }
    },
  },
};
</script>

<style scoped>
.pointer:hover {
  cursor: pointer;
}
</style>
