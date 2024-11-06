<template>
    <div class="col-12">
        <div class="rounded-top"
            style="background: url(../assets/images/background/profile-bg.jpg) no-repeat; background-size: cover; height: 100px">
        </div>
        <div class="card px-4 pt-2 pb-4 shadow-sm rounded-top-0 rounded-bottom-0 rounded-bottom-md-2">
            <div class="d-flex align-items-end justify-content-between">
                <div class="d-flex align-items-center">
                    <div class="me-2 position-relative d-flex justify-content-end align-items-end mt-n5">
                        <img alt="avatar" :src="user.avatar"
                            class="avatar-xl rounded-circle border border-4 border-white" />
                    </div>
                    <div class="lh-1">
                        <h2 class="mb-0">{{ user.name }}</h2>
                        <p class="mb-0 d-block">@{{ user.name }}</p>
                    </div>
                </div>
                <router-link to="/dashboard">
                    <a class="btn btn-primary btn-sm d-none d-md-block">Back to Dashboard</a>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>


export default {
    name: 'UserInformation',
    data() {
        return {

        }
    },

}
</script>

<style scoped></style>