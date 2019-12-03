<template>
  <div class="card shadow"
       :class="type === 'dark' ? 'bg-default': ''">
    <div class="card-header border-0"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row align-items-center">
        <div class="col">
          <h3 id="clickSchedule" class="mb-0" :class="type === 'dark' ? 'text-white': ''" >
          {{nameOfChild}} 일정
          </h3>
        </div>
        <write-schedule-modal></write-schedule-modal>
      </div>
    </div>

    <div class="table-responsive">
      <base-table class="table align-items-center table-flush"
                  :class="type === 'dark' ? 'table-dark': ''"
                  :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                  tbody-classes="list"
                  >
        <template slot="columns">
          <th @click="test">Project</th>
          <th>Budget</th>
          <th>Users</th>
          <th></th>
        </template>

        <template slot-scope="{row}">
          <div v-for="daily in schedule" :key="daily.periodId">
          <th scope="row">
            <div class="media align-items-center">
              <div class="media-body">
                <a @click="modals.modal1=true"><span class="name mb-0 text-sm">{{daily.name}}</span></a>
              </div>
            </div>
          </th>
          <td class="budget">
            {{daily.periodId}}
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
          </div>
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

export default {
    name: 'daily-schedule-table',
    props: {
      type: {
        type: String
      },
      nameOfChild: String
      , schedule: {
        type: Object,
        required: true
      } 
    },
    components:{
      WriteScheduleModal
    },
    methods: {
     /*  registration() {
        alert("시작");
      } */
      test() {
        console.log('먼저.. ' ,this.schedule);
        console.log('먼저.222. ' ,JSON.parse(this.schedule));
      }
    },
    data() {
      return {
        user: this.$store.state.user,
      }
    }, 
  }
</script>
<style>
</style>
