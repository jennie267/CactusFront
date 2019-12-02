<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-1">
        </base-header>
        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <div class="card shadow">
                        <div class="card-header bg-transparent">
                            <h3 class="mb-0">이지수님의 일정</h3>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-7">
                                    <FullCalendar 
                                        defaultView="dayGridMonth"
                                        :plugins="calendarPlugins"
                                        locale="ko"
                                        :weekends="true"
                                        :header="{
                                            left: 'prev',
                                            center: 'title',
                                            right: 'next'
                                        }"
                                        :events="[
                                            { title: 'event 1', date: '2019-11-22' },
                                            { title: 'event 2', date: '2019-11-23' }
                                        ]"
                                        :selectable="true"
                                        @dateClick="dateClick"
                                        @eventClick="eventClick"
                                    />
                                </div>
                                <div class="col-md-5">
                                    <div class="row mt-5" v-if="isStatus">
                                        <div class="col">
                                            <dailySchedule-table v-if="schedule !== null" :schedule="schedule" :nameOfChild="name" title="Light Table"></dailySchedule-table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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

export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
    , DailyScheduleTable
  },
  data() {
    return {
        user: this.$store.state.user,
        calendarPlugins: [ dayGridPlugin
                       , interactionPlugin
        ],
        isStatus: false,
        name:'',
        today:'',
        schedule:''
    }
  },
  methods: {
    dateClick(info) {
        this.isStatus = true;
        this.name = info.dateStr
        this.today = info.dateStr

        this.$http.get(`/api/schedule/user/${this.today}/3`,  { headers: { Authorization: `Bearer ${this.user.token}` } })
        .then(res => {
          this.schedule = JSON.stringify(res.data.period);
            console.log("====================");
          console.log(this.schedule);
          //console.log(res.data.period);
      });
    },
    eventClick () {
        alert("이거야:::"+ arguments)
    },
  }
}
</script>
<style lang='scss'>

@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';

</style>