<template>
    <!-- Modals -->
    <div class="col text-right">
        <base-button type="default" class="btn btn-primary btn-md" @click="showModal()">
            편지쓰기
        </base-button>

        <modal :show.sync="modals.modal1">
            <h2 class="modal-title text-left" id="modal-title-default">받는사람</h2>
            <br>
            <div class="row"  >
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

    let msg = {contents:"", receivedUserId:0, sendUserId:0,isLike:"N"};

    export default {
        components: {
            Modal
        },
        props: {
            user: Object
        },
        data() {
            return {
                message: '',
                checkedNames: [],
                /* children:this.revChildren,*/
                /*user: this.$store.state.user,*/
                modals: {
                    modal1: false
                },
                children: []
            };
        },
        methods: {
            beforeSetting: function(revchildren){
                console.log('ChildrenTable  beforeSetting [Method] ',revchildren);
                this.children = revchildren;
            },
            sendMessage: function(){

                this.checkedNames.forEach(checkedId => {
                    msg.contents = this.message;
                    msg.receivedUserId = checkedId;
                    msg.sendUserId = this.user.userId;


                    this.$http.post(`/message/`, msg,
                        {
                            headers: {
                                Authorization: `Bearer ${this.user.token}`
                                ,'Content-Type':'application/json'
                            }
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
                        });
                });

            }
            ,showModal:function () {
                this.modals.modal1 = true;
            }
        }
    };

</script>
<style>
</style>
