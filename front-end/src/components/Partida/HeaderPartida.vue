<template>
  <div>
    <b-card>
      <span class="center">{{new Date(timestamp*1000).toLocaleDateString("pt-BR") }}</span>
      <br>
      <span class="center">{{new Date(timestamp*1000).toLocaleTimeString("pt-BR") }}</span>
      <br>
        <b-img
          fluid
          height="350%"
          width="350%"
          center
          v-bind:src="
            'https://www.ea.com/fifa/ultimate-team/web-app/content/21D4F1AC-91A3-458D-A64E-895AA6D871D1/2021/fut/items/images/mobile/vanity/stadium/' +
            stadiumInfo.stadium_id +
            '.png'
          "
          alt="..."
        />
        {{stadName}}
        {{Math.round(stadiumInfo.capacity * (Math.random() * (1-0.8) + 0.8))}}
    </b-card>
    <b-table  v-if="items.length > 0" :items="items" :fields="fields">
      <template #cell(homeCrest)="data">
        <b-img
          fluid
          center
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
import stadiumService from '../../services/stadiumService'

export default {
    props: {
        items: Array,
        stadName: String,
        timestamp: Number
        //fields: Array 
    },
    data () {
        return {
            stadiumInfo: null,
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
                {
                    key: "awayCrest",
                    label: "Fora ",
                    sortable: false,
                    align: "center"
                },
            ],
        }
    },
    methods: {
      async getRandomStadium () {
        return stadiumService.getAll()
      },

      async getStadium () {
        return stadiumService.get(this.stadName)

      } 
    },
    async mounted() {
        console.log(this.fields)
        console.log(this.stadName)
        console.log(this.timestamp)

        //this.gameDay  = new Date(timestamp*1000).toLocaleTimeString("pt-BR")
        //this.gameHour = new Date(timestamp*1000).toLocaleDateString("pt-BR")
        
        this.stadiumInfo =  await this.getStadium(this.stadName)
        this.stadiumInfo = this.stadiumInfo.data[0]
        console.log(this.stadiumInfo)

        if (this.stadName == "Arena Robson Oliveira") {
          this.stadName = "Emirates Stadium"
          this.stadiumInfo = await this.getStadium(this.stadName)
          console.log(this.stadiumInfo)
          this.stadiumInfo = this.stadiumInfo.data[0]
          this.stadName = "Arena Robson Oliveira"
        }

        if (this.stadiumInfo == undefined) {
          const response = await this.getRandomStadium()
          const index = Math.round(Math.random() * 95)
          console.log(index)
          console.log(response)
          this.stadiumInfo = response.data[index]
          console.log(this.stadiumInfo)
        }
        
    },

}

</script>

<style>

.center {
  text-align: center;
}

</style>
