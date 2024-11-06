<template>
    <div id="db-wrapper">
        <Sidebar />
        <main id="page-content">
            <div class="header">
                <NavBar />
            </div>
            <section class="container-fluid p-4">
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-12">
                        <div class="border-bottom pb-3 mb-3">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <h1 class="mb-1 h2 fw-bold">Add Contact</h1>
                                    <nav aria-label="breadcrumb">
                                        <ol class="breadcrumb">
                                            <li class="breadcrumb-item">
                                                <router-link to="/dashboard">
                                                    <a href="">Dashboard</a>
                                                </router-link>
                                            </li>
                                            <li class="breadcrumb-item" aria-current="page">
                                                <router-link to="/dashboard/contact-me">
                                                    <a href="">Contacts</a>
                                                </router-link>
                                            </li>
                                            <li class="breadcrumb-item" aria-current="page">
                                                <router-link to="/dashboard/contact-me/add">
                                                    <a href="">Add Contacts</a>
                                                </router-link>
                                            </li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                        <form @submit.prevent="addContact" class="col-12 col-lg-10 mx-auto">
                            <div class="row">
                                <div class="col-12 col-lg-10 mx-auto">
                                    <div class="card mt-lg-0 h-100">
                                        <div class="card-header">
                                            <h3 class="mb-0">Contact Information</h3>
                                            <p class="mb-0">Please enter the contact information below</p>
                                        </div>
                                        <div class="card-body py-3">
                                            <div class="row">
                                                <!-- Name Field -->
                                                <div class="mb-3">
                                                    <label for="name" class="form-label">Name</label>
                                                    <input type="text" v-model="contact.name" class="form-control"
                                                        id="name" />
                                                    <span
                                                        v-if="vuelidate.contact.name.$error && vuelidate.contact.name.$dirty"
                                                        class="text-danger">
                                                        Name is required.
                                                    </span>
                                                </div>
                                                <!-- Email Field -->
                                                <div class="mb-3">
                                                    <label for="email" class="form-label">Email</label>
                                                    <input type="email" v-model="contact.email" class="form-control"
                                                        id="email" />
                                                    <span
                                                        v-if="vuelidate.contact.email.required.$invalid && vuelidate.contact.email.$dirty"
                                                        class="text-danger">
                                                        Email is required.
                                                    </span>
                                                    <span
                                                        v-if="vuelidate.contact.email.email.$invalid && vuelidate.contact.email.$dirty"
                                                        class="text-danger">
                                                        Please enter a valid email address.
                                                    </span>
                                                </div>
                                                <!-- Phone Field -->
                                                <div class="mb-3">
                                                    <label for="phone" class="form-label">Phone</label>
                                                    <input type="tel" v-model="contact.phone" class="form-control"
                                                        id="phone" />
                                                    <span
                                                        v-if="vuelidate.contact.phone.$error && vuelidate.contact.phone.$dirty"
                                                        class="text-danger">
                                                        Phone number is required.
                                                    </span>
                                                </div>
                                                <!-- Subject Field -->
                                                <div class="mb-3">
                                                    <label for="subject" class="form-label">Subject</label>
                                                    <input type="text" v-model="contact.subject" class="form-control"
                                                        id="subject" />
                                                    <span
                                                        v-if="vuelidate.contact.subject.$error && vuelidate.contact.subject.$dirty"
                                                        class="text-danger">
                                                        Subject is required.
                                                    </span>
                                                </div>
                                                <!-- Message Field -->
                                                <div class="mb-3">
                                                    <label for="message" class="form-label">Message</label>
                                                    <textarea v-model="contact.message" class="form-control"
                                                        id="message" rows="4"></textarea>
                                                    <span
                                                        v-if="vuelidate.contact.message.$error && vuelidate.contact.message.$dirty"
                                                        class="text-danger">
                                                        Message is required.
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="border-top mt-4">
                                <div class="d-flex justify-content-between mt-3">
                                    <router-link to="/dashboard/contact-me">
                                        <a class="btn btn-outline-primary pe-4 ps-4">
                                            Go back. Contacts
                                        </a>
                                    </router-link>
                                    <div>
                                        <button type="submit" class="btn btn-primary">Save</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>

<script>
import axios from "axios";
import NavBar from '@/components/NavBar.vue';
import Sidebar from '@/components/Sidebar.vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import { ref, defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'ContactViewAdd',
    components: {
        Sidebar,
        NavBar,
    },
    setup() {
        const router = useRouter();
        const contact = ref({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
        });
        const rules = {
            contact: {
                name: { required },
                email: { required, email },
                phone: { required },
                subject: { required },
                message: { required }
            }
        };
        const vuelidate = useVuelidate(rules, { contact });
        const addContact = async () => {
            vuelidate.value.$touch();
            if (vuelidate.value.$invalid) {
                return;
            }
            try {
                const response = await axios.post('https://cdlapi.chandalen.dev/api/contacts', contact.value);
                console.log("Contact added successfully:", response.data);
                router.push({ name: 'ContactMe' });
            } catch (error) {
                console.error("There was an error adding the contact:", error);
            }
        };
        return { contact, addContact, vuelidate };
    }
});
</script>

<style scoped>
.text-danger {
    color: #dc3545;
    font-size: 0.875em;
}
</style>
