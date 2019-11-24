<template>
    <!-- Modals -->
        <div class="col text-right">
            <base-button type="default" class="btn btn-primary btn-md" @click="modals.modal1 = true">
                편지쓰기
            </base-button>

            <modal :show.sync="modals.modal1">
                <h2 class="modal-title text-left" id="modal-title-default">받는사람</h2>
                <br>
                <div class="text-left">
                    <input type="checkbox" id="이지수" value="이지수" v-model="checkedNames">
                    <label for="이지수">이지수</label>
                    <input type="checkbox" id="김은아" value="김은아" v-model="checkedNames">
                    <label for="김은아">김은아</label>
                    <input type="checkbox" id="김남현" value="김남현" v-model="checkedNames">
                    <label for="김남현">김남현</label>
                    <input type="checkbox" id="김정우" value="김정우" v-model="checkedNames">
                    <label for="김정우">김정우</label>
                    <br>
                </div>
                <br>
                <div class="text-left">
                    <textarea style="width: 100%;height: 100px;" v-model="message" placeholder="내용을 입력하세요."></textarea>
                </div>
                <div class="text-right">
                    <base-button type="primary" >전송</base-button>
                    <base-button type="neutral" class="ml-auto" @click="modals.modal1 = false" >취소
                    </base-button>
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
        message: [],
        checkedNames: [],
      modals: {
          modal1: false
      }
    };
  }
};

</script>
<style>
</style>
