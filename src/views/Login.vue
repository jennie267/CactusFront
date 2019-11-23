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
                                        v-model="model.email">
                            </base-input>

                            <base-input class="input-group-alternative"
                                        placeholder="비밀번호"
                                        type="password"
                                        addon-left-icon="ni ni-lock-circle-open"
                                        v-model="model.password">
                            </base-input>

                            <base-checkbox class="custom-control-alternative">
                                <span class="text-muted">자동로그인</span>
                            </base-checkbox>
                            <div class="text-center">
                                <base-button type="primary" class="my-4" @click="doLogin">로그인</base-button>
                            </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-6">
                        <a href="#" class="text-light"><small>비밀번호를 잊어버리셨나요?</small></a>
                    </div>
                    <div class="col-6 text-right">
                        <router-link to="/register" class="text-light"><small>회원가입</small></router-link>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
  export default {
    name: 'login',
    data() {
      return {
        model: {
          email: '',
          password: ''
        }
      }
    },
      methods: {
          doLogin: function(){
              this.$http.post('/api/user', {
                  id: 1234
                  ,e_mail: this.email
                  ,name: this.pw
              })
                  .then((result) => {
                      console.log(result.data)
                  })
          }
      }
  }
</script>
<style>
</style>
