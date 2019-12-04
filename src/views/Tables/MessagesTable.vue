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
                    <td class="name" style="font-size: 20px; cursor:pointer" @click.prevent="showModal(row.messageId, row.sendUserName)">
                        {{row.insertTime}}
                    </td>
                    <td class="name" style="font-size: 20px; cursor:pointer" @click.prevent="showModal(row.messageId, row.sendUserName)">
                        {{row.sendUserName}}
                        <a href="#" class="avatar avatar-sm rounded-circle">
                            <img alt="" :src="row.sendUserProfileUrl" style="width:90%;">
                        </a>
                    </td>
                    <td class="name overText" style="font-size: 15px; cursor:pointer" @click.prevent="showModal(row.messageId, row.sendUserName)">
                       <div class="name overText"> {{row.contents}}</div>
                    </td>

                    <td>
                        <div class="d-flex align-items-center" id="">
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
                        <base-button type="primary" @click="replyMessage(modalData.sendUserId)" >답장</base-button>
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
    let message = {messageId:0,isLike:"N"};
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
                // Check value
                if(this.modalData.isLike){
                    this.modalData.isLike = false;
                }else{
                    this.modalData.isLike = true;
                }
                if (this.modalData.isLike) message.isLike="Y";
                else message.isLike="N";
                message.messageId = this.modalData.messageId;
                this.$http.post(`/message/like/`, message,
                    {
                        headers: {
                            Authorization: `Bearer ${this.user.token}`
                            ,'Content-Type':'application/json'
                        }
                    })
                    .then(res => {
                        console.log('message table  isLike update',res.data);
/*                        if (res.date){
                            if (this.modalData.isLike) this.modalData.isLike = false;
                            else this.modalData.isLike = true;
                        }*/

                    });

            },
            showModal: function(msgId, sendUserName){
                if (msgId != null){
                    this.$http.get(`/message/`+msgId,  { headers: { Authorization: `Bearer ${this.user.token}` } })
                        .then(res => {
                            console.log('Messages Table  showModal : ',res.data);
                            this.modalData.messageId = msgId;
                            this.modalData.name = sendUserName;
                            this.modalData.contents = res.data.contents;
                            this.modalData.receivedUserId = res.data.receivedUserId;
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
            }, replyMessage: function (sendUserID) {
                console.log('[CHILD] Message Table  replyMessage Method : ', sendUserID);
                this.modals.modal1 = false;
                this.$parent.replyMessage(sendUserID);
            }
        },
        data() {
            return {
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
                    sendUserId: null,
                    messageId: null,
                    receivedUserId: null

                }
            }
        }, mounted () {


        }
    }
</script>
<style>

    .overText {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 50%;
        font-size: 20px;
    }


    body span {
        display: block;
    }
</style>
