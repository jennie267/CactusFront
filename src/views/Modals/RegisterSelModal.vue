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
            <div class="body">
                <div class="up">
                    <div class="left ">
                        <div class="card-profile-image row-grid ">
                            <img src="img/theme/userType1.jpg" style="border:1.2px dashed gray" width="120" height="120" @click="openSingUpModal('PARENT')">
                        </div>
                    </div>
                    <div class="right">
                        <div class="card-profile-image">
                            <img src="img/theme/userType2.jpg"  style="border:1.2px dashed gray"  width="120" height="120" @click="openSingUpModal('CHILD')">
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer down">
                <div class="left">
                    <input type="button" class="btn btn btn-primary" @click="openSingUpModal('PARENT')" value="부모회원">
                </div>
                <div class="right">
                    <input type="button" class="btn btn btn-primary" @click="openSingUpModal('CHILD')" value="자녀회원">
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
export default {
  components: {
    Modal
  },
  data() {
    return {
      checked:[],
      modals: {
        modal1:false
      }
    }
  },
    methods: {
        openSingUpModal(userType){
            this.modals.modal1=false;
            this.$parent.openSignUpModal(userType);
        }
    }
}
</script>



<style>

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
    height: 140px;
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
