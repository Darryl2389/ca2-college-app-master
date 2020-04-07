<template>
  <b-row>
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="courses-table">
      </b-pagination>

      <b-table-simple
      hover responsive
      id="courses-table"
      :items="items"
      :per-page="perPage"
      :current-page="currentPage"
      >
        <b-thead head-variant="dark">
          <b-tr>
            <b-th>Title</b-th>
            <b-th>Code</b-th>
            <b-th>Description</b-th>
            <b-th>Points</b-th>
            <b-th>Level</b-th>
            <b-th>Actions</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr v-for="item in items" :key="item.id">
            <h5>
            <b-td>{{ item.title }}</b-td>
          </h5>
            <b-td>{{ item.code }}</b-td>
            <b-td>{{ item.description }}</b-td>
            <b-td>{{ item.level }}</b-td>
            <b-td>{{ item.points }}</b-td>
            <b-td>
              <router-link :to="`/courses/show/${item.id}`">
              <b-button  variant="success">&#128065</b-button>
            </router-link>
            <router-link :to="`/courses/edit/${item.id}`">
            <b-button variant="primary">&#9998</b-button>
          </router-link>
          <b-button type="delete" variant="danger" @click="deleteCourse(item.id)" >&#10005</b-button>
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
      perPage: 5,
      currentPage: 1,
      items: []
    }
  },
  computed:{
    rows(){
      return this.items.length
    }
  },
  created(){
    let app = this;
    let token = localStorage.getItem('token');
    axios.get('/api/courses', {
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
    deleteCourse(id){
      let app = this;
      let token = localStorage.getItem('token');

      axios.get('/api/courses/'+ id, {
        headers: { Authorization: "Bearer " + token}
      })
        .then(function(response) {
        const enrolmentArray = response.data.data.enrolments

        if(confirm("Are you sure you want to delete this course?")){

        if(enrolmentArray.length!==0) {
          for (var i = 0; i < enrolmentArray.length; i++) {
            const enrolment = enrolmentArray[i]
            axios.delete("api/enrolments/" + enrolment.id, {
              headers: { Authorization: "Bearer " + token}
          })
        }
        axios.delete("api/courses/" + id, {
          headers: { Authorization: "Bearer " + token}
        })
        .then(function(response) {
          app.$delete(app.items)
          app.items = app.items.filter(data => data.id !== id)
        })

        } else {
          app.deleteCourse(id);
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
  width:95%;
  color:white;
}
</style>
