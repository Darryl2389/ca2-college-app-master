<template>
<b-container>
  <myNavbar/>
  <router-view/>
</b-container>
</template>
<script>
import myNavbar from './../components/myNavbar.vue'



export default{
  name :'app',

  data(){
    return{

    }
  },
  components : {
    myNavbar

  }
}
</script>
<style>
body{
  background-color: slategrey;
}
h3{
  color: white;
}
</style>
