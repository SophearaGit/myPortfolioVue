<template>
  <Header />
  <div class="login-view">
    <main>
      <section class="container d-flex flex-column vh-100">
        <div class="row align-items-center justify-content-center g-0 h-lg-100 py-8">
          <div class="col-lg-5 col-md-8 py-8 py-xl-0">
            <div class="card shadow">
              <div class="card-body p-6">
                <div class="mb-4">
                  <h1 class="mb-1 fw-bold">Log in</h1>
                </div>
                <Form @submit="submitForm" :validation-schema="schema">
                  <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <Field type="email" id="email" name="email" class="form-control" placeholder="Email address here" />
                    <ErrorMessage name="email" class="text-danger" />
                  </div>
                  <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <Field type="password" id="password" name="password" class="form-control"
                      placeholder="**************" />
                    <ErrorMessage name="password" class="text-danger" />
                  </div>
                  <!-- <div class="d-lg-flex justify-content-between align-items-center mb-4">
                    <div>
                      <a href="forget-password.html">Forgot your password?</a>
                    </div>
                  </div> -->
                  <div>
                    <div class="d-grid">
                      <button type="submit" class="btn btn-primary">Sign in</button>
                    </div>
                  </div>
                  <hr class="my-4" />
                  <div v-if="errorMessage" class="text-danger">{{ errorMessage }}</div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div class="position-absolute bottom-0 m-4">
        <div class="dropdown">
          <button class="btn btn-light btn-icon rounded-circle d-flex align-items-center" type="button"
            aria-expanded="false" data-bs-toggle="dropdown" aria-label="Toggle theme (auto)">
            <i class="bi theme-icon-active"></i>
            <span class="visually-hidden bs-theme-text">Toggle theme</span>
          </button>
          <ul class="dropdown-menu dropdown-menu-end shadow" aria-labelledby="bs-theme-text">
            <li>
              <button type="button" class="dropdown-item d-flex align-items-center" data-bs-theme-value="light"
                aria-pressed="false">
                <i class="bi theme-icon bi-sun-fill"></i>
                <span class="ms-2">Light</span>
              </button>
            </li>
            <li>
              <button type="button" class="dropdown-item d-flex align-items-center" data-bs-theme-value="dark"
                aria-pressed="false">
                <i class="bi theme-icon bi-moon-stars-fill"></i>
                <span class="ms-2">Dark</span>
              </button>
            </li>
            <li>
              <button type="button" class="dropdown-item d-flex align-items-center active" data-bs-theme-value="auto"
                aria-pressed="true">
                <i class="bi theme-icon bi-circle-half"></i>
                <span class="ms-2">Auto</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import Header from "../components/Header.vue";
import { mapMutations } from 'vuex';

export default {
  name: "LoginView",
  components: {
    Header,
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      schema: yup.object({
        email: yup.string().email("Invalid email").required("Email is required"),
        password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
      }),
      errorMessage: null,
    };
  },
  methods: {
    ...mapMutations(['login']),
    async submitForm(values) {
      this.errorMessage = null;

      try {
        const response = await axios.post("/login", values);

        if (response.data && response.data.data && response.data.data.token) {
          console.log("Login successful:", response.data);

          const userData = {
            id: response.data.data.id,
            name: response.data.data.name,
            email: response.data.data.email,
            avatar: response.data.data.avatar,
            token: response.data.data.token,
          };

          localStorage.setItem('token', response.data.data.token);
          this.login(userData);
          this.$router.push({ name: 'Dashboard' });
        } else {
          this.errorMessage = "Email or password is incorrect, please try again.";
          console.log(this.errorMessage);
        }
      } catch (error) {
        console.error("Login error:", error);
        this.errorMessage = "Email or password is incorrect, please try again.";
      }
    },
  },
};
</script>

<style scoped></style>
