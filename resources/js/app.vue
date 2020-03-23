<template>
<b-container>
  <myNavbar/>
    <router-view/>
</b-container>
</template>
<script>
import myNavbar from './components/myNavbar'


export default{
  name :'app',
  components : {
    myNavbar

  },
  data(){
    return{

    }
  }

}
</script>
<style>
</style>
