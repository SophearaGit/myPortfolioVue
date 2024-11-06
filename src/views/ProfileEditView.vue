<template>
    <NavBar />
    <main>
        <section class="pt-5 pb-5">
            <div class="container">
                <!-- User Info -->
                <div class="row align-items-center">
                    <div class="col-12">
                        <div class="rounded-top"
                            style="background: url(/assets/images/background/profile-bg.jpg) no-repeat; background-size: cover; height: 100px">
                        </div>
                        <div class="card px-4 pt-2 pb-4 shadow-sm rounded-top-0 rounded-bottom-0 rounded-bottom-md-2">
                            <div class="d-flex align-items-end justify-content-between">
                                <div class="d-flex align-items-center">
                                    <div
                                        class="me-2 position-relative d-flex justify-content-end align-items-end mt-n5">
                                        <img alt="avatar" :src="computedAvatar"
                                            class="avatar-xl rounded-circle border border-4 border-white" />
                                    </div>
                                    <div class="lh-1">
                                        <h2 class="mb-0">{{ form.displayName }}</h2>
                                        <p class="mb-0 d-block">@{{ form.displayName }}</p>
                                    </div>
                                </div>
                                <router-link to="/dashboard">
                                    <a class="btn btn-primary btn-sm d-none d-md-block">Back to Dashboard</a>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Content -->
                <div class="row mt-0 mt-md-4">
                    <div class="col-lg-3 col-md-4 col-12">
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
                                        <li class="nav-item active">
                                            <router-link to="/dashboard/profile-edit">
                                                <a class="nav-link">
                                                    <i class="fe fe-settings nav-icon"></i>
                                                    Edit Profile
                                                </a>
                                            </router-link>
                                        </li>
                                        <li class="nav-item">
                                            <router-link to="/dashboard/profile-edit/security">
                                                <a class="nav-link">
                                                    <i class="fe fe-user nav-icon"></i>
                                                    Security
                                                </a>
                                            </router-link>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" @click.prevent="SignOut">
                                                <i class="fe fe-power nav-icon"></i>
                                                Sign Out
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>

                    <div class="col-lg-9 col-md-8 col-12">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="mb-0">Profile Details</h3>
                                <p class="mb-0">You have full control to manage your own account setting.</p>
                            </div>
                            <div class="card-body">
                                <div class="d-lg-flex align-items-center justify-content-between">
                                    <div class="d-flex align-items-center mb-4 mb-lg-0">
                                        <img alt="avatar" :src="computedAvatar" class="avatar-xl rounded-circle" />
                                        <div class="ms-3">
                                            <h4 class="mb-0">Your avatar</h4>
                                            <p class="mb-0">PNG or JPG no bigger than 800px wide and tall.</p>
                                        </div>
                                    </div>
                                    <div>
                                        <label for="file-upload" class="btn btn-outline-secondary btn-sm"
                                            style="cursor: pointer;">Upload</label>&nbsp;
                                        <input type="file" id="file-upload" style="display: none;"
                                            accept=".png, .jpg, .jpeg" @change="onFileChange" />
                                        <button class="btn btn-outline-danger btn-sm"
                                            @click="deleteAvatar">Delete</button>
                                    </div>
                                </div>
                                <hr class="my-5" />
                                <div>
                                    <h4 class="mb-0">Personal Details</h4>
                                    <p class="mb-4">Edit your personal information and address.</p>
                                    <form @submit.prevent="submitForm" class="row gx-3 needs-validation" novalidate>
                                        <div class="mb-3 col-12 col-md-6">
                                            <label class="form-label" for="name">Name</label>
                                            <input type="text" id="name" class="form-control"
                                                :class="{ 'is-invalid': v$.form.name.$errors.length > 0 }"
                                                placeholder="Name" v-model="form.name" />
                                            <div class="text-danger" v-for="error of v$.form.name.$errors"
                                                :key="error.$fid">
                                                {{ error.$message }}
                                            </div>
                                        </div>
                                        <div class="mb-3 col-12 col-md-6">
                                            <label class="form-label" for="email">Email</label>
                                            <input type="email" id="email" class="form-control"
                                                :class="{ 'is-invalid': v$.form.email.$errors.length > 0 }"
                                                placeholder="Email" v-model="form.email" />
                                            <div class="text-danger" v-for="error of v$.form.email.$errors"
                                                :key="error.$eid">
                                                {{ error.$message }}
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <button class="btn btn-primary" type="submit">Update Profile</button>
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
import axios from 'axios';
import useVuelidate from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';

export default {
    components: {
        NavBar,
    },
    data() {
        return {
            v$: useVuelidate(),
            form: {
                name: '',
                email: '',
                avatar: '',
                displayName: '',
            },
            selectedFile: null,
            defaultAvatar: '/assets/images/default.png',
        };
    },
    computed: {
        computedAvatar() {
            return this.form.avatar && this.form.avatar !== "https://cdlapi.chandalen.dev/storage/avatar/default.png" ? this.form.avatar : this.defaultAvatar;
        },
    },
    validations() {
        return {
            form: {
                name: { required },
                email: { required, email },
            },
        };
    },
    async created() {
        await this.getUser();
    },
    methods: {
        async getUser() {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.data.result) {
                    this.form = {
                        name: response.data.data.name,
                        email: response.data.data.email,
                        avatar: response.data.data.avatar,
                        displayName: response.data.data.name,
                    };
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
                alert('Failed to load profile data. Please try again.');
            }
        },
        async submitForm() {
            this.v$.$validate();
            if (!this.v$.$error) {
                try {
                    const token = localStorage.getItem('token');
                    await axios.put('/own/personal-information', {
                        name: this.form.name,
                        email: this.form.email,
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    // await this.getUser();
                    window.location.reload();
                    if (this.selectedFile) {
                        await this.updateAvatar();
                    }
                    
                } catch (error) {
                    console.error('Error updating profile:', error);
                    alert('Failed to update profile. Please try again.');
                }
            }
        },
        onFileChange(event) {
            const file = event.target.files[0];
            if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
                this.selectedFile = file;
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.form.avatar = e.target.result;
                };
                reader.readAsDataURL(file);
            } else {
                alert('Please select a valid image file (PNG or JPG).');
            }
        },
        async updateAvatar() {
            try {
                const token = localStorage.getItem('token');
                const formData = new FormData();
                formData.append('avatar', this.selectedFile);

                await axios.post('/own/avatars', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });
                await this.getUser();
            } catch (error) {
                console.error('Error uploading avatar:', error);
                alert('Failed to upload avatar. Please try again.');
            }
        },
        async deleteAvatar() {
            const confirmation = confirm('Are you sure you want to delete your avatar? This action cannot be undone.');
            if (confirmation) {
                try {
                    const token = localStorage.getItem('token');
                    await axios.delete('/own/avatars', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    this.form.avatar = '';
                    await this.getUser();
                } catch (error) {
                    console.error('Error deleting avatar:', error);
                    alert('Failed to delete avatar. Please try again.');
                }
            }
        },
        async SignOut() {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.delete('/logout', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    localStorage.removeItem('token');
                    window.location.reload();
                    this.user = { name: '', email: '', avatar: '/assets/images/default.png' };
                } catch (error) {
                    console.error("There was an error logging out:", error);
                }
            } else {
                console.warn("No token found, cannot log out.");
            }
        },
    },
};
</script>

<style scoped></style>
