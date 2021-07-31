<template>
  <v-app v-if="isLogin">
    <h3 class="mt-5 text-h3 text-center">Log In</h3>
    <v-card :width="600" :min-width="320" class="mx-auto mt-10">
      <v-card-text>
        <v-form ref="form" v-model="isValid">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            required
            label="Email"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :rules="requiredRules"
            required
            :type="passwordInputType"
            label="Password"
            :append-icon="passwordIcon"
            @click:append="togglePassword"
          ></v-text-field>
        </v-form>
        <v-card-actions class="flex-column px-0">
          <v-btn x-large width="100%" color="green" class="mx-0" @click="logIn"
            >Log In</v-btn
          >
          <v-btn
            x-large
            width="100%"
            color="gray"
            class="mx-0 mt-5"
            @click="goToSignUp"
            >Sing Up</v-btn
          >
        </v-card-actions>
      </v-card-text>
    </v-card>
    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-app>

  <v-app v-else>
    <h3 class="mt-5 text-h3 text-center">Sign Up</h3>
    <v-card :width="600" :min-width="320" class="mx-auto mt-10">
      <v-card-text>
        <v-form ref="form" v-model="isValid">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            required
            label="Email"
          ></v-text-field>
          <v-text-field
            v-model="firstName"
            :rules="requiredRules"
            required
            label="First Name"
          ></v-text-field>
          <v-text-field
            v-model="lastName"
            :rules="requiredRules"
            required
            label="Last Name"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            required
            :type="passwordInputType"
            label="Password"
            :append-icon="passwordIcon"
            @click:append="togglePassword"
          ></v-text-field>
        </v-form>
        <v-card-actions class="flex-column px-0">
          <v-btn x-large width="100%" color="green" class="mx-0" @click="signUp"
            >Sign Up</v-btn
          >
          <v-btn
            x-large
            width="100%"
            color="gray"
            class="mx-0 mt-5"
            @click="goToLogIn"
            >Log In</v-btn
          >
        </v-card-actions>
      </v-card-text>
    </v-card>
    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
import * as axios from '~/utils/axios';
import {
  emailRules,
  passwordRules,
  requiredRules,
} from '~/utils/validationRules.ts';

export default {
  layout: 'auth',
  data() {
    return {
      shouldShowPassword: false,
      isLoading: false,
      isValid: false,
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      isLogin: true,
    };
  },
  computed: {
    passwordInputType() {
      return this.shouldShowPassword ? 'text' : 'password';
    },
    passwordIcon() {
      return this.shouldShowPassword ? 'mdi-eye' : 'mdi-eye-off';
    },
    emailRules() {
      return emailRules;
    },
    passwordRules() {
      return passwordRules;
    },
    requiredRules() {
      return requiredRules;
    },
  },
  methods: {
    goToSignUp() {
      this.isValid = false;
      this.isLogin = false;
      this.shouldShowPassword = false;
    },
    goToLogIn() {
      this.isValid = false;
      this.isLogin = true;
      this.shouldShowPassword = false;
    },
    async logIn() {
      try {
        this.$refs.form.validate();
        if (!this.isValid) {
          return;
        }
        this.isLoading = true;
        const { email, password } = this;
        await this.$auth.loginWith('local', { data: { email, password } });
      } catch (ex) {
        console.error(ex);
      } finally {
        this.isLoading = false;
      }
    },
    async signUp() {
      try {
        this.$refs.form.validate();
        if (!this.isValid) {
          return;
        }
        this.isLoading = true;
        const { email, firstName, lastName, password } = this;
        await axios.post('api/users', { email, firstName, lastName, password });
        await this.$auth.loginWith('local', { data: { email, password } });
      } catch (ex) {
        console.error(ex);
      } finally {
        this.isLoading = false;
      }
    },
    togglePassword() {
      this.shouldShowPassword = !this.shouldShowPassword;
    },
  },
};
</script>
