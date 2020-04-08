<template>
  <b-row>
      <b-table-simple hover responsive>
        <b-thead head-variant="dark">
          <b-tr>
            <!-- table headings -->
            <b-th>Date</b-th>
            <b-th>Time</b-th>
            <b-th>Status</b-th>
            <b-th>Course</b-th>
            <b-th>Lecturer</b-th>
            <b-th>Actions</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <!-- listing the enrolments in a table format -->
          <b-tr v-for="item in items" :key="item.id">
            <b-td>{{ item.date }}</b-td>
            <b-td>{{ item.time }}</b-td>
            <b-td>{{ item.status }}</b-td>
            <b-td>{{ item.course.title }}</b-td>
            <b-td>{{ item.lecturer.name }}</b-td>
            <b-td>
              <!-- view button -->
              <router-link :to="`/enrolments/show/${item.id}`">
              <b-button variant="success">&#128065</b-button>
            </router-link>
            <!-- edit button -->
              <router-link :to="`/enrolments/edit/${item.id}`">
              <b-button variant="primary">&#9998</b-button>
            </router-link>
            <!-- delete button -->
            <b-button type="delete" variant="danger" @click="deleteEnrolment(item.id)">&#10005</b-button>
            </b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
  </b-row>
</template>
<script>
export default {
  // data passed into component
  data() {
    return {
      items: [],
  }
},
  created(){
    let app = this;
    let token = localStorage.getItem('token');
    // retrieving list of enrolments
    axios.get('/api/enrolments', {
      headers: { Authorization: "Bearer " + token}
    })
    .then(function (response) {
       console.log(response.data);
       app.items = response.data.data;
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

      // prompt for user to ensure decision is correct
      if(confirm("Are you sure you want to delete this enrolment?")){

      // deleting enrolments by ID
      axios.delete('/api/enrolments/' + id, {
        headers: { Authorization: "Bearer " + token}
      })
      .then(function (response) {
         console.log(response);
         // filter items in enrolments list after deletion has occurred
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
  width:95%;
}
</style>
