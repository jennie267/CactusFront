<template>
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
</template>

<script>
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table/src'

    export default {
        components: {
            VueGoodTable,
        },
        data() {
            return {
                user: this.$store.state.user,
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
        props: {
            // periodData: Array,
            date: String,
        },
        mounted() {
            this.$http.get(`/period/schedule/day/user/${this.date.replace(/-/gi,'')}/${this.user.userId}`,  { headers: { Authorization: `Bearer ${this.user.token}` } })
                .then(res => {
                    this.periodData = res.data.schedules;
                });
        }
    }
</script>

<style scoped>

</style>