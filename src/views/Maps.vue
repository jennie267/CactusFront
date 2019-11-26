<template>
    <div>

        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <div class="row">
                <div class="col-md-4">
                    {{date}} 경로
                </div>
                <div class="col-md-2">
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
        </base-header>

        <div class="container-fluid mt--7">
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
</template>
<script>
import flatPickr from 'vue-flatpickr-component';

  export default {
      components: {
          flatPickr
      },
      data() {
          return {
              date: new Date(),
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
              userId: 1,
              dates: {
                  simple: "2018-07-17"
              },
              selectedParent: {
                  id: 0,
                  name: '통합'
              },
              defaultParent: {
                  id: 0,
                  name: '통합'
              },
              parents: [
                  {
                      id: 1,
                      name: '이지수'
                  },
                  {
                      id: 2,
                      name: '김은아'
                  }
              ]
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
              this.markers = [{
                  position: {
                      lat: 37.466725726101714,
                      lng: 126.90137792479436
                  },
                  ifw: true,
                  ifw2text: '2019-11-24 08:00'
              }, {
                  position: {
                      lat: 37.464,
                      lng: 126.906
                  },
                  ifw: true,
                  ifw2text: '2019-11-24 08:01'
              }, {
                  position: {
                      lat: 37.473,
                      lng: 126.912
                  },
                  ifw: true,
                  ifw2text: '2019-11-24 08:02'
              }, {
                  position: {
                      lat: 37.46775014875321,
                      lng: 126.91340615602303
                  },
                  ifw: true,
                  ifw2text: '2019-11-24 08:03'
              }, {
                  position: {
                      lat: 37.46866983205213,
                      lng: 126.90474608754218
                  },
                  ifw: true,
                  ifw2text: '2019-11-24 08:04'
              }];
              this.plPath = this.markers.map(value => value.position);
              this.plVisible = true;
              this.center = this.plPath[this.plPath.length-1];
              this.reportedCenter = this.center;
              // this.$http.get('/api/location/footprints/user/'+this.userId)
              //     .then((result) => {
              //         // eslint-disable-next-line no-console
              //         console.log(result);
              //         this.center = this.plPath[0];
              //     })
          }
      }
  }
</script>
<style>
</style>