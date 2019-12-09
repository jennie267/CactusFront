<template>
    <div class="card" >
        <div class="card-header border-0" >
            <div class="row align-items-center">
                <div class="col">
                    <h3 id="clickSchedule" class="mb-0">
                        {{nameOfChild}} 일정
                    </h3>
                </div>
                <write-schedule-modal :nameOfChild="nameOfChild" :selectedParent="selectedParent"></write-schedule-modal>
                <update-schedule-modal ref="updateModal" :nameOfChild="nameOfChild"></update-schedule-modal>
            </div>
        </div>
        <div class="table-responsive">
            <base-table class="table align-items-center table-flush"
                        :thead-classes="type='thead-light'"
                        tbody-classes="list"
                        :data="tableData">
                <template slot="columns">
                    <th>제목</th>
                    <th>내용</th>
                    <th>시간</th>
                    <th></th>
                    <th></th>
                </template>
                <template slot-scope="{row}">
                    <td class="media align-items-center" style="font-size: 20px; cursor:pointer; width:15%;" @click.prevent="showUpdModal(row.periodId)">
                        {{row.periodName}}
                    </td>
                    <td class="budget" style="font-size: 20px; cursor:pointer; width:15%;" @click.prevent="showUpdModal(row.periodId)">
                        {{row.periodRemark}}
                    </td>
                    <td style="font-size: 20px; cursor:pointer; width:15%;" @click.prevent="showUpdModal(row.periodId)">
                        {{row.schdTime}}
                    </td>
                    <td class="text-right">
                        <button class="btn-primary btn-sm btn-danger" @click="delSchedule(row.schdId)">삭제</button>
                    </td>
                </template>
            </base-table>
        </div>
        <div class="card-footer d-flex justify-content-end" >
            <!-- <base-pagination total="30"></base-pagination> -->
        </div>
    </div>
</template>
<script>
    import WriteScheduleModal from '../Modals/WriteScheduleModal'
    import UpdateScheduleModal from '../Modals/UpdateScheduleModal'
    var moment = require('moment');
    moment().format();

    export default {
        name: 'daily-schedule-table',
        props: {
            nameOfChild: String,
            selectedParent: Object,
        },
        components:{
            WriteScheduleModal,
            UpdateScheduleModal
        },
        methods: {
            showUpdModal: function(id){
                if (id != null){
                    this.$refs.updateModal.modal = true;
                    this.$refs.updateModal.periodId = id;
                }
            },
            delSchedule: function(schdId) {
                if(schdId===0) return;
                this.$http.post(`/period/schedule/delete/`+schdId, null,  { headers: { Authorization: `Bearer ${this.user.token}` } })
                    .then(res => {
                        if(res.status===200){
                            this.$swal({
                                type: 'success',
                                title: '삭제되었습니다.'
                            });
                            this.$store.commit('setDeletedSchdId', schdId);
                            this.tableData.forEach((schedule, index) => {
                                if(schedule.schdId===schdId) {
                                    this.tableData.splice(index, 1);
                                }
                            });
                            this.$store.commit('setDeletedSchdId', 0);
                        }
                    })
            },
        },
        data() {
            return {
                user: this.$store.state.user,
                tableData: [],
                selectedId: 0,
            }
        },
    }
</script>
<style>
</style>
