<template>
<!--    <div>HEllo</div>-->
    <div class="card shadow" style="width:100%; height:100%;">
        <div class="card-header todaySchHeader">
            <div class="row">
                <h3 class="mb-0 todaySchHeaderStr"><h1 class="ni ni-calendar-grid-58 todaySchHeaderStr"></h1>  오늘의 일정</h3>
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
</template>

<script>
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table/src'
var moment = require('moment');
moment().format();

    export default {
        components: {
            VueGoodTable,
        },
        data() {
            return {
                today: moment(new Date()).format('YYYYMMDD'),
                user: this.$store.state.user,
                parentData: [],
                periodHeader: [
                    {
                        field: 'schdId',
                        hidden: true,
                    },
                    {
                        label: '시간',
                        field: 'schdTime',
                        type: 'time',
                        width: '10%',
                    },
                    {
                        label: '일정',
                        field: 'periodName',
                        width: '30%',
                    },
                    {
                        label: '장소',
                        field: 'place',
                        width: '40%',
                    },
                    {
                        label: '내용',
                        field: 'periodRemark',
                        width: '20%',
                    },

                ],
                periodData: [],
                modalShow: false,
            }
        },
        props: {
            // periodData: Array,
            date: String,
        },
        watch: {
            date: function() { // watch it
                this.findSchedule();
            }
        },
        created() {
            this.findSchedule();
/*            this.$http.get(`/user/parents/${this.user.userId}`,  { headers: { Authorization: `Bearer ${this.user.token}` } })
                .then(res => {
                    this.parentData = res.data.users;
                    this.findSchedule();
                });*/

        },
        methods: {
            findSchedule() {
                console.log('오늘 ' , this.today);
                this.$http.get(`/period/schedule/day/user/${this.today}/${this.user.userId}`,  { headers: { Authorization: `Bearer ${this.user.token}` } })
                    .then(res => {
                        console.log('오늘일정 ', res);
                        console.log('오늘일정 데이터', res.data.schedules);
                        // this.periodData.push(res.data.schedules);

                        console.log(this.periodData);

                        res.data.schedules.forEach(schedule =>{
                            schedule.schdTime = moment(schedule.schdTime,"YYYY-MM-DDTHH:mm:ssZ").format('HH:mm');
                            console.log(schedule.schdTime);
                            this.periodData.push(schedule);
                        });
/*                        if(this.date === saveDate) {
                            res.data.schedules.every(schedule => {schedule.userName = parent.name});
                            this.periodData.push(...res.data.schedules);
                        }*/
                    });
/*                this.parentData.forEach(parent => {
                    let saveDate = this.date;
                    this.$http.get(`/period/schedule/day/user/${this.date.replace(/-/gi,'')}/${parent.userId}`,  { headers: { Authorization: `Bearer ${this.user.token}` } })
                        .then(res => {
                            if(this.date === saveDate) {
                                res.data.schedules.every(schedule => {schedule.userName = parent.name});
                                this.periodData.push(...res.data.schedules);
                            }
                        });
                });*/
            }
        }
    }
</script>

<style>

</style>
