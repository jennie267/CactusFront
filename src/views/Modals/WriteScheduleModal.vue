<template>
    <!-- Modals -->
    <div class="row">
        <div class="col-md-4">
            <base-button class="btn-primary" @click="modals.modal1=true">등록</base-button>
            <modal :show.sync="modals.modal1">
                <h2 slot="header" class="modal-title" id="modal-title-default">일정 등록</h2>
                <form>
                    <div class="form-group row">
                        <label for="scheduleName" class="col-sm-2 col-form-label">일정명</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="name" value="">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="scheduleContents" class="col-sm-2 col-form-label">내용</label>
                        <div class="col-sm-10">
                        <input type="text" class="form-control" id="contents">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="scheduleContents" class="col-sm-2 col-form-label">날짜</label>
                        <base-input class="col-sm-10" addon-left-icon="ni ni-calendar-grid-58">
                            <flat-pickr slot-scope="{focus, blur}"
                                         @on-open="focus"
                                         @on-close="blur" 
                                        :config="{allowInput: true}"
                                        class="form-control datepicker"
                                        v-model="date">
                            </flat-pickr>
                        </base-input>
                    </div>
                    <div class="form-group row">
                        <label for="scheduleContents" class="col-sm-3 col-form-label">알람여부</label>
                        <div class="col-sm-9">
                            <div class="custom-control custom-checkbox mb-3">
                                <input class="custom-control-input" id="isAlarm" type="checkbox" v-model="isAlarm">
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
                                            v-model="date">
                                </flat-pickr>
                            </base-input>
                            <div class="col-sm-1"><h1>~</h1></div>
                            <base-input class="col-sm-4" addon-left-icon="ni ni-calendar-grid-58">
                                <flat-pickr slot-scope="{focus, blur}"
                                            @on-open="focus"
                                            @on-close="blur" 
                                            :config="{allowInput: true}"
                                            class="form-control datepicker"
                                            v-model="date">
                                </flat-pickr>
                            </base-input>
                        </div>
                        <div class="form-group row">
                            <label for="scheduleContents" class="col-sm-2 col-form-label">주기</label>
                            <div class="col-sm-4">
                                <input type="text" class="form-control" id="cycle">
                            </div>
                            <div class="col-sm-6">
                                <multiselect v-model="value" track-by="name" label="name" placeholder="선택" :options="options" :searchable="false" :allow-empty="true">
                                    <template slot="singleLabel" slot-scope="{ option }"><strong>{{ option.name }}</strong></template>
                                </multiselect>
                            </div>
                        </div>
                    </div>
                </form>
                <template slot="footer">
                    <base-button type="primary" class="active btn-primary">등록</base-button>
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
        isAlarm: false,
        isCycleStatus: false,
        date: new Date(),
        config: {
            wrap: true, // set wrap to true only when using 'input-group'
            altFormat: 'M j, Y',
            altInput: true,
            dateFormat: 'Y-m-d',
        },    
        value: null,
        options: [
            { name: '년'},
            { name: '월'},
            { name: '일'},
        ]
    };
  },
  methods:{
  }
};

</script>
<style>
</style>
