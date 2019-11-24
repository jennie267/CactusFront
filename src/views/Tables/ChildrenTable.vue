<template>
  <div class="container-fluid mt--7">
    <div class="row">
      <div class="col">
        <div class="card shadow">
          <div class="card-header bg-transparent row align-items-center">
            <div class="col">
              <h3 class="mb-0" >
                {{user.type}}목록
              </h3>
            </div>
            <div class="col text-right">
              <base-button type="primary" size="md"> 검색</base-button>
            </div>
          </div>
          <div class="card-body">
            <div class="row icon-examples">
              <div class=""
                   v-for="(child, index) in children" :key="child.name + index" style="margin: 10px;">
                <button type="button"
                        :title="child.name"
                        class="btn-icon-clipboard">
                    <i :class="child.name"></i>
                    <span>{{child.title}}</span>
                  <!--<a href="#" class="avatar avatar-sm rounded-circle">
                    <img alt="Image X" :src="children.img" style="width:80%;">
                  </a>-->

                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'children-table',
    data() {
      return {
        user: {
          type:'자녀'
        },
        children: [
          { name: "ni ni-single-02", title: "이지수", img:"@public/img/theme/sooki.PNG"},
          { name: "ni ni-single-02", title: "이근환", img:"img/theme/team-4-800x800.jpg"},
          { name: "ni ni-single-02", title: "김은아"},
          { name: "ni ni-single-02", title: "김남현"}
        ]
      }
    }
  }
</script>
<style>
</style>
