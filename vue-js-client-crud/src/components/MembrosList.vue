<template>
  <div class="list row">
    <!--<div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by title"
          v-model="title"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>-->
    <div class="col-md-6">
      <h4>Membros</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(membro, index) in membros"
          :key="index"
          @click="setActiveMembro(membro, index)"
        >
          {{ membro.proName }}
        </li>
      </ul>

      <!--<button class="m-3 btn btn-sm btn-danger" @click="removeAllTutorials">
        Remove All
      </button>-->
    </div>
    <div class="col-md-6">
      <div v-if="currentMembro">
        <h4>Membro</h4>
        <div>
          <label><strong>Nome:</strong></label> {{ currentMembro.favoritePosition }}
        </div>
        <div>
          <label><strong>Gols:</strong></label> {{ currentMembro.goals }}
        </div>
        <div>
          <label><strong>Assistencias:</strong></label> {{ currentMembro.assists}}
        </div>

        <a class="badge badge-warning"
          :href="`/membros/${this.$route.params.clubId}/` + currentMembro.name"
        >
          Edit
        </a>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Tutorial...</p>
      </div>
    </div>
  </div>
</template>

<script>
import membrosService from "../services/membrosService";

export default {
  name: "membros-list",
  data() {
    return {
      membros: [],
      currentMembro: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {

    getMembros(clubId) {
      membrosService.getAll(clubId)
        .then(response => {
          this.membros = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    /*refreshList() {
      this.retrieveTutorials();
      this.currentTutorial = null;
      this.currentIndex = -1;
    },*/

    setActiveMembro(membro, index) {
      this.currentMembro = membro;
      this.currentIndex = index;
    },
  },
  mounted() {
    this.getMembros(this.$route.params.clubId);
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
