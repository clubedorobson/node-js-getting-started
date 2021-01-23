<template>
  <div>
    <v-data-table v-if="listMembros" :items="listMembros" :headers="headers">
      <template v-slot:item.face="{ item }">
        <b-img center rounded="circle" height="100%" width="100%" :src="item.face" alt="..." />
      </template>

      <template v-slot:item.name="{ item }">
        <b-btn
          :title="Detalhes"
          variant="purple"
          :to="{
            name: 'membro',
            params: { id: item.name },
          }"
          >Detalhes</b-btn
        >
      </template>
    </v-data-table>
  </div>
</template>

<script>
import membrosService from "../services/membrosService";
import robsonService from "../services/robsonService";

export default {
  name: "membros-list",
  data() {
    return {
      membros: [],
      robsoners: [],
      listMembros: [],
      fakeRobsoners: [],
      currentMembro: null,
      currentIndex: -1,
      title: "",
      headers: [
        {
          value: "face",
          text: "",
          sortable: false,
        },
        {
          value: "number",
          text: "",
          sortable: false,
        },
        {
          value: "proName",
          text: "",
          sortable: false,
        },
        {
          value: "name",
          text: "",
          sortable: false,
        },
      ],
    };
  },
  methods: {
    async getMembros(clubId) {
      membrosService
        .getAll(clubId)
        .then((response) => {
          this.membros = response.data;
          console.log(response.data);
          robsonService.getAll().then((response) => {
            this.robsoners = response.data;
            console.log(response.data);

            this.membros.forEach((membro, i) => {
              let face = this.robsoners.find(
                (robsoner) => robsoner.name == membro.name
              );
              if (face == undefined) {
                this.membros[i]["face"] = "https://banner2.cleanpng.com/20180603/jx/kisspng-user-interface-design-computer-icons-default-stephen-salazar-photography-5b1462e1b19d70.1261504615280626897275.jpg";
              } else {
                this.membros[i]["number"] = face.number;
                this.membros[i]["face"] = face.face;
              }
            });

            console.log(this.membros);

            this.listMembros = this.membros;

            console.log(this.robsoners)

            this.robsoners.forEach(robsoner => {
              if(robsoner.isfake) {
                this.listMembros.push(robsoner)  
              }
            })

            console.log(this.listMembros);
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },

    async getRobsoners() {
      robsonService.getAll().then((response) => {
        this.robsoners = response.data;
        console.log(response.data);
        this.robsoners.forEach((robsoner) => {
          this.membros.forEach((membro, i) => {
            if (membro.name == robsoner.name) {
              this.membros[i]["face"] = robsoner.face;
            } else {
              this.membros[i]["face"] = "https://funkyimg.com/i/3aepK.png";
            }
          });
        });
        console.log(this.membros);
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
  async mounted() {
    await this.getMembros(this.$route.params.clubId);
  },
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}

td {
  text-align: center !important
}
</style>
