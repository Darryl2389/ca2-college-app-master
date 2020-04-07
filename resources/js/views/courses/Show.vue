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
            <router-link :to="`/courses/`">
            <b-button  variant="success">&#8592;</b-button>
          </router-link>
          <router-link :to="`/courses/edit/${course.id}`">
          <b-button variant="primary">&#9998</b-button>
        </router-link>
        <b-button type="delete" variant="danger" @click="deleteCourse(course.id)" >&#10005</b-button>
      </div>
      </b-card>
  </b-row>
</template>
<script>
export default {
  data() {
    return {
      course: [],

  }
},
  created(id){
    let app = this;
    let token = localStorage.getItem('token');
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
    deleteCourse(id){
      let app = this;
      let token = localStorage.getItem('token');

      if(confirm("Are you sure you want to delete this course?")){

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
