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
                                    <h1 class="mb-1 h2 fw-bold">Contacts</h1>
                                    <!-- Breadcrumb -->
                                    <nav aria-label="breadcrumb">
                                        <ol class="breadcrumb">
                                            <li class="breadcrumb-item">
                                                <router-link to="/dashboard">Dashboard</router-link>
                                            </li>
                                            <li class="breadcrumb-item active" aria-current="page">Contacts</li>
                                        </ol>
                                    </nav>
                                </div>
                                <div>
                                    <router-link to="/dashboard/contact-me/add">
                                        <a class="btn btn-primary me-2">Add New Contacts</a>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <!-- Basic table -->
                    <div class="col-md-12 col-12 mb-5">
                        <div class="card">
                            <!-- Card header with search input -->
                            <div class="card-header d-flex justify-content-between align-items-center">
                                <div>
                                    <h4 class="mb-1">Table Contacts</h4>
                                    <p class="mb-0">Display all contacts with additional information</p>
                                </div>
                                <div>
                                    <input v-model="searchQuery" id="search" type="search" class="form-control"
                                        placeholder="Search (Name, Email)">
                                </div>
                            </div>
                            <!-- Table -->
                            <div class="card-body mb-2 pb-0">
                                <div class="table-card">
                                    <table class="table table-hover" style="width: 100%">
                                        <thead class="table-light">
                                            <tr>
                                                <th>Id</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Phone</th>
                                                <th>Subject</th>
                                                <th>Message</th>
                                                <th class="text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-if="loading">
                                                <td colspan="7" class="text-center">
                                                    <div class="spinner-border" role="status">
                                                        <span class="visually-hidden">Loading...</span>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr v-if="contacts.length === 0 && !loading">
                                                <td colspan="7" class="text-center">No Data Available!</td>
                                            </tr>
                                            <tr v-for="contact in contacts" :key="contact.id">
                                                <td>{{ contact.id }}</td>
                                                <td>{{ contact.name }}</td>
                                                <td>{{ contact.email }}</td>
                                                <td>{{ contact.phone }}</td>
                                                <td>{{ contact.subject }}</td>
                                                <td>{{ contact.message }}</td>
                                                <td align="center">
                                                    <button class="btn btn-danger btn-sm"
                                                        @click="confirmDelete(contact.id)">Delete</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="card-footer border-0" v-if="pagination.has_page">
                                <nav class="d-flex justify-content-end">
                                    <ul class="pagination pt-2">
                                        <li v-if="pagination.on_first_page" class="page-item disabled">
                                            <span class="page-link" aria-hidden="true">&lsaquo;</span>
                                        </li>
                                        <li v-else class="page-item">
                                            <a class="page-link" role="button"
                                                @click="onGoPage(pagination.current_page - 1)">&lsaquo;</a>
                                        </li>
                                        <li v-if="pagination.current_page - 2 > 0" class="page-item"
                                            @click="onGoPage(1)">
                                            <span class="page-link">1</span>
                                        </li>
                                        <li v-if="pagination.current_page - 3 > 0" class="page-item"><span
                                                class="page-link">...</span></li>
                                        <li v-if="pagination.current_page - 1 > 0" class="page-item"
                                            :class="{ active: pagination.current_page == pagination.current_page - 1 }"
                                            @click="onGoPage(pagination.current_page - 1)">
                                            <span class="page-link">{{ pagination.current_page - 1 }}</span>
                                        </li>
                                        <li class="page-item active">
                                            <span class="page-link">{{ pagination.current_page }}</span>
                                        </li>
                                        <li v-if="pagination.current_page + 1 < pagination.last_page" class="page-item"
                                            :class="{ active: pagination.current_page == pagination.current_page + 1 }"
                                            @click="onGoPage(pagination.current_page + 1)">
                                            <span class="page-link">{{ pagination.current_page + 1 }}</span>
                                        </li>
                                        <li v-if="pagination.current_page + 3 <= pagination.last_page"
                                            class="page-item"><span class="page-link">...</span></li>
                                        <li v-if="pagination.current_page + 1 <= pagination.last_page" class="page-item"
                                            :class="{ active: pagination.current_page == pagination.last_page }"
                                            @click="onGoPage(pagination.last_page)">
                                            <span class="page-link">{{ pagination.last_page }}</span>
                                        </li>
                                        <li v-if="pagination.has_more_pages" class="page-item">
                                            <a class="page-link" role="button"
                                                @click="onGoPage(pagination.current_page + 1)">&rsaquo;</a>
                                        </li>
                                        <li v-else class="page-item disabled"><span class="page-link"
                                                aria-hidden="true">&rsaquo;</span></li>
                                    </ul>
                                </nav>
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
    name: 'ContactMe',
    data() {
        return {
            contacts: [],
            searchQuery: '',
            loading: false,
            pagination: {
                current_page: 1,
                last_page: null,
                has_page: false,
                on_first_page: true,
                has_more_pages: false,
                per_page: 10,
                total: 0,
            },
        }
    },
    components: {
        Sidebar,
        NavBar,
    },
    watch: {
        searchQuery(newQuery) {
            this.getContacts(1, newQuery);
        },
    },
    created() {
        this.getContacts();
    },
    methods: {
        async onGoPage(page) {
            this.pagination.current_page = page;
            await this.getContacts(page);
        },
        async getContacts(page = 1, search = '') {
            const token = localStorage.getItem('token');
            const perPage = this.pagination.per_page || 10;
            this.loading = true;
            try {
                const response = await axios.get(`https://cdlapi.chandalen.dev/api/contacts?page=${page}&per_page=${perPage}&search=${search}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                this.contacts = response.data.data;
                this.pagination = { ...response.data.paginate };
            } catch (error) {
                console.error("Error fetching contacts:", error);
            } finally {
                this.loading = false;
            }
        },
        async deleteContact(contactId) {
            const token = localStorage.getItem('token');
            try {
                await axios.delete(`https://cdlapi.chandalen.dev/api/contacts/${contactId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                await this.getContacts(this.pagination.current_page);
            } catch (error) {
                console.error("Error deleting contact:", error);
            }
        },
        confirmDelete(contactId) {
            if (confirm("Are you sure you want to delete this contact?")) {
                this.deleteContact(contactId);
            }
        },
    }
}
</script>

<style scoped>
.table-card {
    border: none;
}
.card {
    border-bottom: none;
}
.table thead th,
.table tbody td {
    border-bottom: none;
}
.table-hover tbody tr:hover {
    background-color: rgba(0, 123, 255, 0.1);
}
.pagination {
    margin: 0;
}
.card-footer {
    padding: 0.5rem 1rem;
}
</style>
