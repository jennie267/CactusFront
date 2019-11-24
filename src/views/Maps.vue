<template>
    <div>

        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <div class="row">
                <div class="col">
                    <ul class="nav nav-pills justify-content-center">
                        <li class="nav-item mr-2 mr-md-0">
                            <base-input class="input-group-alternative mb-3"
                                        placeholder="lat"
                                        v-model="center.lat">
                            </base-input>
                        </li>
                        <li class="nav-item mr-2 mr-md-0">
                            <base-input class="input-group-alternative mb-3"
                                        placeholder="lng"
                                        v-model="center.lng">
                            </base-input>
                        </li>
                    </ul>
                </div>
            </div>
            <base-button>move!</base-button>
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <GmapMap
                        :center=center
                        :zoom="7"
                        map-type-id="roadmap"
                        style="width: 500px; height: 300px"
                        ref="map"
                        @center_changed="updateCenter"
                        :options="{
                           zoomControl: true,
                           mapTypeControl: false,
                           scaleControl: false,
                           streetViewControl: false,
                           rotateControl: false,
                           fullscreenControl: true,
                           disableDefaultUi: false
                        }"
                >
                    <GmapMarker
                            :key="index"
                            v-for="(m, index) in markers"
                            :position="m.position"
                            :clickable="true"
                            :draggable="true"
                            @click="center=m.position"
                    />
                </GmapMap>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
      data() {
          return {
              center: {
                  lat: 10,
                  lng: 10
              }
          }
      },
      methods: {
          updateCenter(center) {
              this.center = {
                  lat: center.lat(),
                  lng: center.lng()
              }
          }
      }
  }
</script>
<style>
</style>
