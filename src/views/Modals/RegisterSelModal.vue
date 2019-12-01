<template>
        <div class="col">
        <a href="#" class="text-light" @click="modals.modal1=true"><small>회원가입</small></a>
        <modal :show.sync="modals.modal1">
            <h2 slot="header" class="modal-title" id="modal-title-default" align="center">회원가입 </h2><br>
            <div style="margin-bottom: 10%;"> 
            <div class="box_1" >
                <div class="card-profile-image">
                        <a href="#">
                          <img src="img/theme/userType1.jpg" style="border:1.2px dashed gray" width="120" height="120">
                        </a>
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                    <register-old-modal></register-old-modal>
                      </div>
                      <div class="row my-7">
                    </div>
            </div>
            <!--
            <div class="headerDivider"></div>
            -->
            <div class="box_2">
                    <div class="card-profile-image">
                        <a href="#">
                            <img src="img/theme/userType2.jpg"  style="border:1.2px dashed gray"  width="120" height="120">
                        </a>
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                        <register-modal></register-modal>
                      </div>
                      <div class="row my-7">
                      </div>        
                  </div>
            </div> 
        <img src="img/brand/white.png" style="width:30%;">
        </modal>
        </div>
</template>
<script>
import Modal from "@/components/Modal.vue";
import RegisterModal from '../Modals/RegisterModal';
import RegisterOldModal from '../Modals/RegisterOldModal';
export default {
  components: {
    Modal,
    RegisterModal,
    RegisterOldModal
  },
    data() {
      return {
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
          gender:[]
        },
        modals: {
          modal1:false
        }
      };
   }
};
</script>
<style>
.headerDivider {
     border-left:0.5px solid #38546d; 
     border-right:0.5px solid #16222c; 
     height:200px;
     position:absolute;
     right:249px;
     top:10px; 
}
.box_1 {
    float:left; height:100px;
    padding-left:10%;
    }
.box_2 {
    display:inline-block; height:100px; margin-left:10px;
    padding-right:10%;
    }   
</style>