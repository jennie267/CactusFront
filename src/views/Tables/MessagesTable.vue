<template>
  <div class="card shadow"
       :class="type === 'dark' ? 'bg-default': ''">


    <div class="table-responsive">
      <base-table class="table align-items-center table-flush"
                  :class="type === 'dark' ? 'table-dark': ''"
                  :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                  tbody-classes="list"
                  :data="tableData">
        <template slot="columns" style="font-size: 15px;">
          <th :style="thStyle">일자</th>
          <th :style="thStyle">이름</th>
          <th :style="thStyle">내용</th>
          <th :style="thStyle"></th>
        </template>

        <template slot-scope="{row}">
          <td class="name" style="font-size: 20px; cursor:pointer" @click="modals.modal1 = true">
            {{row.date}}
          </td>
          <td class="name" style="font-size: 20px; cursor:pointer" @click="modals.modal1 = true">
            {{row.name}}
            <a href="#" class="avatar avatar-sm rounded-circle">
              <img alt="Image placeholder" :src="row.img" style="width:80%;">
            </a>
          </td>
          <td class="name" style="font-size: 15px; cursor:pointer" @click="modals.modal1 = true">
              {{row.content}}
          </td>

          <td>
            <div class="d-flex align-items-center">
              <i v-if="row.like" class="ni ni-favourite-28 " style="color: pink;"></i>
            </div>
          </td>

        </template>

      </base-table>
    </div>

    <div class="card-footer d-flex justify-content-end"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <base-pagination total="30"></base-pagination>
    </div>

    <template>
      <!-- Modals -->
      <div class="col text-right">

        <modal :show.sync="modals.modal1">
            <span class="ni ni-favourite-28 text-right cursor:pointer" v-bind:class="[isActive ? 'grey' : 'pink']" @click="toggleClass()"></span>
            <div class="text-left">
          <h2 slot="header" class="modal-title" id="modal-title-default">일자 : 2019-11-24</h2>

            </div>
            <br>
            <div class="text-left">
          <h2 slot="header" class="modal-title" id="modal-title-default1">이름 : 이지수</h2>
            </div>
            <br>

          <div class="text-left" style="height: 100%">
              <p class="description">하얀 눈이 내려올 때면
                  온 세상이 물들을 때면
                  눈꽃이 피어나 또 빛이 나
                  눈이 부신 너처럼
                  Yeah girl
                  you should know that
                  That my heartbeats like
                  Huh Huh Huh Huh
                  From the bottom of my heart
                  I thank god I found you
                  쿵쿵 가슴이 왜 이렇게 가쁘니 yeah
                  꾹꾹 참아도
                  자꾸 네 생각이 나잖아 oh
                  You You I love you
                  and I know you love me too
                  네가 내게 불러 준
                  You're my boo
                  You 아직 꿈만 같아
                  And you 마치 선물 같아
                  For you 네 품에 안겨도
                  늘 불안불안 해 꿈처럼 깰까 봐
                  You 꼭 안아 줘야만 해
                  And you 아껴 줘야만 해
                  For you 큰 맘 먹고 네 꺼 돼준 걸
                  하늘에게 감사해
                  하얀 눈이 내려올 때면
                  온 세상이 물들을 때면
                  눈꽃이 피어나 또 빛이 나
                  눈이 부신 너처럼
                  사랑할 수 밖에 없어서
                  사랑한 네 손 잡고서
                  첫 눈 위를 걸어 발자국을 새겨
                  이 길 끝까지 걸어 갈 거야
                  With you
                  You 혹시 알고 있니
                  And you 느낄 수가 있니
                  For you 늘 자랑하고픈
                  네 여자친구가 되고만 싶은 걸
                  You 전부 다 주고 싶어
                  And you 잘 해주고 싶어
                  For you 다음 그 다음 해 겨울도
                  너의 곁에 있을게
                  하얀 눈이 내려올 때면
                  온 세상이 물들을 때면
                  눈꽃이 피어나 또 빛이 나
                  눈이 부신 너처럼</p>
          </div>
            <br>
            <br>
          <div class="text-right">
            <base-button type="primary" >답장</base-button>
            <base-button type="warning" >삭제</base-button>
            <base-button type="neutral" class="ml-auto" @click="modals.modal1 = false">취소
            </base-button>
          </div>
        </modal>

      </div>
    </template>

  </div>


</template>
<style>
    .pink{
        color: pink;
    }

    .grey{
        color: grey;
    }
</style>
<script>
  import Modal from "@/components/Modal.vue";
  export default {
    name: 'projects-table',
    components: {
      Modal
    },
    props: {
      type: {
        type: String
      },
      date: String
    },
    computed: {
      thStyle() {
        return {
          fontSize:'15px'
        };
      }
    },
  methods: {
      toggleClass: function(){

          // Check value
          if(this.isActive){
              this.isActive = false;
          }else{
              this.isActive = true;
          }

      }
  },
    data() {
      return {
          user: this.$store.state.user,
          isActive: true,
        message: [],
        modals: {
          modal1: false
        },
        tableData: [
          {
            img: 'img/theme/sooki.PNG',
            date: '2019.11.23',
            name: '이지수',
            content: '엄마 미안해',
            like: false
          },
          {
            img: 'img/theme/angular.jpg',
            date: '2019.11.23',
            name: '이지수',
            content: '미안해 솔직하지못한 내가',
            like: true
          },
          {
            img: 'img/theme/sketch.jpg',
            date: '2019.11.23',
            name: '김은아',
            content: '지금 이순간이 꿈이라면',
            like: true
          },
          {
            img: 'img/theme/react.jpg',
            date: '2019.11.23',
            name: '김남현',
            content: '살며시 너에게로 다가가',
            like: false
          },
          {
            img: 'img/theme/team-4-800x800.jpg',
            date: '2019.11.23',
            name: '이근환',
            content: '모든걸 고백할텐데',
            like: false
          }
        ]
      }
    }, mounted() {
          this.$http.get(`/api/message/receive/user/${this.user.userId}`,  { headers: { Authorization: `Bearer ${this.user.token}` } })
              .then(res => {
                  console.log('우왕');
                  console.log(res.data);
                  // res.data.children.forEach(child => children.push(child));
              });

      }
  }
</script>
<style>
</style>
