<template>
  <div>
    <v-select 
      class="select" 
      ref="Temporada"  
      v-model="seasons"
      :options="seasons"
      ></v-select>
    <b-table class="btable" striped hover :items="partidas" :fields="fields"></b-table>
  </div>
</template>

<script>
//import clubesService from "../services/clubesService";
import clubesPartidasService from "../services/clubesPartidas";
//import partidasService from "../services/partidasService"

export default {
  name: "clube",
  data() {
    return {
      /*fields: ["first_name", "last_name", "age"],
      items: [
        {
          isActive: true,
          age: 40,
          first_name: "Dickerson",
          last_name: "Macdonald",
        },
        { isActive: false, age: 21, first_name: "Larsen", last_name: "Shaw" },
        { isActive: false, age: 89, first_name: "Geneva", last_name: "Wilson" },
        { isActive: true, age: 38, first_name: "Jami", last_name: "Carney" },
      ],*/

      fields: [
        {
          key: "partidasHomeClub.name",
          label: "Casa",
          sortable: false,
        },
        {
          key: "homeGoals",
          label: "",
          sortable: false,
        },
        {
          key: "awayGoals",
          label: "",
          sortable: false,
        },
        {
          key: "partidasAwayClub.name",
          label: "Fora",
          sortable: false,
        },
      ],
      model: {
        opcoes : []
      },
      currentPartida: null,
      message: "",
      seasons: [],
      partidas: [],
      currentIndex: -1,
    };
  },
  methods: {
    getPartidas(seasonId, clubId) {
      clubesPartidasService
        .getBySeason(clubId, seasonId)
        .then((response) => {
          console.log(response.data.partidasSeason);
          this.partidas = response.data.partidasSeason;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getSeasons(clubId) {
      console.log(clubId);
      clubesPartidasService.getSeasons(clubId).then((response) => {
        response.data.forEach((season) => {
          if (season.seasonid != null) {
            this.seasons.push(season.seasonid);
          }
        });
        this.seasons = [...new Set(this.seasons)];
      });
    },

    setActivePartida(partida, index) {
      this.currentPartida = partida;
      this.currentIndex = index;
    },
    /*updatePublished(status) {
      var data = {
        id: this.currentTutorial.id,
        title: this.currentTutorial.title,
        description: this.currentTutorial.description,
        published: status
      };

      TutorialDataService.update(this.currentTutorial.id, data)
        .then(response => {
          this.currentTutorial.published = status;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },*/

    /*updateTutorial() {
      TutorialDataService.update(this.currentTutorial.id, this.currentTutorial)
        .then(response => {
          console.log(response.data);
          this.message = 'The tutorial was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },*/

    /*deleteTutorial() {
      TutorialDataService.delete(this.currentTutorial.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "tutorials" });
        })
        .catch(e => {
          console.log(e);
        });
    }*/
  },
  mounted() {
    this.message = "";
    console.log(this.$route.params);
    this.getSeasons(this.$route.params.clubId);
    this.getPartidas(33, this.$route.params.clubId);
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}

.btable {
  text-align: center;
}

</style>
