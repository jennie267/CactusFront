<template>
    <div class="main-content bg-default" style="background-image: url(img/backgroud/b1.jpg); background-size: cover; background-color: #d9e4d9 !important;">
        <!-- Header -->
        <div class="header bg-gradient-success py-7 py-lg-8">

        </div>
        <!-- Page content -->
        <div class="container-fluid mt--5 pb-5">
            <slide-y-up-transition mode="out-in" origin="center top">
                <router-view></router-view>
            </slide-y-up-transition>
        </div>
        <footer class="py-5">
            <div class="container">
                <div class="row align-items-center justify-content-xl-between">
                    <div class="col-xl-6">
                        <div class="copyright text-center text-xl-left text-muted">
                            &copy; {{year}} <a href="#" class="font-weight-bold ml-1"
                                               target="_blank">CACTUS</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>
<script>
  import { SlideYUpTransition } from 'vue2-transitions'

  export default {
    name: 'auth-layout',
    components: {
      SlideYUpTransition
    },
    data() {
      return {
        year: new Date().getFullYear(),
        showMenu: false
      }
    }
  }
</script>
<style>
</style>
