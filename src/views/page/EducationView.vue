<template>
    <div id="db-wrapper">
        <!-- Sidebar -->
        <Sidebar />
        <!-- Page Content -->
        <main id="page-content">
            <div class="header">
                <!-- Navbar -->
                <NavBar />
            </div>
            <!-- Container fluid -->
            <section class="container-fluid p-4">
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-12">
                        <!-- Page header -->
                        <div class="border-bottom pb-3 mb-3">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <h1 class="mb-1 h2 fw-bold">Education</h1>
                                    <!-- Breadcrumb -->
                                    <nav aria-label="breadcrumb">
                                        <ol class="breadcrumb">
                                            <li class="breadcrumb-item">
                                                <router-link to="/dashboard">Dashboard</router-link>
                                            </li>
                                            <li class="breadcrumb-item active" aria-current="page">
                                                Education
                                            </li>
                                        </ol>
                                    </nav>
                                </div>
                                <div>
                                    <router-link to="/dashboard/educations/add">
                                        <a class="btn btn-primary me-2">Add New Education</a>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 col-12 mb-5">
                        <div class="card">
                            <!-- Card header with search input -->
                            <div class="card-header d-flex justify-content-between align-items-center">
                                <div>
                                    <h4 class="mb-1">Education List</h4>
                                    <p class="mb-0">Display all education records with additional information</p>
                                </div>
                                <div>
                                    <input v-model="searchQuery" type="search" class="form-control"
                                        placeholder="Search (Degree, School)">
                                </div>
                            </div>
                            <!-- Table -->
                            <div class="card-body mb-2 pb-0">
                                <div class="table-card">
                                    <table class="table table-hover" style="width: 100%">
                                        <thead class="table-light">
                                            <tr>
                                                <th>Id</th>
                                                <th>Degree (EN)</th>
                                                <th>Degree (KM)</th>
                                                <th>School (EN)</th>
                                                <th>School (KM)</th>
                                                <th>Start Year</th>
                                                <th>End Year</th>
                                                <th class="text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-if="loading">
                                                <td colspan="8" class="text-center">
                                                    <div class="spinner-border text-primary" role="status">
                                                        <span class="visually-hidden">Loading...</span>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr v-else-if="filteredEducations.length === 0">
                                                <td colspan="8" class="text-center">No Data Available!</td>
                                            </tr>
                                            <tr v-for="education in filteredEducations" :key="education.id">
                                                <td>{{ education.id }}</td>
                                                <td>{{ education.en_degree }}</td>
                                                <td>{{ education.km_degree }}</td>
                                                <td>{{ education.en_school }}</td>
                                                <td>{{ education.km_school }}</td>
                                                <td>{{ education.start_year }}</td>
                                                <td>{{ education.end_year }}</td>
                                                <td align="center">
                                                    <button class="btn btn-danger btn-sm"
                                                        @click="confirmDelete(education.id)">Delete</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
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

export default {
    name: 'Education',
    data() {
        return {
            educations: [],
            searchQuery: '',
            loading: true
        }
    },
    components: {
        Sidebar,
        NavBar,
    },
    computed: {
        filteredEducations() {
            return this.educations.filter((education) => {
                const searchTerm = this.searchQuery.toLowerCase();
                return (
                    education.en_degree.toLowerCase().includes(searchTerm) ||
                    education.km_degree.toLowerCase().includes(searchTerm) ||
                    education.en_school.toLowerCase().includes(searchTerm) ||
                    education.km_school.toLowerCase().includes(searchTerm)
                );
            });
        }
    },
    created() {
        this.getEducation();
    },
    methods: {
        async getEducation() {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`https://cdlapi.chandalen.dev/api/educations`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                this.educations = response.data.data;
            } catch (error) {
                console.error("Error fetching education data:", error);
            } finally {
                this.loading = false;
            }
        },
        async deleteEducation(educationId) {
            const token = localStorage.getItem('token');
            try {
                await axios.delete(`https://cdlapi.chandalen.dev/api/educations/${educationId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                this.educations = this.educations.filter(education => education.id !== educationId);
            } catch (error) {
                console.error("Error deleting education:", error);
            }
        },
        confirmDelete(educationId) {
            if (confirm("Are you sure you want to delete this education record?")) {
                this.deleteEducation(educationId);
            }
        }
    }
}
</script>

<style scoped>
.table-card {
    overflow-x: auto;
}
.table {
    border: none;
}
.table thead th,
.table tbody td {
    border-bottom: none;
}
.spinner-border {
    width: 2rem;
    height: 2rem;
}
</style>
