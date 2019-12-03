<template>
    <!-- Modals -->
    <div class="row">
            <base-button class="btn-primary" @click="modals.modal1=true">등록</base-button>
        <div class="col-md-4">
            <modal :show.sync="modals.modal1">
                <h2 slot="header" class="modal-title" id="modal-title-default">일정 등록</h2>
                <form>
                    <div class="form-group row">
                        <label for="scheduleName" class="col-sm-3 col-form-label">일정타입</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" v-model="period.periodType">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="scheduleName" class="col-sm-2 col-form-label">일정명</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" v-model="period.name">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="scheduleContents" class="col-sm-2 col-form-label">내용</label>
                        <div class="col-sm-10">
                        <input type="text" class="form-control" v-model="period.remark">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="scheduleContents" class="col-sm-2 col-form-label">날짜</label>
                        <base-input class="col-sm-5" addon-left-icon="ni ni-calendar-grid-58">
                            <flat-pickr slot-scope="{focus, blur}"
                                         @on-open="focus"
                                         @on-close="blur" 
                                        :config="{allowInput: true}"
                                        class="form-control datepicker"
                                        v-model="period.startDate">
                            </flat-pickr>
                        </base-input>
                        <base-input class="col-sm-5">
                            <flat-pickr slot-scope="{focus, blur}"
                                         @on-open="focus"
                                         @on-close="blur" 
                                        :config=timeConfig
                                        class="form-control datepicker"
                                        v-model="period.startTime">
                            </flat-pickr>
                        </base-input>
                    </div>
                    <div class="form-group row">
                        <label for="scheduleContents" class="col-sm-3 col-form-label">알람여부</label>
                        <div class="col-sm-9">
                            <div class="custom-control custom-checkbox mb-3">
                                <input class="custom-control-input" id="isAlarm" type="checkbox" v-model="period.isAlarm">
                                <label class="custom-control-label" for="isAlarm">
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="scheduleContents" class="col-sm-3 col-form-label">반복일정</label>
                        <div class="col-sm-9" valign="middle">
                            <div class="custom-control custom-checkbox mb-3">
                                <input class="custom-control-input" id="repSchedule1" type="checkbox" v-model="isCycleStatus">
                                <label class="custom-control-label" for="repSchedule1">
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group" v-if="isCycleStatus">
                        <div class="form-group row">
                            <label for="scheduleContents" class="col-sm-2 col-form-label">기간</label>
                            <base-input class="col-sm-4" addon-left-icon="ni ni-calendar-grid-58">
                                <flat-pickr slot-scope="{focus, blur}"
                                            @on-open="focus"
                                            @on-close="blur" 
                                            locale="ko"
                                            :config="{allowInput: true}"
                                            class="form-control datepicker"
                                            v-model="alarmDate">
                                </flat-pickr>
                            </base-input>
                            <div class="col-sm-1"><h1>~</h1></div>
                            <base-input class="col-sm-4" addon-left-icon="ni ni-calendar-grid-58">
                                <flat-pickr slot-scope="{focus, blur}"
                                            @on-open="focus"
                                            @on-close="blur" 
                                            :config="{allowInput: true}"
                                            class="form-control datepicker"
                                            v-model="alarmTime">
                                </flat-pickr>
                            </base-input>
                        </div>
                        <div class="form-group row">
                            <label for="scheduleContents" class="col-sm-2 col-form-label">주기</label>
                            <div class="col-sm-4">
                                <input type="text" class="form-control" v-model="period.freq">
                            </div>
                            <div class="col-sm-6">
                                <multiselect v-model="cycle" track-by="name" label="name" placeholder="선택" :options="options" :searchable="false" :allow-empty="true">
                                    <template slot="singleLabel" slot-scope="{ option }"><strong>{{ option.name }}</strong></template>
                                </multiselect>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="scheduleName" class="col-sm-2 col-form-label">시설</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" v-model="period.place">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="scheduleName" class="col-sm-2 col-form-label">복지사</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" v-model="period.manager">
                        </div>
                    </div>
                </form>
                <template slot="footer">
                    <base-button type="primary" class="active btn-primary" @click="confirm">등록</base-button>
                    <base-button type="secondary" class="active ml-3" @click="modals.modal1 = false">취소
                    </base-button>
                </template>
            </modal>
        </div>
    </div>
</template>
<script>
import Modal from "@/components/Modal.vue";
import flatPickr from 'vue-flatpickr-component';
import Multiselect from 'vue-multiselect'
import 'flatpickr/dist/flatpickr.css';
import 'vue-multiselect/dist/vue-multiselect.min.css'

export default {
  components: {
    Modal
    , flatPickr
    , Multiselect
  },
  data() {
    return {
        modals: {
            modal1: false,
        },
        user: this.$store.state.user,
        isCycleStatus: false,
        timeConfig:{
            allowInput: true,
            enableTime: true,
            noCalendar: true,
            dateFormat: "H:i",
            defaultDate: "00:00"
        },
        date: new Date(),
        config: {
            wrap: true, // set wrap to true only when using 'input-group'
            altFormat: 'M j, Y',
            altInput: true,
            dateFormat: 'Y-m-d',
        },    
        value: null,
        options: [
            { name: '년', value:'Y'},
            { name: '월', value:'M'},
            { name: '일', value:'D'},
            { name: '시간', value:'H'},
            { name: '분', value:'MM'},
        ],
        period: {
            name:"",
            remark: "",
            periodType: "",
            isAlarm: false,
            startDate: "",
            startTime: "",
            freq: "",
            cycle: "",
            place: "",
            manager: "",    
        }
    };
  },
    methods:{
        confirm() {

        this.$http.post(`/period`, this.period, { headers: { Authorization: `Bearer ${this.user.token}` } })
            .then(res => {
                console.log(res);
            });
        }
    }
};

</script>
<style>
</style>
