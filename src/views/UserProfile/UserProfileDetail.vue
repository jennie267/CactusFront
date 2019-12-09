<template>
    <!-- Modals -->
    <div class="card shadow text-center">
        <div class="card-header box4Header2">
            <div class="row">
                <h3 v-if="chkUser.userId == null && user.type == 'PARENT'" class="mb-0 todaySchHeaderStr"><h1 class="ni ni-single-02 todaySchHeaderStr"></h1> 자녀목록에서 자녀를 선택해주세요.</h3>
                <h3 v-if="chkUser.userId == null && user.type == 'CHILD'" class="mb-0 todaySchHeaderStr"><h1 class="ni ni-single-02 todaySchHeaderStr"></h1> 부모목록에서 부모를 선택해주세요.</h3>
                <h3 v-if="chkUser.userId != null"  class="mb-0 todaySchHeaderStr"><h1 class="ni ni-single-02 todaySchHeaderStr"></h1> {{chkUser.name}}</h3>

            </div>
        </div>
        <div class="cactusProfile">
            <a>
<!--                <img v-if="typeof chkUser.profileUrl=='undefined' || chkUser.profileUrl===''" src="img/theme/typeUser.jpg" class="rounded-circle">-->
                <img  :src="chkUser.profileUrl" class="rounded-circle">
            </a>
        </div>
        <div class="text-center">
            <h1>{{chkUser.name}}</h1>
            <h2>{{chkUser.tel}}</h2>
            <h2>{{chkUser.addrMain}} {{chkUser.addrSub}}</h2>
            <h2>{{chkUser.email}}</h2>
            <h2>{{chkUser.birthday}}</h2>
        </div>

        <base-button style="background-color: #3a6fa0; border-color: #3a6fa0" v-if="chkUser.userId != null" class="" @click="deleteUser(chkUser.userId)">삭제</base-button>

    </div>
</template>
<script>


    export default {
        data() {
            return {
            }
        },
        props: {
            user: Object,
            chkUser: Object
        },
        methods: {
            deleteUser(chkUserId) {
                console.log('유저 삭제');

                if (this.user.type == 'PARENT'){
                    this.$http.post('/user/del/child/'+this.user.userId+'/'+chkUserId, null, { headers: { Authorization: `Bearer ${this.user.token}` } })
                        .then(res => {
                            if (res == null) {
                                this.$swal({
                                    type: 'warning',
                                    title: '삭제 실패했습니다.'
                                });
                            } else {
                                this.$swal({
                                    type: 'success',
                                    title: '삭제했습니다.'
                                });
                                this.$parent.$refs.childTable.getChildren();
                            }
                        });

                } else if (this.user.type == 'CHILD'){
                    this.$http.post('/user/del/parent/'+chkUserId+'/'+this.user.userId, null, { headers: { Authorization: `Bearer ${this.user.token}` } })
                        .then(res => {
                            if (res == null) {
                                this.$swal({
                                    type: 'warning',
                                    title: '삭제 실패했습니다.'
                                });
                            } else {
                                this.$swal({
                                    type: 'success',
                                    title: '삭제했습니다.'
                                });
                                this.$parent.$refs.parentT.getParents();

                            }
                        });

                }


            }
        }
    }

</script>
<style>
    .cactusProfile img {
        max-width: 180px;
    }
</style>
