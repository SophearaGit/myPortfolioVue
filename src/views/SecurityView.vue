<template>
    <NavBar />
    <main>
        <section class="pt-5 pb-5">
            <div class="container">
                <!-- User Info -->
                <div class="row align-items-center">
                    <div class="col-12">
                        <div class="rounded-top profile-background"></div>
                        <div class="card px-4 pt-2 pb-4 shadow-sm rounded-top-0 rounded-bottom-0 rounded-bottom-md-2">
                            <div class="d-flex align-items-end justify-content-between">
                                <div class="d-flex align-items-center">
                                    <div
                                        class="me-2 position-relative d-flex justify-content-end align-items-end mt-n5">
                                        <img alt="avatar" :src="computedAvatar"
                                            class="avatar-xl rounded-circle border border-4 border-white" />
                                    </div>
                                    <div class="lh-1">
                                        <h2 class="mb-0">{{ user.name }}</h2>
                                        <p class="mb-0 d-block">@{{ user.name }}</p>
                                    </div>
                                </div>
                                <router-link to="/dashboard" class="btn btn-primary btn-sm d-none d-md-block">
                                    Back to Dashboard
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Content -->
                <div class="row mt-0 mt-md-4">
                    <div class="col-lg-3 col-md-4 col-12">
                        <!-- Side Navbar -->
                        <nav class="navbar navbar-expand-md shadow-sm mb-4 sidenav">
                            <a class="d-xl-none d-lg-none d-md-none text-inherit fw-bold" href="#">Menu</a>
                            <button class="navbar-toggler d-md-none icon-shape icon-sm rounded bg-primary text-light"
                                type="button" data-bs-toggle="collapse" data-bs-target="#sidenav"
                                aria-controls="sidenav" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="fe fe-menu"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="sidenav">
                                <div class="navbar-nav flex-column">
                                    <span class="navbar-header">Account Settings</span>
                                    <ul class="list-unstyled ms-n2 mb-0">
                                        <li class="nav-item">
                                            <router-link to="/dashboard/profile-edit" class="nav-link">
                                                <i class="fe fe-settings nav-icon"></i>
                                                Edit Profile
                                            </router-link>
                                        </li>
                                        <li class="nav-item active">
                                            <router-link to="/dashboard/profile-edit/security" class="nav-link">
                                                <i class="fe fe-user nav-icon"></i>
                                                Security
                                            </router-link>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" href="" @click.prevent="SignOut">
                                                <i class="fe fe-power nav-icon"></i>
                                                Sign Out
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                    <!-- Security Content -->
                    <div class="col-lg-9 col-md-8 col-12">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="mb-0">Security</h3>
                                <p class="mb-0">Edit your account settings and change your password here.</p>
                            </div>
                            <div class="card-body">
                                <div>
                                    <h4 class="mb-0">Change Password</h4>
                                    <p>We will email you a confirmation when changing your password, so please expect
                                        that email after submitting.</p>
                                    <!-- Password Change Form -->
                                    <form @submit.prevent="submitForm" class="row needs-validation" novalidate>
                                        <div class="col-lg-6 col-md-12 col-12">
                                            <div class="mb-3">
                                                <label class="form-label" for="currentpassword">Current Password</label>
                                                <input id="currentpassword" type="password"
                                                    v-model="form.current_password" class="form-control"
                                                    :class="{ 'is-invalid': v$.form.current_password.$error }"
                                                    required />
                                                <div v-if="v$.form.current_password.$error" class="invalid-feedback">
                                                    <template v-if="v$.form.current_password.$errors[0]?.msg">
                                                        {{ v$.form.current_password.$errors[0]?.msg }}
                                                    </template>
                                                    <template v-else>Please enter your current password.</template>
                                                </div>
                                            </div>

                                            <div class="mb-3">
                                                <label class="form-label" for="newpassword">New Password</label>
                                                <input id="newpassword" type="password" v-model="form.password"
                                                    class="form-control"
                                                    :class="{ 'is-invalid': v$.form.password.$error }" required />
                                                <div v-if="v$.form.password.$error" class="invalid-feedback">
                                                    <template v-if="v$.form.password.$errors[0]?.msg">
                                                        {{ v$.form.password.$errors[0]?.msg }}
                                                    </template>
                                                    <template v-else>New password must be at least 6 characters
                                                        long.</template>
                                                </div>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label" for="confirmpassword">Confirm New
                                                    Password</label>
                                                <input id="confirmpassword" type="password"
                                                    v-model="form.password_confirmation" class="form-control"
                                                    :class="{ 'is-invalid': passwordMismatch }" required />
                                                <div v-if="passwordMismatch" class="invalid-feedback">
                                                    Passwords must match.
                                                </div>
                                            </div>
                                            <button type="submit" class="btn btn-primary">Save Password</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import useVuelidate from '@vuelidate/core';
import { required, minLength } from '@vuelidate/validators';
import axios from 'axios';

export default {
    name: 'Security',
    components: {
        NavBar,
    },
    data() {
        return {
            v$: useVuelidate(),
            user: {},
            form: {
                current_password: '',
                password: '',
                password_confirmation: ''
            }
        }
    },
    computed: {
        computedAvatar() {
            return this.user.avatar && this.user.avatar !== "https://cdlapi.chandalen.dev/storage/avatar/default.png" ? this.user.avatar : '/assets/images/default.png';
        },
        passwordMismatch() {
            return this.form.password !== this.form.password_confirmation;
        }
    },
    validations() {
        return {
            form: {
                current_password: { required, minLength: minLength(6) },
                password: { required, minLength: minLength(6) },
                password_confirmation: { required }
            }
        };
    },
    created() {
        this.getUser();
    },
    methods: {
        async getUser() {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get('https://cdlapi.chandalen.dev/api/me', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    this.user = response.data.data;
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        },
        async SignOut() {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    await axios.delete('https://cdlapi.chandalen.dev/api/logout', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    localStorage.removeItem('token');
                    this.user = null;
                    window.location.reload();
                } catch (error) {
                    console.error("There was an error logging out:", error);
                }
            }
        },
        async submitForm() {
            this.v$.$validate();
            if (!this.v$.$error && !this.passwordMismatch) {
                const token = localStorage.getItem('token');
                try {
                    const response = await axios.put('https://cdlapi.chandalen.dev/api/own/password', {
                        current_password: this.form.current_password,
                        password: this.form.password,
                        password_confirmation: this.form.password_confirmation
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    if (response.data.message === 'Current password is incorrect.') {
                        alert('Current password is incorrect.');
                        this.form.current_password = '';
                        this.form.password = '';
                        this.form.password_confirmation = '';
                        return;
                    }
                    alert('Password has been updated successfully.');
                    this.form.current_password = '';
                    this.form.password = '';
                    this.form.password_confirmation = '';
                    this.v$.$reset();
                } catch (error) {
                    console.error("Error changing password:", error);
                }
            }
        }
    },
};
</script>

<style scoped>
.profile-background {
    background: url('../../assets/images/background/profile-bg.jpg') no-repeat;
    background-size: cover;
    height: 100px;
}
</style>
