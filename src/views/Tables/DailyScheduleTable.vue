<template>
    <div class="card shadow" >
        <div class="card-header border-0" >
            <div class="row align-items-center">
                <div class="col">
                    <h3 id="clickSchedule" class="mb-0">
                        {{nameOfChild}} 일정
                    </h3>
                </div>
                <write-schedule-modal></write-schedule-modal>
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
                    <th>작성자</th>
                    <th></th>
                </template>
                <template slot-scope="{row}">
                    <div class="media align-items-center">
                        <div class="media-body">
                            <a @click="modals.modal1=true"><span class="name mb-0 text-sm">{{row.periodName}}</span></a>
                        </div>
                    </div>
                    <td class="budget">
                        {{row.periodRemark}}
                    </td>
                    <td>
                        <!-- 작성자 필요 -->
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

    let schedules = [];
    export default {
        name: 'daily-schedule-table',
        props: {
            nameOfChild: String
        },
        components:{
            WriteScheduleModal
        },
        methods: {
            showScheduleList: function(date) {
                this.tableData = [];
                this.$http.get(`/period/schedule/day/user/`+ date + `/`+ this.user.userId,  { headers: { Authorization: `Bearer ${this.user.token}` } })
                    .then(res => {
                        res.data.schedules.forEach(schedule => {
                            this.tableData.push(schedule);
                        })
                    });
            },
            delSchedule: function(schdId) {
                this.$http.get(`/period/schedule/`+schdId,  { headers: { Authorization: `Bearer ${this.user.token}` } })
                    .then(res => {
                        console.log(res);
                    })
            }
        },
        data() {
            return {
                user: this.$store.state.user,
                tableData:schedules
            }
        },
    }
</script>
<style>
</style>
