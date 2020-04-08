<template>
<b-container>
  <myNavbar/>
  <router-view/>
</b-container>
</template>
<script>
// importing navbar from components folder
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
