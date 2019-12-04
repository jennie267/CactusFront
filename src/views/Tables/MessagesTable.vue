<template>
    <div class="card shadow"
         :class="type === 'dark' ? 'bg-default': ''">


        <div class="table-responsive">
            <base-table class="table align-items-center table-flush"
                        :class="type === 'dark' ? 'table-dark': ''"
                        :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                        tbody-classes="list"
                        :data="tableData">
                <template slot="columns" style="font-size: 15px;">
                    <th :style="thStyle">일자</th>
                    <th :style="thStyle">이름</th>
                    <th :style="thStyle">내용</th>
                    <th :style="thStyle"></th>
                </template>

                <template slot-scope="{row}">
                    <td class="name" style="font-size: 20px; cursor:pointer" @click.prevent="showModal(row.messageId)">
                        {{row.insertTime}}
                    </td>
                    <td class="name" style="font-size: 20px; cursor:pointer" @click.prevent="showModal(row.messageId)">
                        {{row.sendUserName}}
                        <a href="#" class="avatar avatar-sm rounded-circle">
                            <img alt="" :src="row.sendUserProfileUrl" style="width:90%;">
                        </a>
                    </td>
                    <td class="name" style="font-size: 15px; cursor:pointer" @click.prevent="showModal(row.messageId)">
                        {{row.contents}}
                    </td>

                    <td>
                        <div class="d-flex align-items-center">
                            <i v-if="row.isLike =='Y'" class="ni ni-favourite-28 " style="color: pink;"></i>
                        </div>
                    </td>

                </template>

            </base-table>
        </div>

        <!--    <div class="card-footer d-flex justify-content-end"
                 :class="type === 'dark' ? 'bg-transparent': ''">
              <base-pagination total="30"></base-pagination>
            </div>-->

        <template>
            <!-- Modals -->
            <div class="col text-right">

                <modal :show.sync="modals.modal1">
                    <span class="ni ni-favourite-28 text-right cursor:pointer" v-bind:class="[modalData.isLike ? 'pink' : 'grey']" @click="toggleClass()"></span>
                    <div class="text-left">
                        <h2 slot="header" class="modal-title" id="modal-title-default">일자 : {{modalData.date}}</h2>

                    </div>
                    <br>
                    <div class="text-left">
                        <h2 slot="header" class="modal-title" id="modal-title-default1">이름 :  {{modalData.name}}</h2>
                    </div>
                    <br>

                    <div class="text-left" style="height: 100%">
                        <p class="description"> {{modalData.contents}}</p>
                    </div>
                    <br>
                    <br>
                    <div class="text-right">
                        <base-button type="primary" >답장</base-button>
<!--                        <base-button type="warning" >삭제</base-button>-->
                        <base-button type="neutral" class="ml-auto" @click="modals.modal1 = false">취소
                        </base-button>
                    </div>
                </modal>

            </div>
        </template>

    </div>


</template>
<style>
    .pink{
        color: pink;
    }

    .grey{
        color: grey;
    }
</style>
<script>
    import Modal from "@/components/Modal.vue";
    var moment = require('moment');
    moment().format();

    let messages = [];
    export default {
        name: 'projects-table',
        components: {
            Modal
        },
        props: {
            type: {
                type: String
            },
            user: Object,
            date: String
        },
        computed: {
            thStyle() {
                return {
                    fontSize:'15px'
                };
            }
        },
        methods: {
            toggleClass: function(){
                console.log('모달 데이터', this.modalData);
                // Check value
                if(this.modalData.isLike){

                    this.modalData.isLike = false;
                }else{
                    this.modalData.isLike = true;
                }

            },
            showModal: function(msgId){
                console.log('이름도 가져오나..?',this.sendUserName);
                if (msgId != null){
                    this.$http.get(`/message/`+msgId,  { headers: { Authorization: `Bearer ${this.user.token}` } })
                        .then(res => {
                            this.modalData.name = '이름';
                            this.modalData.contents = res.data.contents;
                            if (res.data.isLike == 'Y') this.modalData.isLike = true;
                            else this.modalData.isLike = false;

                            this.modalData.sendUserId = res.data.sendUserId;
                            this.modalData.date = moment(res.data.insertTime,"YYYY-MM-DDTHH:mm:ssZ").format('YYYY-MM-DD HH:mm');

                        });

                    this.modals.modal1 = true;
                }
            },receiveMsg: function(sendUserId, user){
                this.tableData = [];

                if (sendUserId == 'all'){
                    this.$http.get(`/message/receive/user/`+user.userId,  { headers: { Authorization: `Bearer `+user.token } })
                        .then(res => {
                            res.data.messages.forEach(message =>{
                                message.insertTime = moment(message.insertTime,"YYYY-MM-DDTHH:mm:ssZ").format('YYYY-MM-DD HH:mm');
                                this.tableData.push(message);
                            });

                        });
                }else if(sendUserId != 'all' && sendUserId != null) {
                    this.$http.get(`/message/send/user/`+user.userId+`/`+sendUserId,  { headers: { Authorization: `Bearer `+user.token } })
                        .then(res => {
                            res.data.messages.forEach(message =>{
                                message.insertTime = moment(message.insertTime,"YYYY-MM-DDTHH:mm:ssZ").format('YYYY-MM-DD HH:mm');
                                this.tableData.push(message);
                            });

                        });
                }
            }
        },
        data() {
            return {
                /*user: this.$store.state.user,*/
                isActive: true,
                tableData:messages,
                modals: {
                    modal1: false
                },
                modalData: {
                    date: null,
                    name: null,
                    contents: null,
                    isLike: null,
                    sendUserId: null
                }
            }
        }, mounted () {


        }
    }
</script>
<style>
</style>
