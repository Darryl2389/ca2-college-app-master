<template>
<b-row align-h="center">
  <b-col cols='8'>
    <b-card title="Add Course" tag="article">
      <b-form @submit="onSubmit">
        <b-form-group
        id="input-group-1"
        label= "Title"
        label-for= "input-1"
        >
<!-- form start -->
        <b-form-input
        id="input-1"
        type="text"
        required
        placeholder="Enter Title"
        v-model="form.title"

        >
        </b-form-input>
      </b-form-group>
      <b-form-group
      id="input-group-2"
      label= "Code"
      label-for= "input-2"
      >
      <b-form-input
      id="input-2"
      type="text"
      required
      placeholder="Enter Code"
      v-model="form.code"

      >
      </b-form-input>
      <b-form-invalid-feedback :state="codeValid">
        The code may not be greater than 5 characters.
      </b-form-invalid-feedback>
      <b-form-valid-feedback :state="codeValid">
        Looks Good.
      </b-form-valid-feedback>
    </b-form-group>
    <b-form-group
    id="input-group-3"
    label= "Description"
    label-for= "input-3"
    >

    <b-form-input
    id="input-3"
    type="text"
    required
    placeholder="Enter Description"
    v-model="form.description"

    >
    </b-form-input>
  </b-form-group>
  <b-form-group
  id="input-group-4"
  label= "Points"
  label-for= "input-4"
  >

  <b-form-input
  id="input-4"
  type="number"
  required
  placeholder="Enter Points"
  v-model="form.points"

  >
  </b-form-input>
    </b-form-group>
    <b-form-group
    id="input-group-5"
    label= "Level"
    label-for= "input-5"
    >

    <b-form-spinbutton
    id="input-5"
    type="number"
    required
    max="10"
    placeholder="Enter Level"
    v-model="form.level"
    >
    </b-form-spinbutton>
    </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
<!-- form end -->
    </b-card>
  </b-col>
</b-row>
</template>
<script>
export default{
  data(){
    return{
      form: {
        title: '',
        code: '',
        description: '',
        points: '',
        level: ''
      },
      loggedIn: false,
      errors: []
    }
  },
  computed: {
    // ensuring validation is correct on the code field
    codeValid(){
      return this.form.code.length <= 5 && this.form.code.length > 0
    }
  },
  created(){
    if(localStorage.getItem('token')){
      this.loggedIn = true;
    }
    else{
      this.loggedIn = false;
      this.$router.push('/courses')
    }
  },
  methods: {
    // when the submit button is pressed the following actions are carried out
    onSubmit(evt){
      evt.preventDefault()

      let app = this;
      let token = localStorage.getItem('token');

      axios.post('/api/courses', {
        title: app.form.title,
        code: app.form.code,
        description: app.form.description,
        points: app.form.points,
        level: app.form.level
      }, {
        headers:{Authorization: `Bearer ${token}`}
      })
      .then(function(response){
        app.$router.push('/courses');
      })
      .catch(function(error){
        console.log(error);

        app.errors = error.response.data.errors
      });
    }
  }
}
</script>
<style>

</style>
