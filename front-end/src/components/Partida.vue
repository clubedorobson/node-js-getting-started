<template>
  <div>

    <b-table  v-if="tabelaPartida.length > 0" :items="tabelaPartida" :fields="fieldsTimes">
      <template #cell(homeCrest)="data">
        <b-img
          fluid
          left
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
      <template #cell(awayCrest)="data">
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
      <template #cell(homeGoals)="data">
        {{data.value}} <span>x</span> {{data.item.awayGoals}}
      </template>
    </b-table>


    <b-card>
    <b-table
      align="center"
      :items="arrayPartida"
      :fields="fields"
    ></b-table>
    </b-card>
    <b-card>
      <div>
        <b-tabs fill>
          <b-tab v-if="tabelaPartida.length > 0" v-bind:title="tabelaPartida[0].partidasHomeClub.name" active>
            <v-data-table elevation-1 align="center" class="btable" bordered outlined small text-center striped hover :items="membrosHome" :headers="fieldsMembros">
            </v-data-table>
            <b-btn v-if="clubeDoRobson == 'HOME'" variant="purple" class="button-right" id="show-btn" @click="showModal">Escalação</b-btn>
          </b-tab>
          <b-tab v-if="tabelaPartida.length > 0" v-bind:title="tabelaPartida[0].partidasAwayClub.name">
            <v-data-table align="center" class="btable" bordered outlined small text-center striped hover :items="membrosAway" :headers="fieldsMembros">
            </v-data-table>
            <b-btn v-if="clubeDoRobson == 'AWAY'" variant="purple" class="button-right" id="show-btn" @click="showModal">Escalação</b-btn>
          </b-tab>
        </b-tabs>
      </div>
    </b-card>

    <b-modal centered id="modal-tall" size="xl" ref="my-modal" ok-only>
        <b-img
          v-if="squadImage"
          fluid
          center
          :src="require(`@/assets/squads/${squadImage}`)"/>
    </b-modal>

  </div>
</template>

<script>

import partidasService from "../services/partidasService";
import robsonService from "../services/robsonService"

export default {
  name: "partida",
  data() {
    return {
      modalShow: null,
      fixed: true,
      membrosHome: [],
      membrosAway: [],
      membrosRobson: [],
      membrosRobsonCompleto: [],
      clubeDoRobson: null,
      tabelaPartida: [],
      fields: [
        {
          key: "casa",
          label: "",
          sortable: false,
          align: "center"
        },
        {
          key: "label",
          label: "",
          text: "",
          sortable: false,
          align: "center"
        },
        {
          key: "fora",
          label: "",
          sortable: false,
          align: "center"
        },
      ],
      fieldsTimes: [
        {
          key: "homeCrest",
          label: "",
          sortable: false,
          align: "center"
        },
        {
          key: "partidasHomeClub.name",
          label: "Casa",
          sortable: false,
          align: "center"
        },
        {
          key: "homeGoals",
          label: "",
          sortable: false,
          align: "center"
        },
        /*{
          value: "awayGoals",
          text: "",
          sortable: false,
          align: "center"
        },*/
        {
          key: "partidasAwayClub.name",
          label: "Fora",
          sortable: false,
          align: "center"
        },
        {
          key: "awayCrest",
          label: "",
          sortable: false,
          align: "center"
        },
      ],
      fieldsPartida: [
        {
          value: "partidasClubesPartidas[1].passattempts",
          text: "",
          sortable: false,
          align: "center"
          
        },
        {
          value: "passes",
          text: "",
          sortable: false,
          align: "center"
        },
        {
          value: "partidasClubesPartidas[0].passattempts",
          text: "",
          sortable: false,
          align: "center"
        },
      ],
      fieldsPosse: [
        {
          value: "partidasClubesPartidas[1].precisaoHome",
          text: "",
          sortable: false,
          align: "center"
        },
        {
          value: "posse",
          text: "",
          sortable: false,
          align: "center"
        },
        {
          value: "partidasClubesPartidas[0].precisaoAway",
          text: "",
          sortable: false,
          align: "center"
        },
      ],
      fieldsMembros: [
        {
          value: "membrosPartidasMembros.proName",
          text: "Nome",
          sortable: false,
          align: "center" 
        },
        {
          value: "passattempts",
          text: "Tentativas de passe",
          sortable: false,
          align: "center"
        },
        {
          value: "passesmade",
          text: "Passes feitos",
          sortable:false,
          align: "center"
        },
        {
          value: "shots",
          text: "Chutes",
          sortable:false,
          align: "center"
        },
        {
          value: "goals",
          text: "Gols",
          sortable:false,
          align: "center"
        },
        {
          value: "assists",
          text: "Assistências",
          sortable: false,
          align: "center"
        },
        {
          value: "mom",
          text: "",
          sortable: false,
          align: "center"
        },
        {
          value: "rating",
          text: "Nota",
          sortable: false,
          align: "center"
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
      membroResgatado: null,
      currentIndex: -1,
    };
  },
  methods: {
    showModal() {
      this.$refs['my-modal'].show()
    },
    async getPartida() {
      let partidaId = this.$route.params.partidaId;
      const response = await partidasService.getOne(partidaId)
      this.partida = response.data[0]
      this.partida["passes"] = "Passes";
      this.partida["posse"] = "Posse de bola";
      this.partida["chutes"] = "Chutes";
      this.partida["precisao"] = "Precisão no passe";
      this.partida["divididas"] = "Divididas";
      
      let homeClub = this.partida["homeClub"]
      let awayClub = this.partida["awayClub"]
      let homeClubStats = []
      let awayClubStats = []

      this.partida.partidasClubesPartidas.forEach(stats => {
        if (stats.clubId == homeClub) {
          homeClubStats = stats
        }
        else if (stats.clubId == awayClub) {
          awayClubStats = stats
        }
      })

      if (homeClubStats.clubId == 6703918) {
        this.clubeDoRobson = "HOME"
      }
      else {
        this.clubeDoRobson = "AWAY"
      }

      if(this.partida.partidasAwayClub.iscustomteam == 1) {
        this.partida["awayCrest"] = this.partida.partidasAwayClub.customcrestid
      }
      else if (this.partida.partidasAwayClub.iscustomteam == 0) {
        this.partida["awayCrest"] = this.partida.partidasAwayClub.teamId
      }
      if(this.partida.partidasHomeClub.iscustomteam == 1) {
        this.partida["homeCrest"] = this.partida.partidasHomeClub.customcrestid
      }
      else if (this.partida.partidasHomeClub.iscustomteam == 0) {
        this.partida["homeCrest"] = this.partida.partidasHomeClub.teamId
      }

      let tentativasPasseAway = awayClubStats.passattempts;
      let passesAway = awayClubStats.passesmade;
      let precisaoAway = passesAway / tentativasPasseAway;

      this.partida.partidasClubesPartidas["tentativasPasseAway"] = tentativasPasseAway
      this.partida.partidasClubesPartidas["passesAway"] = passesAway
      this.partida.partidasClubesPartidas["precisaoPasseAway"] = parseFloat(precisaoAway * 100).toFixed(2) + " %";

      let tentativasPasseHome = homeClubStats.passattempts;
      let passesHome = homeClubStats.passesmade;
      let precisaoHome = passesHome / tentativasPasseHome;

      this.partida.partidasClubesPartidas["tentativasPasseHome"] = tentativasPasseHome
      this.partida.partidasClubesPartidas["passesHome"] = passesHome
      this.partida.partidasClubesPartidas["precisaoPasseHome"] = parseFloat(precisaoHome * 100).toFixed(2) + " %";

      let posseDeBolaAway = passesAway / (passesAway + passesHome);
      posseDeBolaAway = parseFloat(posseDeBolaAway * 100).toFixed(2);

      let posseDeBolaHome = 100 - posseDeBolaAway;
      posseDeBolaHome = parseFloat(posseDeBolaHome).toFixed(2);

      this.partida.partidasClubesPartidas["posseAway"] = posseDeBolaAway + " %";
      this.partida.partidasClubesPartidas["posseHome"] = posseDeBolaHome + " %";

      this.arrayPartida = [
        {
          casa: homeClubStats.passesmade,
          label: "Passes",
          fora: awayClubStats.passesmade,
        },
        {
          casa:  this.partida.partidasClubesPartidas["precisaoPasseHome"],
          label: "Precisão no passe",
          fora:  this.partida.partidasClubesPartidas["precisaoPasseAway"]
        },
        {
          casa:  this.partida.partidasClubesPartidas["posseHome"],
          label: "Posse de bola",
          fora:  this.partida.partidasClubesPartidas["posseAway"]
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

      console.log("MEMBROSPARTIDAS", this.partida.partidasMembrosPartidas)
      this.partida.partidasMembrosPartidas.forEach(membro => {
        if (membro.clubid == homeClubStats.clubId) {
          this.membrosHome.push(membro)
          if (membro.clubid == 6703918) {
            this.membrosRobson.push(membro)
            }
          }
          else {
            this.membrosAway.push(membro)
            if (membro.clubid == 6703918) {
              this.membrosRobson.push(membro)
            }
          }
      })

      this.squadImage = this.getSquadImage()
      console.log(this.squadImage)
      let resposta = await robsonService.getAll()
      this.robsoners = resposta.data

      let membroResgatado = null
      this.membrosRobson.forEach((membro, i) => {
        console.log("MEMBRO, ROBSONER",membro, this.robsoners)
        membroResgatado = this.robsoners.find(
          (robsoner) => robsoner.name == membro.name
        );
        console.log(membro)
        //console.log(this.membroResgatado)
        if (membroResgatado){
          this.membrosRobson[i]["face"] = membroResgatado.face
        }
        console.log(this.membrosRobson);
      });
          
      console.log(this.partida);
      this.tabelaPartida = [this.partida];
      console.log(this.tabelaPartida[0])
    },

    getSquadImage () {
      let squadImage = ''
      if(this.membrosRobson.length == 2){
        if(this.membrosRobson.find(element => element.name == "Pedro_H77") && this.membrosRobson.find(element => element.name == "bastospereira"))
          squadImage = "banjo-canuto.png"
        if(this.membrosRobson.find(element => element.name == "bastospereira") && this.membrosRobson.find(element => element.name == "El_Wandershow"))
          squadImage = "canuto-sins.png"
      }

      if(this.membrosRobson.length == 3){
        console.log("TRESSSS")
        if(this.membrosRobson.find(element => element.name == "Pedro_H77") && this.membrosRobson.find(element => element.name == "bastospereira") && this.membrosRobson.find(element => element.name == "ThePedroso"))
          squadImage = "banjo-canuto-toto.png"
        if(this.membrosRobson.find(element => element.name == "Pedro_H77") && this.membrosRobson.find(element => element.name == "bastospereira") && this.membrosRobson.find(element => element.name == "El_Wandershow"))
          squadImage = "banjo-canuto-sins.png"
        if(this.membrosRobson.find(element => element.name == "bastospereira") && this.membrosRobson.find(element => element.name == "ThePedroso") && this.membrosRobson.find(element => element.name == "El_Wandershow"))
          console.log("AQUIIIIIII")
          squadImage = "canuto-toto-sins.png"
      }
      return squadImage
    },
  },
  async created() {
    this.message = "";
    console.log(this.$route.params);
    await this.getPartida();
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

.v-data-table {
  table-layout: fixed !important;
  
}

tr.v-data-table__mobile-row {
  width: 100vw !important;
}

td.v-data-table__mobile-row {
  width: 20% !important;
}



div.card-body {
  text-align: center;
}

.modal-body {
  margin: 0 auto
}

</style>
