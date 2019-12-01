<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8">
            <div class="card-header bg-transparent row align-items-center">
                <h1 class=""><h1 class="ni ni-email-83"></h1>  {{user.name}}님의 수신함  </h1>
                <write-letter-modal></write-letter-modal>
            </div>
        </base-header>

            <div class="container-fluid mt--7">
                <children-table title="Children Table" ></children-table>
                <br>
                <div class="row">
                    <div class="col">
                        <messages-table title="Message Table"></messages-table>
                    </div>
                </div>
            </div>
    </div>
</template>

<script>
  import MessagesTable from './Tables/MessagesTable'
  import ChildrenTable from './Tables/ChildrenTable'
  import WriteLetterModal from './Modals/WriteLetterModal'


  export default {
    name: 'tables',
    components: {
        MessagesTable
        ,ChildrenTable
        ,WriteLetterModal
    },
      data() {
          return {
              user: this.$store.state.user
          }
      },
      methods: {

      }
  };



</script>

<style></style>
