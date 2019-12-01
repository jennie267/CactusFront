<template>
        <div class="col">
        <input type="button" class="btn btn btn-primary" @click="modals.modal2=true" value="자녀 회원가입">
        <modal :show.sync="modals.modal2">
            <div class="row">
          <img src="img/brand/white.png" style="width:30%;">
            <div id="container" class="card-header bg-transparent row align-items-center">
            <br>
            <h1 class=""><h1 align="center">자녀 회원가입</h1></h1>
            </div>
            <div class="col-lg-12" style="text-align:left">
              <base-input alternative=""
                          label="아이디"
                          placeholder="Id"
                          input-classes="form-control-alternative"
                          v-model="user.id"
              />
            <input style="float:right;" type="button" class="btn btn-sm btn-primary" value="중복 확인">
            </div>
          </div>  
          <div class="row">
              <div class="col-lg-12" style="text-align:left">
                  <base-input alternative=""
                              label="비밀번호"
                              placeholder="Password"
                              input-classes="form-control-alternative"
                              v-model="user.password"
                  />
                  <small>{{ pwValidation }}</small>                
              </div>
          </div>  
          <div class="row">
              <div class="col-lg-12" style="text-align:left">
                  <base-input alternative=""
                              label="비밀번호 확인"
                              placeholder="Password"
                              input-classes="form-control-alternative"
                              v-model="user.passwordchk"
                  />
                  <small>{{ pwCheck }}</small>
              </div>
          </div>
          <div class="row">
              <div class="col-lg-12" style="text-align:left">
                  <base-input alternative=""
                              label="이름"
                              placeholder="Username"
                              input-classes="form-control-alternative"
                              v-model="user.username"
                  />
              </div>
          </div> 
          <div class="row">
            <div class="col-lg-12" style="text-align:left">
                <base-input label="성별">
                    <div class="custom-control custom-radio mb-3">
                        <input name="custom-radio-1" class="custom-control-input" id="customRadio1" type="radio" v-model="user.gender" value="여성">
                        <label class="custom-control-label" for="customRadio1"><span>여성</span></label>
                    </div>
                    <div class="custom-control custom-radio mb-3">
                        <input name="custom-radio-1" class="custom-control-input" id="customRadio2" type="radio" v-model="user.gender" value="남성">
                        <label class="custom-control-label" for="customRadio2"><span>남성</span></label>
                    </div>            
                </base-input>
            </div>
        </div> 
        <br>
        <div class="row">
            <div class="col-lg-12" style="text-align:left">
                <base-input alternative=""
                            label="이메일"
                            placeholder="mail@example.com"
                            input-classes="form-control-alternative"
                            v-model="user.email"
                />
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12" style="text-align:left">
                <base-input alternative=""
                            label="전화번호"
                            placeholder="Phone number"
                            input-classes="form-control-alternative"
                            v-model="user.phoneNumber"
                />
            </div>
        </div>   
        <div class="row">
          <div class="col-lg-12" style="text-align:left">
          <base-input label="생일">
            <div addon-left-icon="ni ni-calendar-grid-58">
                                  </div>
              <flat-pickr slot-scope="{focus, blur}"
                    @on-open="focus"
                    @on-close="blur" 
                    :config="{allowInput: true}"
                    class="form-control datepicker"
                    placeholder="birthday"
                    v-model="user.birthday">
              </flat-pickr>
          </base-input>
          </div>
        </div>
<div class="pl-lg-4">
            <div
                ref="searchWindow"
                :style="searchWindow"
                style="border:1px solid;width:500px;margin:5px 0;position:relative"
                >
                <img
                    src="//t1.daumcdn.net/postcode/resource/images/close.png"
                    id="btnFoldWrap"
                    style="cursor:pointer;position:absolute;right:0px;top:-1px;z-index:1"
                    @click="searchWindow.display = 'none'"
                    alt="close"
                >
            </div>
          </div>
            <div class="row">
                <div class="col-lg-8" style="text-align:left">
                    <base-input alternative=""
                                label="주소"    
                                placeholder="Address"
                                input-classes="form-control-alternative"
                                v-model="user.addrMain"
                    />
                </div>
                <div class="col-lg-4" style="text-align:left">
                    <base-input alternative=""
                                label="우편번호"
                                placeholder="zipCode"
                                input-classes="form-control-alternative"
                                v-model="user.zipCode"
                    />
                <input type="button" style="float:right;" class="btn btn-sm btn-outline-primary" value="우편번호 찾기" @click="execDaumPostcode">
                <post-code-modal></post-code-modal>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12" style="text-align:left">
                    <base-input alternative=""
                                label="상세 주소"
                                placeholder="Address"
                                input-classes="form-control-alternative"
                                v-model="user.addrSub"
                                ref="addressDetail"
                    />
                </div>
            </div>         
        <div class="row">
          <div class="col-lg-12" style="text-align:center">
          <input type="button" class="btn btn btn-primary" @click="modals.modal2=true" value="가입하기">
          </div>
        </div>
        </modal>
        </div>
</template>
<script src="/assets/vendor/bootstrap-datepicker/js/bootstrap-datepicker.min.js"></script>
<script>
import Modal from "@/components/Modal.vue";
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

export default {
  methods : {
    execDaumPostcode() {
      const currentScroll = Math.max(
        document.body.scrollTop,
        document.documentElement.scrollTop,
      );
      new daum.Postcode({
        onComplete: (data) => {
          if (data.userSelectedType === 'R') {
            this.user.addrMain = data.roadAddress;
          } else {
            this.user.addrMain = data.jibunAddress;
          }

          if (data.userSelectedType === 'R') {
            if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
              this.user.addrSub += data.bname;
            }

            if (data.buildingName !== '' && data.apartment === 'Y') {
              this.user.addrSub +=
                this.user.addrSub !== ''
                  ? `, ${data.buildingName}`
                  : data.buildingName;
            }

            if (this.user.addrSub !== '') {
              this.user.addrSub = ` (${this.user.addrSub})`;
            }
          } else {
            this.user.addrSub = '';
          }

          this.user.zipCode = data.zonecode;

          this.$refs.extraAddress.focus();

          this.searchWindow.display = 'none';
          document.body.scrollTop = currentScroll;
        },
        onResize: (size) => {
          this.searchWindow.height = `${size.height}px`;
        },
        width: '100%',
        height: '100%',
      }).embed(this.$refs.searchWindow);

      this.searchWindow.display = 'block';
     },
  },
  components: {
  Modal
  ,flatPickr
  },
  data() {
    return {
      checked:
          []
      ,
      user: {
        id:'',
        name: '',
        password:'',
        passwordchk:'',
        email: '',
        addrMain: '',
        addrSub: '',
        zipCode: '',
        birthday:'',
        phoneNumber:'',
        gender:[],
        type:'CHILD'
      },
      searchWindow: {
      display: 'none',
      height: '300px',
      },
      modals: {
        modal2:false
      }
    };
  },
  computed: {
  pwValidation: function() {
      if(!this.user.password.length==0) {
       return this.user.password.length > 8 ? `` : `[주의] 비밀번호는 8자 이상으로 작성해주세요.`;
      } 
  },
  pwCheck : function() {
      if(!this.user.passwordchk.length==0) {
        if(this.user.password != this.user.passwordchk) {
         return `[주의] 비밀번호가 동일하지 않습니다.`; 
        }
      }
    } 
  }
};
</script>
<style type="text/css">
#container {
  display:table;
  width:125%;
  height:100%;
  text-align: center;
}

#container span {
  display: table-cell;
  vertical-align: middle;
}
</style>