<template>
  <b-row>
    <b-card>
          <b-card-title>
            {{ course.title }}
          </b-card-title>

          <b-card-sub-title>
            {{ course.code }}
          </b-card-sub-title>

          <br>

          <h4>Description</h4>
          <b-card-text>
            {{ course.description }}
          </b-card-text>

          <h4>Level</h4>
          <b-card-text>
          {{ course.level }}
        </b-card-text>

          <h4>Points</h4>
          <b-card-text>
          {{ course.points }}
        </b-card-text>

          <div class="float-right">
            <!-- back button -->
            <router-link :to="`/courses/`">
            <b-button  variant="success">&#8592;</b-button>
          </router-link>
          <!-- edit button -->
          <router-link :to="`/courses/edit/${course.id}`">
          <b-button variant="primary">&#9998</b-button>
        </router-link>
        <!-- delete button -->
        <b-button type="delete" variant="danger" @click="deleteCourse(course.id)" >&#10005</b-button>
      </div>
      </b-card>
  </b-row>
</template>
<script>
export default {
  // data passed into component
  data() {
    return {
      course: [],

  }
},
  created(id){
    // retrieving token to ensure logged in
    let app = this;
    let token = localStorage.getItem('token');
    // retrieving courses from API
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
  },
  methods: {
    // delete course method
    deleteCourse(id){
      let app = this;
      let token = localStorage.getItem('token');

      // modal displaying the following question to prompt user
      if(confirm("Are you sure you want to delete this course?")){

        // deleting the specified course by ID
      axios.delete('/api/courses/' + id, {
        headers: { Authorization: "Bearer " + token}
      })
      .then(function (response) {
         console.log(response);
         app.course = app.course.filter(data => data.id !== id)
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
</style>
