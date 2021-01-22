<template>
  <div>
    <v-select 
      class="select"
      placeholder = "Escolha a temporada"
      v-model= "selectedSeason" 
      :items="opcoes"
      item-text="label"
      item-value="value"
      v-on:input="getPartidas"
      ></v-select>
    <b-table class="btable" striped hover :items="partidas" :fields="fields">
      <template #cell(partidasHomeClub.customcrestid)="data">
        <b-img fluid height="80%" width="80%" v-bind:src="'https://fifa21.content.easports.com/fifa/fltOnlineAssets/05772199-716f-417d-9fe0-988fa9899c4d/2021/fifaweb/crests/256x256/l'+ data.value +'.png'" alt="..." /> 
      </template>
      <template #cell(partidasAwayClub.customcrestid)="data">
        <b-img fluid height="80%" width="80%" v-bind:src="'https://fifa21.content.easports.com/fifa/fltOnlineAssets/05772199-716f-417d-9fe0-988fa9899c4d/2021/fifaweb/crests/256x256/l'+ data.value +'.png'" alt="..." /> 
      </template>
    </b-table>
  </div>
</template>

<script>
//import clubesService from "../services/clubesService";
import clubesPartidasService from "../services/clubesPartidas";
//import partidasService from "../services/partidasService"

export default {
  name: "partidas",
  data() {
    return {
      selectedSeason: {
        label: 'Escolha a temporada',
        value: null
      },
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
          key: "partidasHomeClub.customcrestid",
          label: "",
          sortable: false
        },
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
        {
          key: "partidasAwayClub.customcrestid",
          label: "",
          sortable: false
        },
      ],
      opcoes : [],
      model: {
        opcoes : [],
        selected: null
      },
      currentPartida: null,
      message: "",
      seasons: [],
      partidas: [],
      currentIndex: -1,
    };
  },
  methods: {
    getPartidas(seasonId) {
      let clubId = this.$route.params.clubId
      console.log(clubId)
      console.log(seasonId)
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
        this.seasons.forEach(season =>{
          console.log(season)
          this.opcoes.push({
            label: 'Temporada ' + season,
            value: season
          })
        })
        console.log(this.opcoes)
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
    //this.getPartidas(null, this.$route.params.clubId);
  },
};
</script>

<style>

td { 
  vertical-align: middle !important;
}


.edit-form {
  max-width: 300px;
  margin: auto;
}

.btable {
  text-align: center;
  vertical-align: middle;
}


</style>
