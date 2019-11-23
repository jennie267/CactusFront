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
<!--          <th scope="row">
            <div class="media align-items-center cursor:pointer">

              <div class="media-body">
                <span class="name mb-0 text-sm cursor:pointer" @click="modals.modal1 = true">{{row.date}}</span>
              </div>
            </div>
          </th>-->
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
          <h2 slot="header" class="modal-title" id="modal-title-default">일자 : 2019-11-24</h2>
          <h2 slot="header" class="modal-title" id="modal-title-default1">이름 : 이지수</h2>
          <div class="ni ni-favourite-28"></div>
          <div class="text-left">
            엄마 미안해
          </div>
          <div class="text-right">
            <base-button type="primary" >답장</base-button>
            <base-button type="warning" >삭제</base-button>
            <base-button type="link" class="ml-auto" @click="modals.modal1 = false">취소
            </base-button>
          </div>
        </modal>

      </div>
    </template>

  </div>


</template>
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
    data() {
      return {
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
    }
  }
</script>
<style>
</style>
