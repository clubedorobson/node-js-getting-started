<template>
  <div>    
    <b-table  v-if="items.length > 0" :items="items" :fields="fields">
      <template #cell(homeCrest)="data">
        <b-img
          fluid
          center
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
      <template #cell(partidasHomeClub.name) = "data">
        <span class="spanCenter">{{data.item.partidasHomeClub.name}}</span> <br> <span class="spanCenter">{{data.item.homeGoals}} x {{data.item.awayGoals}}</span> <br> <span class="spanCenter">{{data.item.partidasAwayClub.name}}</span>
      </template>
      <template #cell(awayCrest)="data">
        <b-img
          fluid
          center
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
  </div>
</template>

<script>

export default {
    props: {
        items: Array,
        //fields: Array 
    },
    data () {
        return {
            fields: [
                {
                    key: "homeCrest",
                    label: "Casa",
                    sortable: false,
                    align: "center"
                },
                {
                    key: "partidasHomeClub.name",
                    label: "",
                    sortable: false,
                    align: "center"
                },
                    /*{
                    key: "homeGoals",
                    label: "",
                    sortable: false,
                    align: "center"
                    },*/
                    /*{
                    value: "awayGoals",
                    text: "",
                    sortable: false,
                    align: "center"
                    },*/
                    /*{
                    key: "partidasAwayClub.name",
                    label: "Fora",
                    sortable: false,
                    align: "center"
                    },*/
                {
                    key: "awayCrest",
                    label: "Fora ",
                    sortable: false,
                    align: "center"
                },
            ],
        }
    },
    mounted() {
        console.log(this.fields)
    }
}





</script>