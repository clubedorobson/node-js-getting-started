<template>
  <div>
    <b-table striped hover :items="items" :fields="fields"></b-table>
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
      fields: ["Casa", "" , "Fora", ""],
      items: [
        this.partidas
      ],
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
</style>
