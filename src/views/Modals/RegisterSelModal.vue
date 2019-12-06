<template>
        <div class="col">
        <div style="text-align:right;">
          <a href="#" class="text-light" @click="modals.modal1=true">
              <small>
              회원가입
          </small>
          </a>
        </div>
        <modal :show.sync="modals.modal1">
            <h2 slot="header" class="modal-title " id="modal-title-default" align="center"><i class="ni ni-badge"></i>    회원가입 </h2><br>
<!--            <div style="margin-bottom: 10%;">-->
            <div class="body">
                <div class="up">
                    <div class="left ">
                        <div class="card-profile-image row-grid ">
                            <img src="img/theme/userType1.jpg" style="border:1.2px dashed gray" width="120" height="120">
                        </div>
                    </div>
                    <div class="right">
                        <div class="card-profile-image">
                            <img src="img/theme/userType2.jpg"  style="border:1.2px dashed gray"  width="120" height="120">
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer down">
                <div class="left">
                    <register-old-modal></register-old-modal>
                </div>
                <div class="right">
                    <register-modal></register-modal>
                </div>
            </div>
            <div class="logo">
                <img src="img/brand/white.png" style="width:30%;">
            </div>
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
      checked:[],
      modals: {
        modal1:false
      }
    }
  }
}
</script>
<style>
.box_1 {
    float:left; height:100px;
    padding-left:10%;
    }
.box_2 {
    display:inline-block; height:100px; margin-left:10px;
    padding-right:10%;
    }


 .body {
     width: 100%;
     height: 60px;

 }
div.left {
    width: 50%;
    float: left;
    box-sizing: border-box;
    text-align: center;

}
div.right {
    width: 50%;
    float: right;
    box-sizing: border-box;
    text-align: center;

}

.down {
    text-align: center;
}

.modal-content{
    height:330px;
}

.logo {
    text-align: right;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 15px 0;
}
</style>
