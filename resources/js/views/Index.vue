<template>
  <div>
    <div v-if="loggedIn">
      <h3>Welcome !</h3>
      <div>
  <div>
    <b-card-group deck>
      <!-- courses card -->
      <b-card
        img-src="https://lh3.googleusercontent.com/proxy/eO-WKCX1vyLCL8WDlvy4gqzKFVYV7Fwb4yF59ZvEqSZnLam4F2eWMro8UP8Df-3gDK50GugGpgK1hFXHTebpm0w6Zc4taTXjEuYmjQq93dgJIvUafdPPof2XUU5m3pQn7L6Nbrr-PzA6qhSD_djS1d1ydYhk0NPvT29oyZdO4N0lOhp-w6zz3DQ55pOYGfml"
        img-top
        img-height="192px"
        border-variant="primary"
        header="Courses"
        header-bg-variant="primary"
        header-text-variant="white"
        align="center"
      >
        <b-card-text>Click below to see the list of available courses.</b-card-text>
        <b-button to="/courses" variant="primary">List of courses</b-button>
      </b-card>

      <!-- lecturers card -->
      <b-card
        img-src="https://www.timeshighereducation.com/sites/default/files/styles/the_breaking_news_image_style/public/Pictures/web/x/k/i/lecturer_writing_on_blackboard.jpg?itok=qyufPnaR"
        img-height="192px"
        img-top
        border-variant="secondary"
        header="Lecturers"
        header-bg-variant="secondary"
        header-text-variant="white"
        align="center"
      >
        <b-card-text>Click below to see the list of lecturers.</b-card-text>
        <b-button to="/lecturers" variant="secondary">List of lecturers</b-button>
      </b-card>

      <!-- enrolments card -->
      <b-card
      img-src="https://www.heaton.school.nz/wp-content/uploads/2019/08/wordpress-postojN7MW-900x370.png"
      img-height="193px"
      img-top
      header-bg-variant="success"
      header-text-variant="white"
      border-variant="success"
      header="Enrolments"
      align="center">
        <b-card-text>Click below to see the list of enrolments.</b-card-text>
        <b-button to="/enrolments" variant="success">List of enrolments</b-button>
      </b-card>
    </b-card-group>
  </div>
</div>
</div>
<!-- login form only appears if user is not logged in -->
    <b-form v-else @submit="onSubmit">
      <b-form-group
      id="input-group-1"
      label= "Email Address"
      label-for= "input-1"
      >

      <b-form-input
      id="input-1"
      type="email"
      required
      placeholder="Enter Email"
      v-model="form.email"

      >
      </b-form-input>
    </b-form-group>
    <b-form-group
    id="input-group-2"
    label= "Password"
    label-for= "input-2"
    >

    <b-form-input
    id="input-2"
    type="password"
    required
    placeholder="Enter Password"
    v-model="form.password"

    >
    </b-form-input>
  </b-form-group>
  <b-button type="submit" variant="primary">Login</b-button>
    </b-form>
  </div>
</template>
<script>
export default{
  name :'index',
  components : {

  },
  data(){
    return{
      form: {
        email: '',
        password: ''
      },
      loggedIn: false,
      name: ''
    }
  },
  created(){
    if(localStorage.getItem('token')){
      this.loggedIn = true;
    }
    else{
      this.loggedIn = false;
    }
  },
  methods: {
    // login submit method
    onSubmit(evt){
      evt.preventDefault();

      let app = this;

      axios.post('/api/login', {
        email: app.form.email,
        password: app.form.password
      })
      .then(function(response){
        localStorage.setItem('token', response.data.token)
        app.loggedIn = true;

      })
      .catch(function(error){
        console.log(error);
      });
    }
  }
}
</script>
<style>
</style>
