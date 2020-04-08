<template>
  <b-row align-h="center">
    <b-col cols="8">
      <h3 v-if="!loggedIn">You are not logged in!!</h3>
      <b-card
        v-else
        title="Edit Enrolment"
        tag="article"
      >

<!-- form starts here -->
        <b-form @submit="onSubmit">
          <b-form-group
            id="input-group-1"
            label="Date"
            label-for="input-1"
          >
            <b-form-datepicker
              id="input-1"
              v-model="enrolment.date"
              dark="true"
              type="date"
              required
              placeholder="Enter Date"
            ></b-form-datepicker>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Time"
            label-for="input-2"
          >
            <b-form-timepicker
              id="input-2"
              v-model="enrolment.time"
              type="time"
              now-button
              reset-button
              required
              placeholder="Enter Time"
            ></b-form-timepicker>
          </b-form-group>

          <b-form-group
            id="input-group-3"
            label="Status"
            label-for="input-3"
          >
            <b-form-select
            name='status'
            v-model='enrolment.status'
            class='form-control'>

              <option
              placeholder="Choose A Status"
               v-for="option in options"
              v-bind:value='enrolment.status'
              >
              {{option.text}}
            </option>

            ></b-form-select>
          </b-form-group>

          <b-form-group
            id="input-group-4"
            label="Course"
            label-for="input-4"
          >
          <b-form-select
          name='course'
          v-model='enrolment.course_id'
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
            id="input-group-5"
            label="Lecturer"
            label-for="input-5"
          >
          <b-form-select
          name='lecturer'
          v-model='enrolment.lecturer_id'
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
  export default {
    // data passed into component
    data() {
      return {
        enrolment:[],
        enrolments:'',
        courses:'',
        lecturers:'',
        show: true,
        loggedIn: false,
        // options used for populating status dropdown
        options: [
          { text: 'Interested', value: 'interested' },
          { text: 'Assigned', value: 'assigned' },
          { text: 'Associate', value: 'associate' },
          { text: 'Career Break', value: 'career_break'}
        ]
      }

},
    created() {
      // console.log(localStorage.getItem('token'));
      if (localStorage.getItem('token')) {
        this.loggedIn = true;
      }
      else {
        this.loggedIn = false;
      }

      let app = this;
      let token = localStorage.getItem('token');
      // retrieving specific enrolment by ID
      axios.get(`/api/enrolments/${app.$route.params.id}`, {
        headers: { Authorization: "Bearer " + token }
      })
      .then(function (response) {
        app.enrolment = response.data.data;
      })
      .catch(function (error) {
        console.log(error);
      });

      // retrieving list of courses for course dropdown
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
      // retrieving list of lecturers for lecturer dropdown
      axios.get('/api/lecturers', {
        headers: { Authorization: "Bearer " + token}
      })
      .then(function (response) {
         console.log(response.data);
         app.lecturers = response.data.data;
      })
      .catch(function (error) {
         console.log(error);
      });

      // retrieving info from enrolment to be edited
      axios.get(`/api/enrolments/${app.$route.params.id}`, {
        headers: { Authorization: "Bearer " + token }
      })
      .then(function (response) {
        app.enrolments = response.data.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()

        let app = this;
        let token = localStorage.getItem('token');
        // posting the new information to the enrolments API
        axios.put(`/api/enrolments/${app.$route.params.id}`, {
            date: app.enrolment.date,
            time: app.enrolment.time,
            status: app.enrolment.status,
            course_id: app.enrolment.course_id,
            lecturer_id: app.enrolment.lecturer_id,
        },
        {
          headers: { Authorization: "Bearer " + token }
        })
        .then(function (response) {
          app.$router.push(`/enrolments`);
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    }
  }
</script>
