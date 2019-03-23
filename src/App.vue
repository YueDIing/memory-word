<template>
  <div id="app" v-cloak>
    <router-view/>
  </div>
</template>

<script>
import './assets/css/global.less'
export default {
  name: 'App'
}
</script>

<style>
[v-cloak]{
  display: none !important;
}
#app{
  height: 100%;
}
</style>
