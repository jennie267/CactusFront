<template>
  <div class="card shadow"
       :class="type === 'dark' ? 'bg-default': ''">
    <div class="card-header border-0"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row align-items-center">
        <div class="col">
          <h3 id="clickSchedule" class="mb-0" :class="type === 'dark' ? 'text-white': ''" >
          {{nameOfChild}} 일정
          </h3>
        </div>
        <div class="col text-right">
          <base-button type="primary" size="sm" @click="registration">등록</base-button>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <base-table class="table align-items-center table-flush"
                  :class="type === 'dark' ? 'table-dark': ''"
                  :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                  tbody-classes="list"
                  :data="tableData">
        <template slot="columns">
          <th>Project</th>
          <th>Budget</th>
          <th>Users</th>
          <th></th>
        </template>

        <template slot-scope="{row}">
          <th scope="row">
            <div class="media align-items-center">
              <div class="media-body">
                <span class="name mb-0 text-sm">{{row.title}}</span>
              </div>
            </div>
          </th>
          <td class="budget">
            {{row.budget}}
          </td>
          <td>
            <badge class="badge-dot mr-4" :type="row.statusType">
              <i :class="`bg-${row.statusType}`"></i>
              <span class="status">{{row.status}}</span>
            </badge>
          </td>


          <td class="text-right">
            <base-dropdown class="dropdown"
                           position="right">
              <a slot="title" class="btn btn-sm btn-icon-only text-light" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-ellipsis-v"></i>
              </a>

              <template>
                <a class="dropdown-item" href="#">삭제</a>
                <a class="dropdown-item" href="#">수정</a>
              </template>
            </base-dropdown>
          </td>

        </template>

      </base-table>
    </div>

    <div class="card-footer d-flex justify-content-end"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <!-- <base-pagination total="30"></base-pagination> -->
    </div>

  </div>
</template>
<script>
  export default {
    name: 'dailySchedule-table',
    props: {
      type: {
        type: String
      },
      title: String
      ,nameOfChild: String
    },
    methods: {
      registration() {
        alert("시작");
      }
    },
    data() {
      return {
        tableData: [
          {
            title: 'Argon Design System',
            budget: '$2500 USD',
            status: 'pending',
          },
          {
            title: 'Angular Now UI Kit PRO',
            budget: '$1800 USD',
            status: 'completed',
          },
          {
            title: 'Black Dashboard',
            budget: '$3150 USD',
            status: 'delayed',
          },
          {
            title: 'React Material Dashboard',
            budget: '$4400 USD',
            status: 'on schedule',
          },
          {
            title: 'Vue Paper UI Kit PRO',
            budget: '$2200 USD',
            status: 'completed',
          }
        ]
      }
    }
  }
</script>
<style>
</style>
