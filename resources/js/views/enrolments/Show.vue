<template>
  <div>
    <b-card>
          <b-card-title>
            {{ enrolment.date }}
            <div class= "float-right">
            {{enrolment.id}}
          </div>
          </b-card-title>

          <b-card-sub-title>
            {{  enrolment.time }}
          </b-card-sub-title>

          <br>

          <h5>Status</h5>
          <b-card-text>
            {{  enrolment.status }}
          </b-card-text>

          <h5>Course</h5>
          <!-- linking to course show page -->
        <router-link :to="`/courses/show/${enrolment.course.id}`">
        <b-card-text>
        {{  enrolment.course.title }}
      </b-card-text>
      </router-link>


          <h5>Lecturer</h5>
          <!-- linking to lecturer show page -->
          <router-link :to="`/lecturers/show/${enrolment.lecturer.id}`">
          <b-card-text>
          {{  enrolment.lecturer.name }}
        </b-card-text>
        </router-link>

        <!-- floating buttons to right of card -->
        <div class = "float-right">
          <!-- back button -->
            <router-link :to="`/enrolments/`">
            <b-button  variant="success">&#8592;</b-button>
          </router-link>
          <!-- edit button -->
          <router-link :to="`/enrolments/edit/${enrolment.id}`">
          <b-button variant="primary">&#9998</b-button>
        </router-link>
        <!-- delete button -->
        <b-button type="delete" variant="danger" @click="deleteEnrolment(enrolment.id)" >&#10005</b-button>
            </div>
      </b-card>
  </div>
</template>
<script>
export default {
  // data passed into component
  data() {
    return {
      enrolment: [],

  }
},
  created(id){
    let app = this;
    let token = localStorage.getItem('token');
    // retrieving specific enrolment by ID
    axios.get(`/api/enrolments/${app.$route.params.id}`, {
      headers: { Authorization: "Bearer " + token}
    })
    .then(function (response) {
       console.log(response.data);
       app.enrolment = response.data.data;
    })
    .catch(function (error) {
       console.log(error);
    })
    // retrieving specific course by ID
    axios.get(`/api/courses/${app.$route.params.id}`, {
      headers: { Authorization: "Bearer " + token}
    })
    .then(function (response) {
       console.log(response.data);
       app.course = response.data.data;
    })
    .catch(function (error) {
       console.log(error);
    })
    // retrieving specific lecturer by ID
    axios.get(`/api/lecturers/${app.$route.params.id}`, {
      headers: { Authorization: "Bearer " + token}
    })
    .then(function (response) {
       console.log(response.data);
       app.lecturer = response.data.data;
    })
    .catch(function (error) {
       console.log(error);
    })
  },
  methods: {
    // delete enrolment method
    deleteEnrolment(id){
      let app = this;
      let token = localStorage.getItem('token');

      // prompt to remind user of the item they are about to delete
      if(confirm("Are you sure you want to delete this enrolment?")){

        // deletion of specific enrolment
      axios.delete('/api/enrolments/' + id, {
        headers: { Authorization: "Bearer " + token}
      })
      .then(function (response) {
         console.log(response);
         // filtering items table after deletion has occurred
         app.items = app.items.filter(data => data.id !== id)
      })
      .catch(function (error) {
         console.log(error);
      });
    }
    }
}
}
</script>
<style>
.table{
  margin-left:12px;
  width:95%;
}
.card-text{
  text-decoration: none;
}
</style>
