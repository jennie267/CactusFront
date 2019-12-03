<template>
  <div class="card shadow">
    <div class="row align-items-center">
      <div class="col">
        <h3 id="clickSchedule" class="mb-0">
          {{nameOfChild}} 일정
        </h3>
      </div>
      <write-schedule-modal></write-schedule-modal>
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
          <th scope="row">
            <div class="media align-items-center">
              <div class="media-body">
                <a @click="modals.modal1=true"><span class="name mb-0 text-sm">{{rows.name}}</span></a>
              </div>
            </div>
          </th>
          <td class="budget">
            {{row.remark}}
          </td>
          <td>
            <badge class="badge-dot mr-4" :type="row.statusType">
              <i :class="`bg-${row.statusType}`"></i>
              <span class="status">{{row.status}}</span>
            </badge>
          </td>
          <td class="text-right">
             <button class="btn-primary btn-sm btn-danger">삭제</button>
          </td>
        </template>

      </base-table>
    </div>
    
    <div class="card-footer d-flex justify-content-end"
         :class="type === 'dark' ? 'bg-transparent': ''">
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
      type: {
        type: String
      },
      nameOfChild: String
      //, schedule: Object
    }, 
    components:{
      WriteScheduleModal
    },
    methods: {
      showScheduleList: function(date) {
        this.tableData = [];

        this.$http.get(`/period/schedule/day/user/`+ date + `/3`,  { headers: { Authorization: `Bearer ${this.user.token}` } })
        .then(res => {
            res.data.schedules.forEach(schedule => {
              this.tableData.push(schedule);
            }) 
        });
      }
     /*  registration() {
        alert("시작");
      } */
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
