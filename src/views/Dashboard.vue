<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
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
                    <base-table
                            :columns="['이름','이메일']"
                            :data="[{'이름':'ㅁㅁㅁ','이메일':'aasdf@'}]"
                    />
                </div>
            </div>
            <div class="col mx-5">
                <div class="row my-3">
                    <dailySchedule-table :nameOfChild="date" title="Light Table"></dailySchedule-table>
                </div>
                <div class="row my-3">
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
                            :selectable="true"
                    />
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
        FullCalendar,
        DailyScheduleTable
    },
    data() {
      return {
          calendarPlugins: [ dayGridPlugin
              , interactionPlugin
          ],
          date: new Date().getFullYear().toString()+'-'+(new Date().getMonth()+1).toString()+'-'+new Date().getDate().toString()
      }
    },
    methods: {
        dateClick(info) {
            this.date = info.dateStr
        }
    }
  };
</script>
<style></style>
