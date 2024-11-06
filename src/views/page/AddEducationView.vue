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
                                    <h1 class="mb-1 h2 fw-bold">Add Education</h1>
                                    <nav aria-label="breadcrumb">
                                        <ol class="breadcrumb">
                                            <li class="breadcrumb-item">
                                                <router-link to="/dashboard">
                                                    Dashboard
                                                </router-link>
                                            </li>
                                            <li class="breadcrumb-item">
                                                <router-link to="/dashboard/educations">
                                                    Education
                                                </router-link>
                                            </li>
                                            <li class="breadcrumb-item active" aria-current="page">
                                                Add Education
                                            </li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                        <form @submit.prevent="addEducation" class="col-12 col-lg-10 mx-auto">
                            <div class="row">
                                <div class="col-12 col-lg-10 mx-auto">
                                    <div class="card mt-lg-0 h-100">
                                        <div class="card-header">
                                            <h3 class="mb-0">Education Information</h3>
                                            <p class="mb-0">Please enter the education details below</p>
                                        </div>
                                        <div class="card-body py-3">
                                            <div class="row">
                                                <!-- Khmer Degree Field -->
                                                <div class="mb-3">
                                                    <label for="km_degree" class="form-label">Khmer Degree</label>
                                                    <input type="text" v-model="education.km_degree"
                                                        class="form-control"
                                                        :class="{ 'border-danger': vuelidate.education.km_degree.$error && vuelidate.education.km_degree.$dirty }"
                                                        id="km_degree" />
                                                    <span
                                                        v-if="vuelidate.education.km_degree.$error && vuelidate.education.km_degree.$dirty"
                                                        class="text-danger d-flex align-items-center">
                                                        <i class="fas fa-exclamation-circle me-2"></i>
                                                        Khmer degree is required.
                                                    </span>
                                                </div>
                                                <!-- English Degree Field -->
                                                <div class="mb-3">
                                                    <label for="en_degree" class="form-label">English Degree</label>
                                                    <input type="text" v-model="education.en_degree"
                                                        class="form-control"
                                                        :class="{ 'border-danger': vuelidate.education.en_degree.$error && vuelidate.education.en_degree.$dirty }"
                                                        id="en_degree" />
                                                    <span
                                                        v-if="vuelidate.education.en_degree.$error && vuelidate.education.en_degree.$dirty"
                                                        class="text-danger d-flex align-items-center">
                                                        <i class="fas fa-exclamation-circle me-2"></i>
                                                        English degree is required.
                                                    </span>
                                                </div>
                                                <!-- Khmer School Field -->
                                                <div class="mb-3">
                                                    <label for="km_school" class="form-label">Khmer School</label>
                                                    <input type="text" v-model="education.km_school"
                                                        class="form-control"
                                                        :class="{ 'border-danger': vuelidate.education.km_school.$error && vuelidate.education.km_school.$dirty }"
                                                        id="km_school" />
                                                    <span
                                                        v-if="vuelidate.education.km_school.$error && vuelidate.education.km_school.$dirty"
                                                        class="text-danger d-flex align-items-center">
                                                        <i class="fas fa-exclamation-circle me-2"></i>
                                                        Khmer school is required.
                                                    </span>
                                                </div>
                                                <!-- English School Field -->
                                                <div class="mb-3">
                                                    <label for="en_school" class="form-label">English School</label>
                                                    <input type="text" v-model="education.en_school"
                                                        class="form-control"
                                                        :class="{ 'border-danger': vuelidate.education.en_school.$error && vuelidate.education.en_school.$dirty }"
                                                        id="en_school" />
                                                    <span
                                                        v-if="vuelidate.education.en_school.$error && vuelidate.education.en_school.$dirty"
                                                        class="text-danger d-flex align-items-center">
                                                        <i class="fas fa-exclamation-circle me-2"></i>
                                                        English school is required.
                                                    </span>
                                                </div>
                                                <!-- Start Year Field with Flatpickr -->
                                                <div class="mb-3">
                                                    <label for="start_year" class="form-label">Start Year</label>
                                                    <input type="text" v-model="education.start_year"
                                                        class="form-control"
                                                        :class="{ 'border-danger': vuelidate.education.start_year.$error && vuelidate.education.start_year.$dirty }"
                                                        id="start_year" ref="startYear" />
                                                    <span
                                                        v-if="vuelidate.education.start_year.$error && vuelidate.education.start_year.$dirty"
                                                        class="text-danger d-flex align-items-center">
                                                        <i class="fas fa-exclamation-circle me-2"></i>
                                                        Start year is required.
                                                    </span>
                                                </div>
                                                <!-- End Year Field with Flatpickr -->
                                                <div class="mb-3">
                                                    <label for="end_year" class="form-label">End Year</label>
                                                    <input type="text" v-model="education.end_year" class="form-control"
                                                        :class="{ 'border-danger': vuelidate.education.end_year.$error && vuelidate.education.end_year.$dirty }"
                                                        id="end_year" ref="endYear" />
                                                    <span
                                                        v-if="vuelidate.education.end_year.$error && vuelidate.education.end_year.$dirty"
                                                        class="text-danger d-flex align-items-center">
                                                        <i class="fas fa-exclamation-circle me-2"></i>
                                                        End year is required.
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="border-top mt-4">
                                <div class="d-flex justify-content-between mt-3">
                                    <router-link to="/dashboard/educations">
                                        <a class="btn btn-outline-primary pe-4 ps-4">Go back. Education</a>
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
import { required } from '@vuelidate/validators';
import { ref, defineComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import flatpickr from "flatpickr";

export default defineComponent({
    name: 'EducationViewAdd',
    components: {
        Sidebar,
        NavBar,
    },
    setup() {
        const router = useRouter();
        const education = ref({
            km_degree: '',
            en_degree: '',
            km_school: '',
            en_school: '',
            start_year: '',
            end_year: ''
        });
        const rules = {
            education: {
                km_degree: { required },
                en_degree: { required },
                km_school: { required },
                en_school: { required },
                start_year: { required },
                end_year: { required }
            }
        };
        const vuelidate = useVuelidate(rules, { education });
        onMounted(() => {
            flatpickr("#start_year");
            flatpickr("#end_year");
        });

        const addEducation = async () => {
            vuelidate.value.$touch();
            if (vuelidate.value.$invalid) {
                return;
            }
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post('https://cdlapi.chandalen.dev/api/educations', education.value, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log("Education added successfully:", response.data);

                router.push({ name: 'EducationView' });
            } catch (error) {
                console.error("There was an error adding the education:", error);
            }
        };
        return { education, addEducation, vuelidate };
    }
});
</script>

<style scoped>
.text-danger {
    color: #dc3545;
    font-size: 0.875em;
}
</style>
