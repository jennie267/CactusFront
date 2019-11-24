<template>
    <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
            <div class="card bg-secondary shadow border-0">
                <div class="card-body px-lg-8 py-lg-8">
                    <form role="form">
                        <div class="row justify-content-center">
                            <div class="col-lg-3 order-lg-2">
                                <div class="card-profile-image">
                                    <a href="#">
                                        <img src="img/theme/typeUser.jpg" class="rounded-circle">
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="row my-4">
                            <div class="col-12">
                            </div>
                        </div>
                        <br>
                        <br>
                        <br>                           
                        <br>                           
                        <br>                           
                        <br>                           
                        <div class="text-center">
                            <base-button type="primary" class="btn btn-outline-success">부모 회원가입</base-button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    <div class="col-lg-5 col-md-7">
            <div class="card bg-secondary shadow border-0">
                <div class="card-body px-lg-8 py-lg-8">
                    <form role="form">
                        <div class="row justify-content-center">
                            <div class="col-lg-3 order-lg-2">
                                <div class="card-profile-image">
                                    <a href="#">
                                        <img src="img/theme/typeUser.jpg" class="rounded-circle">
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="row my-4">
                            <div class="col-12">
                            </div>
                        </div>
                        <br>
                        <br>
                        <br>                           
                        <br>                           
                        <br>                           
                        <br>                          
                        <div class="text-center">
                            <base-button type="primary" class="btn btn-outline-success">자녀 회원가입</base-button>
                        </div>
                    </form>
                </div>
            </div>
        </div>        
    </div>
</template>
<script>
  export default {
    name: 'registerSelModal',
    data() {
      return {
        model: {
          name: '',
          email: '',
          password: ''
        }
      }
    }
  }
</script>
<style>
</style>
