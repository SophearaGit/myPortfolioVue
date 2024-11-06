<template>
    <nav class="navbar-vertical navbar">
        <div class="vh-100" data-simplebar>
            <!-- Brand logo -->
            <a class="navbar-brand" href="../../index.html">
                <img src="../../assets/images/brand/logo/logo-inverse.svg" alt="Geeks" />
            </a>
            <!-- Navbar nav -->
            <ul class="navbar-nav flex-column" id="sideNavbar">
                <li class="nav-item">
                    <router-link to="/dashboard">
                        <a class="nav-link" :class="{ active: isActive('/dashboard') }" data-bs-toggle="collapse"
                            data-bs-target="#navDashboard" aria-expanded="false" aria-controls="navDashboard">
                            <i class="nav-icon fe fe-home me-2"></i>
                            Dashboard
                        </a>
                    </router-link>
                    <div id="navDashboard" class="collapse show" data-bs-parent="#sideNavbar">
                        <ul class="nav flex-column">
                            <!-- Nav item -->
                            <li class="nav-item">
                                <router-link to="/dashboard/contact-me">
                                    <a class="nav-link"
                                        :class="{ active: isActive(['/dashboard/contact-me', '/dashboard/contact-me/add']) }">
                                        Contact Me
                                    </a>
                                </router-link>
                            </li>
                            <!-- Nav item -->
                            <li class="nav-item">
                                <router-link to="/dashboard/educations">
                                    <a class="nav-link"
                                        :class="{ active: isActive(['/dashboard/educations', '/dashboard/educations/add']) }">
                                        Educations
                                    </a>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>

export default {
    name: 'NavbarVertical',
    data() {
        return {

        }
    },
    methods: {
        isActive(routes) {
            return routes.includes(this.$route.path);
        }
    }

}
</script>

<style scoped></style>