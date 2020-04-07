<template>
          <b-card>

          <b-card-title>
            {{ lecturer.name }}
          </b-card-title>

          <h5>Address</h5>
          <b-card-text>
            {{ lecturer.address }}
          </b-card-text>

          <h5>Phone Number</h5>
          <b-card-text>
            {{ lecturer.phone }}
          </b-card-text>

          <h5>Email</h5>
          <b-card-text>
            {{ lecturer.email }}
          </b-card-text>

            <div class="float-right">
              <router-link :to="`/lecturers/`">
              <b-button  variant="success">&#8592</b-button>
            </router-link>
              <router-link :to="`/lecturers/edit/${lecturer.id}`">
              <b-button variant="primary">&#9998</b-button>
            </router-link>
            <b-button type="delete" variant="danger" @click="deleteLecturer(lecturer.id)">&#10005</b-button>
          </div>
          </b-card>
</template>
<script>
export default {
  data() {
    return {
      lecturer: [],

  }
},
  created(id){
    let app = this;
    let token = localStorage.getItem('token');
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
    deleteLecturer(id){
      let app = this;
      let token = localStorage.getItem('token');

      if(confirm("Are you sure you want to delete this enrolment?")){

      axios.delete('/api/lecturers/' + id, {
        headers: { Authorization: "Bearer " + token}
      })
      .then(function (response) {
         console.log(response);
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
</style>
