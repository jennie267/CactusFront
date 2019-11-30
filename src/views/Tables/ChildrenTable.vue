<template>
  <div class="container-fluid mt--7">
    <div class="row">
      <div class="col">
        <div class="card shadow">
          <div class="card-header bg-transparent row align-items-center">
            <div class="col">
              <h3 class="mb-0" v-if="user.type == 'PARENT' ">
                  자녀목록
              </h3>
              <h3 class="mb-0" v-if="user.type == 'CHILD' ">
                  부모목록
              </h3>
            </div>
            <div class="col text-right">
              <base-button type="primary" size="md"> 검색</base-button>
            </div>
          </div>
          <div class="card-body">
            <div class="row icon-examples">
<!--              <div>얍 {{children.length}}</div>
              <div v-for="(child,index) in children" :key="child.name + index">
                {{child.name}}
              </div>
              <div>힝</div>-->
              <div class=""
                   v-for="child in children" :key="child.id" style="margin: 10px;">

               <button type="button"
                        :title="child.name"
                        class="btn-icon-clipboard">
                    <i class="ni ni-single-02"></i>
                    <span>{{child.name}}</span>
<!--                  &lt;!&ndash;<a href="#" class="avatar avatar-sm rounded-circle">
                    <img alt="Image X" :src="children.img" style="width:80%;">
                  </a>&ndash;&gt;-->

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
    var moment = require('moment');
    moment().format();
  // import axios from 'axios';
let children = [];
  export default {
    name: 'children-table',
    data() {
      return {
        children:children,
          user: this.$store.state.user
/*        children: [
          { name: "ni ni-single-02", title: "이지수", img:"@public/img/theme/sooki.PNG"},
          { name: "ni ni-single-02", title: "이근환", img:"img/theme/team-4-800x800.jpg"},
          { name: "ni ni-single-02", title: "김은아"},
          { name: "ni ni-single-02", title: "김남현"}
        ]*/
      }
    },
      mounted() {
        children = [];
          this.$http.get(`/api/user/children/${this.user.userId}`,  { headers: { Authorization: `Bearer ${this.user.token}` } })
              .then(res => {
              console.log(res.data);
              res.data.children.forEach(child => children.push(child));
              console.log('읭 : ' ,this.$moment(new Date()).format('YYYYMMDD'));

                  var time1 = "2017-02-01T12:25:00Z"
                  var time2 = "2017-02-04T12:20:00Z"

                  var ms = moment(time2,"YYYY-MM-DDTHH:mm:ssZ").format('YYYY MM DD');
                 console.log('힝 : ', ms);
          });

          this.$http.get(`/api/message/receive/user/${this.user.userId}`,  { headers: { Authorization: `Bearer ${this.user.token}` } })
              .then(res => {
                  console.log('우왕');
                  console.log(res.data);
                  // res.data.children.forEach(child => children.push(child));
              });
      }
  }
  //
  // doLogin(){
  //     this.$http.get('/api/user/children/'+this.user.id)
  //         .then((result) => {
  //             this.$store.state.user = result.data
  //             this.$router.push("/")
  //         })
  // }





  //
  // axios.get('http://usercactus.paas-ta.org/user/{parentsId}?parentsId=2').then(res => {
  //     console.log(res.data);
  //     res.data.forEach(child => children.push(child));
  // });
</script>
<style>
</style>
