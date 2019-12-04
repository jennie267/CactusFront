<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-1">
        </base-header>
        <div class="row">
            <div class="col mx-5">
                <FullCalendar
                        defaultView="dayGridMonth"
                        ref="fullCalendar"
                        :plugins="calendarPlugins"
                        locale="ko"
                        :weekends="true"
                        :header="{
                                left: 'prev',
                                center: 'title',
                                right: 'next'
                        }"
                        :selectable="true"
                        @dateClick="dateClick"
                />
            </div>
            <div class="col mx-5">
                <div class="card shadow" style="width:100%; height:100%;">
                    <div class="card-header bg-transparent">
                        <div class="row">
                            <h3 class="mb-0">{{date}} 일정</h3>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <vue-good-table
                                    style="width:100%;"
                                    :columns="periodHeader"
                                    :rows="periodData"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" style="margin-top:100px;">
            <div class="col mx-5">
                <parents-table v-if="user.type === 'CHILD'" @selectUser="selectUser" style="width:100%; height:100%;"></parents-table>
                <children-table v-if="user.type === 'PARENT'" @selectUser="selectUser" style="width:100%; height:100%;"></children-table>
            </div>
            <div class="col mx-5">
                <dashboard-profile :user="selectedUser" style="width:100%; height:100%;"></dashboard-profile>
            </div>
        </div>
    </div>
</template>
<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table/src'
import DashboardProfile from './Dashboard/DashboardProfile'
import ParentsTable from './Dashboard/ParentsTable'
import ChildrenTable from './Dashboard/ChildrenTable'
import dateUtil from '../common/dateUtil'

  export default {
    components: {
        FullCalendar,
        VueGoodTable,
        DashboardProfile,
        ParentsTable,
        ChildrenTable,
    },
    data() {
      return {
          user: this.$store.state.user,
          calendarPlugins: [ dayGridPlugin
              , interactionPlugin
          ],
          date: dateUtil.getToday(),
          selectedUser: {},
          periodHeader: [
              {
                  field: 'schdId',
                  hidden: true,
              },
              {
                  label: '담당자',
                  field: 'manager',
                  width: '12%',
              },
              {
                  label: '위치',
                  field: 'place',
                  width: '25%',
              },
              {
                  label: '시간',
                  field: 'schdTime',
                  type: 'date',
                  dateInputFormat: `yyyy-MM-dd'T'HH:mm:ss`,
                  dateOutputFormat: 'HH:mm:ss',
                  width: '10%',
              },
              {
                  label: '내용',
                  field: 'periodRemark',
                  width: '25%',
              },
          ],
          periodData: [],
      }
    },
    methods: {
        dateClick(info) {
            this.date = info.dateStr;
            this.$http.get(`/period/schedule/day/user/${this.date.replace(/-/gi,'')}/${this.user.userId}`,  { headers: { Authorization: `Bearer ${this.user.token}` } })
                .then(res => {
                    this.periodData = res.data.schedules;
                });
        },
        selectUser(user) {
            this.selectedUser = user
        },
    },
      mounted() {
          this.$http.get(`/period/schedule/day/user/${this.date.replace(/-/gi,'')}/${this.user.userId}`,  { headers: { Authorization: `Bearer ${this.user.token}` } })
              .then(res => {
                  this.periodData = res.data.schedules;
              });
      }
  };
</script>
<style>
    @import '~@fullcalendar/core/main.css';
    @import '~@fullcalendar/daygrid/main.css';
</style>
