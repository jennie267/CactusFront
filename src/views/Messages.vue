<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <div class="card-header bg-transparent row align-items-center">
                <h1 class=""><h1 class="ni ni-email-83"></h1>  이지수님의 수신함  </h1>
                <div class="col text-right">
                    <base-button type="success" size="md"> 편지쓰기</base-button>
                </div>
            </div>
        </base-header>

            <div class="container-fluid mt--7">
                <children-table title="Children Table"></children-table>
                <br>
                <div class="row">
                    <div class="col">
                        <projects-table title="Light Table"></projects-table>
                    </div>
                </div>
            </div>

    </div>
</template>
<script>
  import ProjectsTable from './Tables/ProjectsTable'
  import ChildrenTable from './Tables/ChildrenTable'
  export default {
    name: 'tables',
    components: {
      ProjectsTable
        ,ChildrenTable
    }
  };
</script>
<style></style>
