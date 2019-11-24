<template>
    <div>
        <base-header style="min-height: 250px;">
        </base-header>
        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col-xl-8 order-xl-1">
                    <div class="card card-profile shadow">
                        <div class="row justify-content-center">
                            <div class="col-lg-3 order-lg-2">
                                <div class="card-profile-image">
                                    <a href="#">
                                        <img src="img/theme/team-4-800x800.jpg" class="rounded-circle">
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                            <div class="d-flex justify-content-between">
                            </div>
                        </div>
                        <div class="card-body pt-0 pt-md-4">
                            <div class="row">
                                <div class="col">
                                    <div class="card-profile-stats d-flex justify-content-center mt-md-5">
                                        <div>
                                            <span class="heading">7</span>
                                            <span class="description"><div class="ni ni-bell-55"></div></span>
                                        </div>
                                        <div>
                                            <span class="heading">89</span>
                                            <span class="description"><div class="ni ni-email-83"></div></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="text-center">
                                <h2>이근환</h2>
                                 <a href="#!" class="btn btn-sm btn-primary, ni ni-image"> 프로필 사진 수정  </a>
                            </div>
                        </div>
                    </div>
                    <card shadow type="secondary">
                        <div slot="header" class="bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">내 정보</h3>
                                </div>
                            </div>
                        </div>
                        <template>
                            <form @submit.prevent>
                                <div class="pl-lg-4">
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="아이디"
                                                        placeholder="Id"
                                                        input-classes="form-control-alternative"
                                                        v-model="user.id"
                                            />
                                             <v-btn  class="btn btn-success">중복확인</v-btn>
                                        </div>
                                    </div>                                    
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="비밀번호"
                                                        placeholder="Password"
                                                        input-classes="form-control-alternative"
                                                        v-model="user.password"
                                            />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="비밀번호 확인"
                                                        placeholder="Password"
                                                        input-classes="form-control-alternative"
                                                        v-model="user.passwordchk"
                                            />
                                        </div>
                                    </div>
                                    <hr class="my-4"/>
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="이름"
                                                        placeholder="Username"
                                                        input-classes="form-control-alternative"
                                                        v-model="user.name"
                                            />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <base-input label="성별">
                                            <div class="custom-control custom-checkbox">
                                                <input type="checkbox" id="jb-checkbox" class="custom-control-input">
                                                <label class="custom-control-label" for="jb-checkbox">여성</label>
                                            </div>
                                            <div class="custom-control custom-checkbox">
                                                <input type="checkbox" id="jb-checkbox" class="custom-control-input">
                                                <label class="custom-control-label" for="jb-checkbox">남성</label>
                                            </div>
                                            </base-input>
                                        </div>
                                    </div>
                                    <br>
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="이메일"
                                                        placeholder="mail@example.com"
                                                        input-classes="form-control-alternative"
                                                        v-model="user.email"
                                            />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="전화번호"
                                                        placeholder="Phone number"
                                                        input-classes="form-control-alternative"
                                                        v-model="user.phoneNumber"
                                            />
                                        </div>
                                    </div>                                    
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="생일"
                                                        placeholder="Birthday"
                                                        input-classes="form-control-alternative"
                                                        type="date"
                                                        v-model="user.birthday"
                                            />
                                        </div>
                                    </div>                                    
                                </div>
                                <div class="pl-lg-4">
                                    <div class="row">
                                        <div class="col-lg-4">
                                            <base-input alternative=""
                                                        label="주소"
                                                        placeholder="Address"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.address"
                                            />
                                        </div>
                                        <div class="col-lg-4">
                                            <base-input alternative=""
                                                        label="우편번호"
                                                        placeholder="zipCode"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.zipCode"
                                            />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <base-input alternative=""
                                                        label="상세 주소"
                                                        placeholder="Address"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.addressDetail"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <hr class="my-4"/>
                                <div class="col-4 text-right" style="float:right;">
                                    <a href="#!" class="btn btn btn-primary">저장</a>
                                </div>
                            </form>
                        </template>
                    </card>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import Datetime from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
export default {
    name: 'user-profile',
    data() {
      return {
        user: {
          id: '',
          password: '',
          name: '',
          email: '',
          address: '',
          addressDetail: '',
          zipCode: '',
          birthday: '',
          phoneNumber: '',
        }
      }
    },
};

Vue.use(Datetime)
</script>
<style>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>