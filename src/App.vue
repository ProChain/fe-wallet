<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0 auto;
}

body {
  padding: 0;
  margin: 0;
}

a {
  text-decoration: none;
}

@media screen and (max-width: 500px){
  #app {
    width: 100%;
  }
}
</style>
