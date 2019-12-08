<template>
    <div>
        <base-header type="gradient-success" class="pt-5">
            <h1 class="" v-if="user.type==='PARENT'"><h1 class="ni ni-tv-2"></h1>  {{user.name}}님의 일정</h1>
            <h1 class="" v-if="user.type==='CHILD' && selectedParent!=null"><h1 class="ni ni-tv-2"></h1>  {{selectedParent.name}}님의 일정</h1>
            <hr>
        </base-header>
        <div class="container-fluid">
            <div class="row">
                <div class="col">
                    <div class="card shadow">
                        <div class="card-header bg-transparent">
                            <div v-if="user.type==='CHILD'" class="col-sm-2">
                                <multiselect v-model="selectedParent" track-by="name" label="name" placeholder="선택" :options="this.$store.state.parents" :searchable="false" :allow-empty="true">
                                    <template slot="singleLabel" slot-scope="{ option }"><strong>{{ option.name }}</strong></template>
                                </multiselect>
                            </div>
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
                                        :events="events"
                                        :selectable="true"
                                        @dateClick="dateClick"
                                        @eventClick="eventClick"
                                        @datesRender="saveFromTo"
                                    />
                                </div>
                                <div class="col-md-5">
                                    <div class="row mt-5">
                                        <!--<div class="row mt-5" v-if="isStatus">-->
                                        <div class="col">
                                            <dailySchedule-table ref="dailyTable" :nameOfChild="name" :selectedParent="selectedParent" title="Light Table"></dailySchedule-table>
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
import Multiselect from 'vue-multiselect'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import DailyScheduleTable from './Tables/DailyScheduleTable'

var moment = require('moment');
moment().format();

export default {
    name: 'schedule',
  components: {
    FullCalendar // make the <FullCalendar> tag available
    , DailyScheduleTable
      ,Multiselect
  },
  data() {
    return {
        user: this.$store.state.user,
        calendarPlugins: [ dayGridPlugin
                       , interactionPlugin
        ],
        // isStatus: false,
        name:'',
        today:'',
        schedule:'',
        selectedParent: this.$store.state.user.type==='CHILD'?null:this.$store.state.user,
        fromDate: '',
        toDate: '',
        events: [],
    }
  },
    watch: {
        fromDate: function(){this.findEvents()},
        selectedParent: function(){this.findEvents()},
    },
  methods: {
    dateClick(info) {
        // this.isStatus = true;
        this.name = info.dateStr
        this.today = moment(info.dateStr, "YYYY-MM-DD").format('YYYYMMDD');
        this.$refs.dailyTable.tableData = [];
        if(this.user.type==='PARENT'){
            this.$refs.dailyTable.showScheduleList(this.today, this.$store.state.user.userId);
        }
        else if(this.user.type==='CHILD'){
            if(this.selectedParent!=null){
                this.$refs.dailyTable.showScheduleList(this.today, this.selectedParent.userId);
            }
            else{
                this.$store.state.parents.forEach(parent => {
                    this.$refs.dailyTable.showScheduleList(this.today, parent.userId);
                })
            }
        }
    },
      saveFromTo: function(arg) {
          this.fromDate = moment(arg.view.activeStart).format('YYYYMMDD');
          this.toDate = moment(arg.view.activeEnd).format('YYYYMMDD');
      },
      findEvents: function() {
          this.events = [];
          if(this.user.type==='PARENT'){
              this.getEvents(this.fromDate, this.toDate, this.$store.state.user.userId);
          }
          else if(this.user.type==='CHILD'){
              if(this.selectedParent!=null){
                  this.getEvents(this.fromDate, this.toDate, this.selectedParent.userId);
              }
              else{
                  this.$store.state.parents.forEach(parent => {
                      this.getEvents(this.fromDate, this.toDate, parent.userId);
                  })
              }
          }
      },
      getEvents: function(fromDate, toDate, userId) {
          this.$http.get(`/period/schedule/from/to/user/${fromDate}/${toDate}/${userId}`,  { headers: { Authorization: `Bearer `+this.user.token } })
              .then(res => {
                  res.data.schedules.forEach(schedule =>{
                      let event = {};
                      event.title = schedule.periodName;
                      event.date = moment(schedule.schdTime,"YYYY-MM-DDTHH:mm:ssZ").format('YYYY-MM-DD');
                      this.events.push(event);
                  });
              });
      },
    eventClick () {
        console.log(arguments)
    },
  }, mounted() {
        if (this.$route.params.requestDate != null) {
            console.log('요청일자 : ', this.$route.params.requestDate);
        }
        let info = {
            dateStr: this.$moment(new Date()).format('YYYY-MM-DD')
        };

        if(this.user.type==='CHILD' && this.$store.state.parents.length===0) {
            this.$http.get(`/user/parents/`+this.user.userId,  { headers: { Authorization: `Bearer `+this.user.token } })
                .then(res => {
                    this.$store.state.parents = res.data.users;
                    this.findEvents();
                    this.dateClick(info);
                });
        }
        else {
            this.dateClick(info);
        }
    }
}
</script>
<style lang='scss'>

@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';

</style>
