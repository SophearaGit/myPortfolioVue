<template>
    <nav class="navbar-vertical navbar">
        <div class="vh-100" data-simplebar>
            <!-- Brand logo -->
            <a class="navbar-brand" href="#">
                <img src="../../assets/images/brand/logo/logo-inverse.svg" alt="Geeks" />
            </a>
            <!-- Navbar nav -->
            <ul class="navbar-nav flex-column" id="sideNavbar">
                <li class="nav-item">
                    <a class="nav-link  collapsed " href="#" data-bs-toggle="collapse" data-bs-target="#navDashboard"
                        aria-expanded="false" aria-controls="navDashboard">
                        <i class="nav-icon fe fe-home me-2"></i>
                        Dashboard
                    </a>
                    <div id="navDashboard" class="collapse " data-bs-parent="#sideNavbar">
                        <ul class="nav flex-column">
                            <li class="nav-item">
                                <a class="nav-link " href="../../pages/dashboard/admin-dashboard.html">Overview</a>
                            </li>
                            <!-- Nav item -->
                            <li class="nav-item">
                                <a class="nav-link " href="../../pages/dashboard/dashboard-analytics.html">Analytics</a>
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
    mounted() {
        
    },
    methods: {
        
    }

}
</script>

<style scoped></style>