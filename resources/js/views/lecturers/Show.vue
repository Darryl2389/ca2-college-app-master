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
              <!-- back button -->
              <router-link :to="`/lecturers/`">
              <b-button  variant="success">&#8592</b-button>
            </router-link>
            <!-- edit button -->
              <router-link :to="`/lecturers/edit/${lecturer.id}`">
              <b-button variant="primary">&#9998</b-button>
            </router-link>
            <!-- delete button -->
            <b-button type="delete" variant="danger" @click="deleteLecturer(lecturer.id)">&#10005</b-button>
          </div>
          </b-card>
</template>
<script>
export default {
  // data passed into component
  data() {
    return {
      lecturer: [],

  }
},
  created(id){
    let app = this;
    let token = localStorage.getItem('token');
    // retrieving lecturer by ID to be displayed as a singular item
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
    // delete lecturer method
    deleteLecturer(id){
      let app = this;
      let token = localStorage.getItem('token');

      // prompt to remind user of the deletion that will occur if confirmed
      if(confirm("Are you sure you want to delete this enrolment?")){

      // deleting lecturer by ID
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
