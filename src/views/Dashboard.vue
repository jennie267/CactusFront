<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-1">
        </base-header>
        <div class="row">
            <div class="col mx-5">
                <div class="row my-3">
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
                <div class="row my-3">
                    <div class="card shadow" style="width:100%;">
                        <div class="card-header bg-transparent">
                            <div class="row">
                                <h3 class="mb-0">자식목록</h3>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <vue-good-table
                                        style="width:100%;"
                                        :columns="childHeader"
                                        :rows="childData"
                                        @on-row-click="onRowClick"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col mx-5">
                <div class="row my-3">
                    <div class="card shadow" style="width:100%;">
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
                            {{periodData}}
                        </div>
                    </div>
                </div>
                <div class="row my-3">
                    <dashboard-profile :user="selectedUser" style="width:100%; margin-top:80px;"></dashboard-profile>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table/src';
import DashboardProfile from './Dashboard/DashboardProfile'

  export default {
    components: {
        FullCalendar,
        VueGoodTable,
        DashboardProfile,
    },
    data() {
      return {
          user: this.$store.state.user,
          calendarPlugins: [ dayGridPlugin
              , interactionPlugin
          ],
          date: new Date().getFullYear().toString()+'-'+(new Date().getMonth()+1).toString()+'-'+new Date().getDate().toString(),
          childHeader: [
              {
                  field: 'userId',
                  hidden: true,
              },
              {
                  label: '프로필',
                  field: 'profile',
                  width: '8%',
                  tdClass: 'text-center',
                  html: true,
              },
              {
                  label: '이름',
                  field: 'name',
                  width: '25%',
              },
              {
                  label: '생일',
                  field: 'birthday',
                  type: 'date',
                  dateInputFormat: 'yyyyMMdd',
                  dateOutputFormat: 'yyyy-MM-dd',
                  width: '25%',
              },
          ],
          childData: [],
          selectedUser: {},
          periodHeader: [
              {
                  field: 'schdId',
                  hidden: true,
              },
              {
                  label: '담당자',
                  field: 'manager',
                  width: '25%',
              },
              {
                  label: '일자',
                  field: 'schdTime',
                  type: 'date',
                  dateInputFormat: `yyyy-MM-dd'T'HH:mm:ss`,
                  dateOutputFormat: 'yyyy-MM-dd HH:mm:ss',
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
        onRowClick(select) {
            this.selectedUser = select.row
        }
    },
      mounted() {
          this.$http.get(`/user/children/${this.user.userId}`,  { headers: { Authorization: `Bearer ${this.user.token}` } })
              .then(res => {
                  this.childData = res.data.users;
                  this.childData.forEach(user => user.profile = '<a class="avatar avatar-sm rounded-circle" style="cursor: pointer;">\n' +
                      '<img alt="Image placeholder" src="'+user.profileUrl+'" style="width:90%;"/>\n' +
                      '</a>');
              });
      }
  };
</script>
<style>
    @import '~@fullcalendar/core/main.css';
    @import '~@fullcalendar/daygrid/main.css';
</style>
