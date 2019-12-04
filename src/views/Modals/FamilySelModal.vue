<template>
        <div class="col">
        <input style="float: right;" @click="modals.modal1=true" class="btn btn btn-outline-primary" value="내 가족 추가">
        <modal :show.sync="modals.modal1">
          <h2 class="modal-title text-left" id="modal-title-default">내 가족 추가</h2>
          <form class="s-form">
            <div class="row">
              <div class="col-lg-8">
                  <base-input
                  />
              </div>
            </div>
          </form>
        </modal>
        </div>
</template>
<script>
import Modal from "@/components/Modal.vue";
let parents = [];
export default {
  mounted () {
    this.$http.get(`/user/parents/${this.user.userId}`,  { headers: { Authorization: `Bearer ${this.user.token}` } })
        .then(res => {
            parents = [];
            console.log(res.data);
            res.data.users.forEach(par => parents.push(par));

        });
  },
  components: {
    Modal,
  },
  data() {
    return {
      parents:parents,
      user: this.$store.state.user,
      checked:[],
      modals: {
        modal1:false
      }
    }
  }
}
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
</style>