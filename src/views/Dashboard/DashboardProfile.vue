<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8">
        </base-header>
        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col-xl-8 order-xl-1">
                    <div class="card card-profile shadow">
                        <div class="row justify-content-center">
                            <div class="col-lg-3 order-lg-2">
                                <div class="card-profile-image">
                                    <a>
                                        <img v-if="typeof user.profileUrl=='undefined' || user.profileUrl===''" src="img/theme/typeUser.jpg" class="rounded-circle">
                                        <img v-else :src="user.profileUrl" class="rounded-circle">
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                            <div class="d-flex justify-content-between">
                            </div>
                        </div>
                        <div class="card-body pt-0 pt-md-4 mt-5">
                            <div class="text-center">
                                <h1>{{user.name}}</h1>
                                <h2>{{user.tel}}</h2>
                                <h2>{{user.addrMain}} {{user.addrSub}}</h2>
                                <h2>{{user.email}}</h2>
                                <h2>{{user.birthday}}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        props: {
            user: Object
        }
    }
</script>

<style scoped>

</style>