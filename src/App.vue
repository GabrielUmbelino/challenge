<template>
  <div id="app">
    <Login />
  </div>
</template>

<script>
import Login from './components/Login.vue'
import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'

Vue.use(Buefy)

export default {
  name: 'app',
  components: {
    Login
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

@font-face {
    font-family: 'Open Sans';
    font-weight: 700;
    src: url(./assets/fonts/Open_Sans/OpenSans-Bold.ttf);
}

@font-face {
    font-family: 'Roboto';
    font-weight: 400;
    src: url(./assets/fonts/Roboto/Roboto-Regular.ttf);
}
</style>
