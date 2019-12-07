<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-1">
        </base-header>
        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <div class="card shadow">
                        <div class="card-header bg-transparent">
                            <div class="row">
                                <h3 class="mb-0" style="margin-left:1%;">{{title}}</h3>
                            </div>
                            <div class="row mt-5">
                                <div class="col-md-3">
                                    <div class="form-group">
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
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <base-dropdown :title=selectedParent.name position="left" tag="li">
                                            <li class="dropdown-item" @click="selectedParent=defaultParent">{{defaultParent.name}}</li>
                                            <li class="dropdown-item" @click="selectedParent=parent" v-for="parent in parents" :key="parent.id">{{parent.name}}</li>
                                        </base-dropdown>
                                        <base-button @click="getLocation">검색</base-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <gmap-map
                                        :center=center
                                        :zoom=zoom
                                        :map-type-id=mapType
                                        style="width: 100%; height: 650px"
                                        ref="map"
                                        @dragend="center=reportedCenter"
                                        @zoom_changed="update('zoom', $event)"
                                        @center_changed="update('reportedCenter', $event)"
                                        :options="{
                               zoomControl: true,
                               mapTypeControl: false,
                               scaleControl: false,
                               streetViewControl: false,
                               rotateControl: false,
                               fullscreenControl: true,
                               disableDefaultUi: false
                            }">
                                    <gmap-marker v-for="m in markers" :key="m" :position="m.position" :opacity="1">
                                        <gmap-info-window :opened="m.ifw">{{m.ifw2text}}</gmap-info-window>
                                    </gmap-marker>
                                    <gmap-polyline :path="plPath" :draggable="false" :options="{geodesic:true, strokeColor:'#FF0000'}">
                                    </gmap-polyline>
                                </gmap-map>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import flatPickr from 'vue-flatpickr-component';
import dateUtil from '../common/dateUtil';

  export default {
      components: {
          flatPickr
      },
      data() {
          return {
              title: '부모님 경로 검색',
              user: this.$store.state.user,
              date: dateUtil.getToday(),
              center: {
                  lat: 37.48877560436582,
                  lng: 127.00939031639054
              },
              reportedCenter: {
                  lat: 37.48877560436582,
                  lng: 127.00939031639054
              },
              zoom: 16,
              mapType: 'roadmap',
              markers: [],
              plPath: [],
              selectedParent: {
                  "userId": 0,
                  name: '선택'
              },
              defaultParent: {
                  "userId": 0,
                  name: '선택'
              },
              parents: []
          }
      },
      methods: {
          update(field, event) {
              if (field === 'reportedCenter') {
                  this.reportedCenter = {
                      lat: event.lat(),
                      lng: event.lng(),
                  };
              } else if (field === 'bounds') {
                  this.mapBounds = event;
              } else {
                  this.$set(this, field, event);
              }
          },
          getLocation: function(){
              if(this.selectedParent.userId>0){
                  this.$http.get('/location/footprints/user/date/'+this.selectedParent.userId+'/'+this.date.replace(/-/gi,''), { headers: { Authorization: `Bearer ${this.user.token}` } })
                      .then((result) => {
                          this.markers = [];
                          let footPrints = result.data.footPrints;
                          let marker;
                          footPrints.forEach((footPrint) => {
                              marker = {
                                  position: {
                                      lat: footPrint.latitude,
                                      lng: footPrint.longitude
                                  },
                                  ifw: true,
                                  ifw2text: footPrint.insertTime
                              };
                              this.markers.push(marker);
                          });
                          this.plPath = this.markers.map(value => value.position);
                          if(this.plPath.length>0){
                            this.center = this.plPath[this.plPath.length-1];
                          }
                          this.reportedCenter = this.center;
                          this.title = this.date + ' ' + this.selectedParent.name + '님의 경로';
                      })
              }
          }
      },
      mounted() {
          this.$http.get(`/user/parents/`+this.user.userId,  { headers: { Authorization: `Bearer `+this.user.token } })
              .then(res => {
                  this.parents = res.data.users;
              });
      }
  }
</script>
<style>
</style>