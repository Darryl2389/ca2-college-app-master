<template>
  <b-row>
      <b-table-simple hover responsive>
        <b-thead head-variant="dark">
          <b-tr>
            <b-th>Name</b-th>
            <b-th>Address</b-th>
            <b-th>Email</b-th>
            <b-th>Phone</b-th>
            <b-th>Actions</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr v-for="item in items" :key="item.id">
            <b-td>{{ item.name }}</b-td>
            <b-td>{{ item.address }}</b-td>
            <b-td>{{ item.email }}</b-td>
            <b-td>{{ item.phone }}</b-td>
            <b-td>
              <router-link :to="`/lecturers/show/${item.id}`">
              <b-button variant="success">&#128065</b-button>
            </router-link>
            <router-link :to="`/lecturers/edit/${item.id}`">
            <b-button variant="primary">&#9998</b-button>
          </router-link>
          <b-button type="delete" variant="danger" @click="deleteLecturer(item.id)" >&#10005</b-button>
          </b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
    </b-col>
  </b-row>
</template>
<script>
export default {
  data() {
    return {
      items: [],
    }
  },
  created(){
    let app = this;
    let token = localStorage.getItem('token');
    axios.get('/api/lecturers', {
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
    deleteLecturer(id){
      let app = this;
      let token = localStorage.getItem('token');

      axios.get('/api/lecturers/'+ id, {
        headers: { Authorization: "Bearer " + token}
      })
        .then(function(response) {
        const enrolmentArray = response.data.data.enrolments

        if(confirm("Are you sure you want to delete this lecturer?")){

        if(enrolmentArray.length!==0) {
          for (var i = 0; i < enrolmentArray.length; i++) {
            const enrolment = enrolmentArray[i]
            axios.delete("api/enrolments/" + enrolment.id, {
              headers: { Authorization: "Bearer " + token}
          })
        }
        axios.delete("api/lecturers/" + id, {
          headers: { Authorization: "Bearer " + token}
        })
        .then(function(response) {
          app.$delete(app.items)
          app.items = app.items.filter(data => data.id !== id)
        })

        } else {
          app.deleteLecturer(id);
          app.items = app.items.filter(data => data.id !== id)
        }
      }
      })
      .catch(function(error) {
        console.log(error);
      })
    }
}
}
</script>
<style>
.table{
  margin-left:12px;
  width:90%;
}
</style>
