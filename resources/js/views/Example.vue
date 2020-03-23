<template>
  <div>
    Test Login<br>
    <button @click="login()">Login</button>
    <br>
    Test Courses<br>
    <button @click="getCourses()">Courses</button>
    <br>
    Test Logout<br>
    <button @click="logout()">Logout</button>
  </div>
</template>
<script>
export default{
  name :'example',
  components : {

  },
  data(){
    return{
      email:'sam@bloggs.com',
      password:'secret',
      name:'',
      course: []
    }
  },
  mounted(){
    if (localStorage.getItem('token') != null){
        console.log('user logged in');
    }
    else {
      console.log('user not logged in');
    }
  },
  methods:{
    login(){
      let app = this;
      axios.post('/api/login',{
        email: app.email,
        password: app.password
      })
      .then(
        function(response){
          console.log(response.data);
          app.name = response.data.name;
          localStorage.setItem('token', response.data.token);
        })
      .catch(
        function(error){
          console.log(error);
        });
    },
    getCourses(){
      let token = localStorage.getItem('token');
      axios.get('/api/courses', {
        headers: {Authorization: "Bearer " + token}
      })
       .then(function(response){
         console.log(response.data.data);
       })
       .catch(function(error){
         console.log(error);
       })
    },
    logout(){
      localStorage.removeItem('token');
      console.log('logged out');
    }
  }
}
</script>
<style>
</style>
