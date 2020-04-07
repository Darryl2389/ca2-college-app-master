<template>
<b-row align-h="center">
  <b-col cols="8">
    <b-card title="Add Enrolment" tag="article">
      <b-form @submit="onSubmit">
        <b-form-group
        id="input-group-1"
        label= "Date"
        label-for= "input-1"
        >

        <b-form-datepicker
        id="input-1"
        type="date"
        dark="true"
        required
        placeholder="Enter Date"
        v-model="form.date"

        >
        </b-form-datepicker>
      </b-form-group>
      <b-form-group
      id="input-group-2"
      label= "Time"
      label-for= "input-2"
      >
      <b-form-timepicker
      id="input-2"
      type="time"
      required
      now-button
      reset-button
      placeholder="Enter Time"
      v-model="form.time"

      >
    </b-form-timepicker>
    </b-form-group>
    <b-form-group
      id="input-group-3"
      label="Status"
      label-for="input-3"
    >
      <b-form-select
      name='status'
      v-model='form.status'
      class='form-control'>

        <option
        placeholder="Choose A Status"
         v-for="option in options"
        v-bind:value='option.value'
        >
        {{option.text}}
      </option>

      ></b-form-select>
    </b-form-group>

  <b-form-group
    id="select-group-1"
    label= "Course"
    label-for= "select-1"
    >
    <b-form-select
    name='course'
    v-model='form.course'
    class='form-control'>
      <option
      placeholder="Choose A Course"
      v-for="course in courses"
      v-bind:value='course.id'
      >
      {{ course.title }}
    </option>
  </b-form-select>
  </b-form-group>

  <b-form-group
    id="select-group-2"
    label= "Lecturer"
    label-for= "select-2"
    >
    <b-form-select
    name='lecturer'
    v-model='form.lecturer'
    class='form-control'>
      <option
       v-for="lecturer in lecturers"
      v-bind:value='lecturer.id'
      >
      {{ lecturer.name }}
    </option>
  </b-form-select>
  </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </b-card>
  </b-col>
</b-row>
</template>
<script>
export default{
  data(){
    return{
      form: {
        date: '',
        time: '',
        status: '',
        course: '',
        lecturer: ''
      },
      loggedIn: false,
      errors: [],
      courses: [],
      lecturers: [],
      enrolment:[],
      enrolments:[],
      options: [
        { text: 'Interested', value: 'interested' },
        { text: 'Assigned', value: 'assigned' },
        { text: 'Associate', value: 'associate' },
        { text: 'Career Break', value: 'career_break'}
      ]
    }
  },
  computed: {
    codeValid(){
      return this.form.code.length <= 5 && this.form.code.length > 0
  }
},
  created(){
    if(localStorage.getItem('token')){
      this.loggedIn = true;

      let app = this;
      let token = localStorage.getItem('token');
      axios.get('/api/courses', {
        headers: { Authorization: "Bearer " + token}
      })
      .then(function (response) {
         console.log(response.data);
         app.courses = response.data.data;
      })
      .catch(function (error) {
         console.log(error);
      });

      axios.get('/api/lecturers', {
        headers: { Authorization: "Bearer " + token}
      })
      .then(function (response) {
         console.log(response.data);
         app.lecturers = response.data.data;
      })
      .catch(function (error) {
         console.log(error);
      })

      axios.get(`/api/enrolments`, {
        headers: { Authorization: "Bearer " + token }
      })
      .then(function (response) {
        app.enrolment.status = response.data.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    else{
      this.loggedIn = false;
      this.$router.push('/enrolments')
    }

  },
  methods: {
    onSubmit(evt){
      evt.preventDefault()

      let app = this;
      let token = localStorage.getItem('token');

      axios.post('/api/enrolments', {
        date: app.form.date,
        time: app.form.time,
        status: app.form.status,
        course_id: app.form.course,
        lecturer_id: app.form.lecturer
      }, {
        headers:{Authorization: `Bearer ${token}`}
      })
      .then(function(response){
        app.$router.push('/enrolments');
      })
      .catch(function(error){
        console.log(error);
        app.errors = error.response.data.errors
      });
    }
  }
}
</script>
