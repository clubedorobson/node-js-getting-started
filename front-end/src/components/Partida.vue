<template>
  <div>
    <!--<v-select 
      class="select"
      placeholder = "Escolha a temporada"
      v-model= "selectedSeason" 
      :items="opcoes"
      item-text="label"
      item-value="value"
      v-on:input="getPartidas"
      ></v-select>-->
    <b-card fluid>
    <b-table class="btable" responsive bordered hover :items="partida" :fields="fieldsTimes">
      <template #cell(partidasHomeClub.customcrestid)="data">
        <b-img
          fluid
          height="100%"
          width="100%"
          v-bind:src="
            'https://fifa21.content.easports.com/fifa/fltOnlineAssets/05772199-716f-417d-9fe0-988fa9899c4d/2021/fifaweb/crests/256x256/l' +
            data.value +
            '.png'
          "
          alt="..."
        />
      </template>
      <template #cell(partidasAwayClub.customcrestid)="data">
        <b-img
          fluid
          height="80%"
          width="80%"
          v-bind:src="
            'https://fifa21.content.easports.com/fifa/fltOnlineAssets/05772199-716f-417d-9fe0-988fa9899c4d/2021/fifaweb/crests/256x256/l' +
            data.value +
            '.png'
          "
          alt="..."
        />
      </template>
    </b-table>
    </b-card>
    <b-card>
    <b-table
      class="btable"
      bordered
      outlined
      small
      responsive
      text-center
      striped
      hover
      :items="arrayPartida"
      :fields="fields"
    ></b-table>
    </b-card>
    <b-card>
      <div>
        <b-tabs fill>
          <b-tab v-bind:title="partida[0].partidasHomeClub.name" active>
            <b-table class="btable" bordered outlined small text-center striped hover :items="membrosHome" :fields="fieldsMembros">
            </b-table>
            <b-card v-if="clubeDoRobson == 'HOME'" v-bind:img-src="squadImage" >
            </b-card>
          </b-tab>
          <b-tab v-bind:title="partida[0].partidasAwayClub.name">
            <b-table class="btable" bordered outlined small text-center striped hover :items="membrosAway" :fields="fieldsMembros">
            </b-table>
            <b-card v-if="clubeDoRobson == 'AWAY'" v-bind:img-src="squadImage" >
            </b-card>
          </b-tab>
        </b-tabs>
      </div>
    </b-card>
  </div>
</template>

<script>
//import clubesService from "../services/clubesService";
import partidasService from "../services/partidasService";
//import partidasService from "../services/partidasService"

export default {
  name: "partida",
  data() {
    return {
      fixed: true,
      membrosHome: [],
      membrosAway: [],
      membrosRobson: [],
      clubeDoRobson: null,
      /*selectedSeason: {
        label: 'Escolha a temporada',
        value: null
      },*/
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
          key: "casa",
          label: "",
          sortable: false,
        },
        {
          key: "label",
          label: "",
          sortable: false,
        },
        {
          key: "fora",
          label: "",
          sortable: false,
        },
      ],
      fieldsTimes: [
        {
          key: "partidasHomeClub.customcrestid",
          label: "",
          sortable: false,
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
          sortable: false,
        },
      ],
      fieldsPartida: [
        {
          key: "partidasClubesPartidas[1].passattempts",
          label: "",
          sortable: false,
        },
        {
          key: "passes",
          label: "",
          sortable: false,
        },
        {
          key: "partidasClubesPartidas[0].passattempts",
          label: "",
          sortable: false,
        },
      ],
      fieldsPosse: [
        {
          key: "partidasClubesPartidas[1].precisaoHome",
          label: "",
          sortable: false,
        },
        {
          key: "posse",
          label: "",
          sortable: false,
        },
        {
          key: "partidasClubesPartidas[0].precisaoAway",
          label: "",
          sortable: false,
        },
      ],
      fieldsMembros: [
        {
          key: "membrosPartidasMembros.proName",
          label: "Nome",
          sortable: false 
        },
        {
          key: "passattempts",
          label: "Tentativas de passe",
          sortable: false
        },
        {
          key: "passesmade",
          label: "Passes feitos",
          sortable:false
        },
        {
          key: "shots",
          label: "Chutes",
          sortable:false
        },
        {
          key: "goals",
          label: "Gols",
          sortable:false
        },
        {
          key: "assists",
          label: "Assistências",
          sortable: false
        },
        {
          key: "mom",
          label: "",
          sortable: false
        },
        {
          key: "rating",
          label: "Nota",
          sortable: false
        }
      ],
      opcoes: [],
      model: {
        opcoes: [],
        selected: null,
      },
      currentPartida: null,
      message: "",
      seasons: [],
      partida: [],
      arrayPartida: [],
      currentIndex: -1,
    };
  },
  methods: {
    getPartida() {
      let partidaId = this.$route.params.partidaId;
      console.log(partidaId);
      //console.log(seasonId)
      partidasService
        .getOne(partidaId)
        .then((response) => {
          console.log(response.data);
          this.partida = response.data;
          this.partida[0]["passes"] = "Passes";
          this.partida[0]["posse"] = "Posse de bola";
          this.partida[0]["chutes"] = "Chutes";
          this.partida[0]["precisao"] = "Precisão no passe";
          this.partida[0]["divididas"] = "Divididas";
          console.log(this.partida[0])
          let homeClub = this.partida[0]["homeClub"]
          let awayClub = this.partida[0]["awayClub"]
          let homeClubStats = []
          let awayClubStats = []
          console.log(homeClub)
          console.log(this.partida[0].partidasClubesPartidas[0]["clubId"])

          this.partida[0].partidasClubesPartidas.forEach(stats => {
            if (stats.clubId == homeClub) {
              homeClubStats = stats
            }
            else if (stats.clubId == awayClub) {
              awayClubStats = stats
            }
          })

          console.log(homeClubStats)
          console.log(awayClubStats)

          if (homeClubStats.clubId == 6703918) {
            this.clubeDoRobson = "HOME"
          }
          else {
            this.clubeDoRobson = "AWAY"
          }

          console.log(this.clubeDoRobson)

          let tentativasPasseAway = awayClubStats.passattempts;
          let passesAway = awayClubStats.passesmade;
          let precisaoAway = passesAway / tentativasPasseAway;

          this.partida[0].partidasClubesPartidas["tentativasPasseAway"] = tentativasPasseAway
          this.partida[0].partidasClubesPartidas["passesAway"] = passesAway
          this.partida[0].partidasClubesPartidas["precisaoPasseAway"] = parseFloat(precisaoAway * 100).toFixed(2) + " %";

          let tentativasPasseHome = homeClubStats.passattempts;
          let passesHome = homeClubStats.passesmade;
          let precisaoHome = passesHome / tentativasPasseHome;

          this.partida[0].partidasClubesPartidas["tentativasPasseHome"] = tentativasPasseHome
          this.partida[0].partidasClubesPartidas["passesHome"] = passesHome
          this.partida[0].partidasClubesPartidas["precisaoPasseHome"] = parseFloat(precisaoHome * 100).toFixed(2) + " %";

          let posseDeBolaAway = passesAway / (passesAway + passesHome);
          posseDeBolaAway = parseFloat(posseDeBolaAway * 100).toFixed(2);

          let posseDeBolaHome = 100 - posseDeBolaAway;
          posseDeBolaHome = parseFloat(posseDeBolaHome).toFixed(2);

          this.partida[0].partidasClubesPartidas["posseAway"] = posseDeBolaAway + " %";
          this.partida[0].partidasClubesPartidas["posseHome"] = posseDeBolaHome + " %";

          this.arrayPartida = [
            {
              casa: homeClubStats.passesmade,
              label: "Passes",
              fora: awayClubStats.passesmade,
            },
            {
              casa:  this.partida[0].partidasClubesPartidas["precisaoPasseHome"],
              label: "Precisão no passe",
              fora:  this.partida[0].partidasClubesPartidas["precisaoPasseAway"]
            },
            {
              casa:  this.partida[0].partidasClubesPartidas["posseHome"],
              label: "Posse de bola",
              fora:  this.partida[0].partidasClubesPartidas["posseAway"]
            },
            {
              casa:  homeClubStats.shots,
              label: "Chutes",
              fora: awayClubStats.shots
            },
            {
              casa:  homeClubStats.tacklesmade,
              label: "Divididas",
              fora:  awayClubStats.tacklesmade
            }
          ];

          this.partida[0].partidasMembrosPartidas.forEach(membro => {
            if (membro.clubid == homeClubStats.clubId) {
              this.membrosHome.push(membro)
              if (membro.clubid == 6703918) {
                this.membrosRobson.push(membro.name)
              }
              
             }
             else {
              this.membrosAway.push(membro)
              if (membro.clubid == 6703918) {
                this.membrosRobson.push(membro.name)
              }
             }
          })

          

          this.squadImage = this.getSquadImage()

          console.log(this.membrosRobson)

          

        })
        .catch((e) => {
          console.log(e);
        });

      console.log(this.partida);
    },

    /*getSeasons(clubId) {
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
    },*/

    getSquadImage () {
      let squadImage = ''
      if(this.membrosRobson.length == 2){
        if(this.membrosRobson.find(element => element == "Pedro_H77") && this.membrosRobson.find(element => element == "bastospereira"))
          squadImage = "https://funkyimg.com/i/3ad55.png"
      }
      return squadImage
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
    this.getPartida();
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
  table-layout: fixed;
  
}

.td {
  width: 25%;
}
</style>
