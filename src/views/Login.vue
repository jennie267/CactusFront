<template>

        <div class="row justify-content-end" style="min-height: 600px;">
            <div class="col-lg-3 col-md-5">
                <div class="card bg-secondary shadow border-0" style="background-color: #e8ebeccc !important;">
                    <div class="card-body px-lg-5 py-lg-5">
                        <div class="collapse-brand" style="text-align: center;padding: 10px;">
                            <router-link to="/">
                                <img src="img/brand/white.png" style="width:80%;">
                            </router-link>
                        </div>
                            <base-input class="input-group-alternative mb-3"
                                        placeholder="아이디"
                                        addon-left-icon="ni ni-email-83"
                                        v-model="user.id">
                            </base-input>

                            <base-input class="input-group-alternative"
                                        placeholder="비밀번호"
                                        type="password"
                                        addon-left-icon="ni ni-lock-circle-open"
                                        v-model="user.password">
                            </base-input>
                            <div class="text-center">
                                <base-button type="primary" class="my-4" @click="doLogin">로그인</base-button>
                            </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <register-sel-modal ref="selectUserType"></register-sel-modal>
                </div>
                <div class="row mt-3">
                    <register-old-modal ref="parentModal"></register-old-modal>
                </div>
                <div class="row mt-3">
                    <register-modal ref="childModal"></register-modal>
                </div>
            </div>
        </div>
</template>
<script>
import RegisterSelModal from './Modals/RegisterSelModal'
import RegisterOldModal from './Modals/RegisterOldModal'
import RegisterModal from './Modals/RegisterModal'
  export default {
    name: 'login',
    components: {
        RegisterSelModal,
        RegisterOldModal,
        RegisterModal
    },
    data() {
      return {
        user: {
            id: '',
            password: ''
        }
      }
    },
      methods: {
        doLogin(){
            this.$http.get('/user/login/'+this.user.id+'/'+this.user.password)
                .then((result) => {
                    this.$store.state.user = result.data
                    this.$router.push("/main")
                })
        },
          openSignUpModal(userType){
            if (userType == 'PARENT') this.$refs.parentModal.openModal();
            else if (userType == 'CHILD') this.$refs.childModal.openModal();

          }
      }
  }
</script>
<style>
</style>
