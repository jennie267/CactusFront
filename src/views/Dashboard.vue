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
                                        :columns="columns"
                                        :rows="rows"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col mx-5">
                <div class="row my-3">
                    <dailySchedule-table :nameOfChild="date" title="Light Table"></dailySchedule-table>
                </div>
                <div class="row my-3">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import DailyScheduleTable from './Tables/DailyScheduleTable'
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table/src';

  export default {
    components: {
        FullCalendar,
        DailyScheduleTable,
        VueGoodTable,
    },
    data() {
      return {
          user: this.$store.state.user,
          calendarPlugins: [ dayGridPlugin
              , interactionPlugin
          ],
          date: new Date().getFullYear().toString()+'-'+(new Date().getMonth()+1).toString()+'-'+new Date().getDate().toString(),
          columns: [
              {
                  field: 'userId',
                  hidden: true,
              },
              {
                  label: '사진',
                  field: 'profile',
                  width: '5%',
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
              {
                  label: '정보',
                  field: 'info',
                  width: '5%',
                  tdClass: 'text-center',
                  html: true,
              },
          ],
          rows: [],
      }
    },
    methods: {
        dateClick(info) {
            this.date = info.dateStr
        },
    },
      mounted() {
          this.$http.get(`/api/user/children/${this.user.userId}`,  { headers: { Authorization: `Bearer ${this.user.token}` } })
              .then(res => {
                  this.rows = res.data.users;
                  this.rows.forEach(user => user.info = '<a class="ni ni-circle-08" style="cursor: pointer;"></a>');
                  this.rows.forEach(user => user.profile = '<a href="#" class="avatar avatar-sm rounded-circle">\n' +
                      '              <img alt="Image placeholder" src="'+user.profileUrl+'" style="width:90%;">\n' +
                      '            </a>');
              });
      }
  };
</script>
<style></style>
