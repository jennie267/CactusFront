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
                  :data="tableData">
        <template slot="columns">
          <th>Project</th>
          <th>Budget</th>
          <th>Users</th>
          <th></th>
        </template>

        <template slot-scope="{row}">
          <th scope="row">
            <div class="media align-items-center">
              <div class="media-body">
                <a @click="modals.modal1=true"><span class="name mb-0 text-sm">{{row.title}}</span></a>
              </div>
            </div>
          </th>
          <td class="budget">
            {{row.budget}}
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

export default {
    name: 'daily-schedule-table',
    props: {
      type: {
        type: String
      },
      title: String
      ,nameOfChild: String
      ,today: String
    },
    components:{
      WriteScheduleModal
    },
    methods: {
     /*  registration() {
        alert("시작");
      } */
      openWriteScheduleModal() {
        //WriteScheduleModal.modals.modal1=true;
        alert("여기 들어오냐??");
      }
    },
    data() {
      return {
        
        user: this.$store.state.user,
         tableData: [
          {
            title: 'Argon Design System',
            budget: '$2500 USD',
            status: 'pending',
          },
          {
            title: 'Angular Now UI Kit PRO',
            budget: '$1800 USD',
            status: 'completed',
          },
          {
            title: 'Black Dashboard',
            budget: '$3150 USD',
            status: 'delayed',
          },
          {
            title: 'React Material Dashboard',
            budget: '$4400 USD',
            status: 'on schedule',
          },
          {
            title: 'Vue Paper UI Kit PRO',
            budget: '$2200 USD',
            status: 'completed',
          }
        ] 
        //tableData:[],
      }
    }, 
    mounted() {
      console.log(this.today);
      this.$http.get(`/period/schedule/3/${this.tableData.today}`,  { headers: { Authorization: `Bearer ${this.user.token}` } })
        .then(res => {
          console.log('우왕');
          console.log(res.data);
          // res.data.children.forEach(child => children.push(child));
      });
    }
  }
</script>
<style>
</style>
