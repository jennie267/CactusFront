<template>
  <div class="card shadow"
       :class="type === 'dark' ? 'bg-default': ''">


    <div class="table-responsive">
      <base-table class="table align-items-center table-flush"
                  :class="type === 'dark' ? 'table-dark': ''"
                  :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                  tbody-classes="list"
                  :data="tableData">
        <template slot="columns">
          <th>일자</th>
          <th>이름</th>
          <th>내용</th>
          <th>Users</th>
          <th></th>
        </template>

        <template slot-scope="{row}">
          <th scope="row">
            <div class="media align-items-center">
              <a href="#" class="avatar rounded-circle mr-3">
                <img alt="Image placeholder" :src="row.img">
              </a>
              <div class="media-body">
                <span class="name mb-0 text-sm">{{row.date}}</span>
              </div>
            </div>
          </th>
          <td class="name">
            {{row.name}}
          </td>
          <td>
            <badge class="badge-dot mr-4" :type="row.statusType">
              <i :class="`bg-${row.statusType}`"></i>
              <span class="status">{{row.status}}</span>
            </badge>
          </td>
          <td>
            <div class="avatar-group">
              <a href="#" class="avatar avatar-sm rounded-circle" data-toggle="tooltip" data-original-title="Ryan Tompson">
                <img alt="Image placeholder" src="img/theme/team-1-800x800.jpg">
              </a>
              <a href="#" class="avatar avatar-sm rounded-circle" data-toggle="tooltip" data-original-title="Romina Hadid">
                <img alt="Image placeholder" src="img/theme/team-2-800x800.jpg">
              </a>
              <a href="#" class="avatar avatar-sm rounded-circle" data-toggle="tooltip" data-original-title="Alexander Smith">
                <img alt="Image placeholder" src="img/theme/team-3-800x800.jpg">
              </a>
              <a href="#" class="avatar avatar-sm rounded-circle" data-toggle="tooltip" data-original-title="Jessica Doe">
                <img alt="Image placeholder" src="img/theme/team-4-800x800.jpg">
              </a>
            </div>
          </td>

          <td>
            <div class="d-flex align-items-center">
              <span class="completion mr-2">{{row.completion}}%</span>
              <div>
                <base-progress :type="row.statusType"
                               :show-percentage="false"
                               class="pt-0"
                               :value="row.completion"/>
              </div>
            </div>
          </td>


        </template>

      </base-table>
    </div>

    <div class="card-footer d-flex justify-content-end"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <base-pagination total="30"></base-pagination>
    </div>

  </div>
</template>
<script>
  export default {
    name: 'projects-table',
    props: {
      type: {
        type: String
      },
      date: String
    },
    data() {
      return {
        tableData: [
          {
            img: 'img/theme/bootstrap.jpg',
            date: '2019.11.23',
            name: '이지수',
            status: 'pending',
            statusType: 'warning',
            completion: 60
          },
          {
            img: 'img/theme/angular.jpg',
            date: 'Angular Now UI Kit PRO',
            name: '이지수',
            status: 'completed',
            statusType: 'success',
            completion: 100
          },
          {
            img: 'img/theme/sketch.jpg',
            date: 'Black Dashboard',
            name: '김은아',
            status: 'delayed',
            statusType: 'danger',
            completion: 72
          },
          {
            img: 'img/theme/react.jpg',
            date: 'React Material Dashboard',
            name: '김남현',
            status: 'on schedule',
            statusType: 'info',
            completion: 90
          },
          {
            img: 'img/theme/vue.jpg',
            date: 'Vue Paper UI Kit PRO',
            name: '이근환',
            status: 'completed',
            statusType: 'success',
            completion: 100
          }
        ]
      }
    }
  }
</script>
<style>
</style>
