<template>
    <!-- Modals -->
        <div class="col text-right">
            <base-button type="default" class="btn btn-primary btn-md" @click="modals.modal1 = true">
                편지쓰기
            </base-button>

            <modal :show.sync="modals.modal1">
                <h2 class="modal-title text-left" id="modal-title-default">받는사람</h2>
                <br>
                <div class="row" >
               <!--<div v-for="child in children" :key="child.id"  class="col custom-control custom-checkbox text-left" >-->
                <div v-for="child in children" :key="child.userId"  class="custom-control custom-checkbox text-left" style="margin-right: 6%;" >
                    <input class="custom-control-input" type="checkbox" :id="child.userId" :value="child.userId" v-model="checkedNames">
                    <label class="custom-control-label" :for="child.userId">{{child.name}}</label>
                </div>

                    <!--        <div class="custom-control custom-checkbox text-left" style="margin-right: 6%;" >
                    <input class="custom-control-input" type="checkbox" id="김은아1" value="김은아" v-model="checkedNames">
                    <label class="custom-control-label" for="김은아1">김은아</label>
                    </div>
                    -->
                </div>

                <br>
                <form>
                    <textarea class="form-control" style="width: 100%;height: 100px;" v-model="message" placeholder="내용을 입력하세요."></textarea>
                </form>
                <br>
                <div class="text-right">
                    <base-button type="primary" @click.prevent="sendMessage()">전송</base-button>
                    <base-button type="neutral" class="ml-auto" @click="modals.modal1 = false" >취소
                    </base-button>
                </div>
            </modal>
        </div>
</template>
<script>
import Modal from "@/components/Modal.vue";

let children = [];
let msg = {contents:"", receivedUserId:0, sendUserId:0,isLike:"N"};
export default {
  components: {
    Modal
  },
  data() {
    return {
        message: '',
        checkedNames: [],
        children:children,
        user: this.$store.state.user,
      modals: {
          modal1: false
      }
    };
  },
    methods: {
        sendMessage: function(){


            console.log('들어옴', this.message);
            console.log('들어옴', this.user.userId);
            console.log('들어옴', this.checkedNames);

            this.checkedNames.forEach(checkedId => {
                msg.contents = this.message;
                msg.receivedUserId = checkedId;
                msg.sendUserId = this.user.userId;

                console.log('메시지 : ' ,msg);


                this.$http.post(`/api/message/`, msg,
                    {
                        headers: {
                            Authorization: `Bearer ${this.user.token}`
                            ,'Content-Type':'application/json'
                        },
/*                        data: {
                            "contents": "안녕"
                            , "receivedUserId": 3
                            , "sendUserId": 12
                        }*/
                })
                    .then(res => {
                        if (res != null){
                            this.modals.modal1 = false;
                            // Use sweetalert2
                            this.$swal({
                                type: 'success',
                                title: '전송 성공했습니다.'
                            });

                        }else {
                            this.$swal({
                                type: 'warning',
                                title: '전송 실패했습니다.'
                            });
                        }
                        console.log(res);
                        console.log(res.data);
                    });
            });

        }
    },
    created () {
        this.$http.get(`/api/user/children/${this.user.userId}`,  { headers: { Authorization: `Bearer ${this.user.token}` } })
            .then(res => {
                children = [];
                console.log(res.data);
                res.data.users.forEach(child => children.push(child));

            });
    }
};

</script>
<style>
</style>
