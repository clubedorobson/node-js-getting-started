const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const cool = require('cool-ascii-faces');
const axios = require('axios');
const { JSDOM } = require("jsdom");
const { window } = new JSDOM("");
const $ = require("jquery")(window);
const logger = require("./common/logger")
const { Pool, ClientBase } = require('pg');
const { Clubes, Membros, Partidas, ClubesPartidas, MembrosPartidas } = require('./app/models')
const getColors = require('get-image-colors')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});


express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/cool', (req, res) => res.send(cool()))
  .get('/', (req, res) => res.render('pages/index'))
  .get('/proclubs', async (req, res) => {
    //SALVAR DADOS DO CLUBE
    updateClub(6703918);
  })

  .get('/members', async (req, res) => {
    //SALVAR DADOS DOS JOGADORES
    updateMembers();
  })

  .get('/matches', async (req, res) => {
    //SALVAR DADOS DAS PARTIDAS
    updateMatches();
  })

  .get('/season', async (req, res) => {
    //SALVAR DADOS DAS PARTIDAS
    updateSeason();
  })

  .get('/assets', async (req, res) => {
    //SALVAR DADOS DE ASSETS
    updateAssets();
  })

  .listen(PORT, () => console.log(`Listening on ${PORT}`))

function updateClub(clubId) {
  //ID DO CLUBE DO ROBSON
  //CONFIGURAÇÕES DA REQUISIÇÃO PARA A API DO PROCLUBS
  let config = {
    headers: {
      "Host": "proclubs.ea.com",
      "Accept": "application/json",
      "Accept-Language": "en-US,en;q=0.5",
      "Accept-Encoding": "gzip, deflate, br",
      "content-type": "application/json",
      "Origin": "https://www.ea.com",
      "Connection": "keep-alive",
      "Referer": `https://www.ea.com/pt-br/games/fifa/fifa-21/pro-clubs/ps4-xb1-pc/overview?clubId=${clubId}&platform=ps4`
    },
    params: {
      clubIds: clubId
    }
  }
  //REQUISIÇÃO PARA A API DO PRO CLUBS
  axios.get('https://proclubs.ea.com/api/fifa/clubs/info?platform=ps4', config)
    .then(async response => {
      const clubData = response.data[clubId]

      let teamColors = await getTeamColors(clubData)
      logger.info("TTEEEAM", teamColors)

      Clubes.upsert({
        clubId: clubData.clubId,
        name: clubData.name,
        regionId: clubData.regionId,
        teamId: clubData.teamId,
        stadname: clubData.customKit.stadName,
        iscustomteam: clubData.customKit.isCustomTeam,
        standardcrestid: clubData.teamId,
        customcrestid: clubData.customKit.crestAssetId,
        kitcolor1: teamColors.kitcolor1,
        kitcolor2: teamColors.kitcolor2,
        kitcolor3: teamColors.kitcolor3,
        kitacolor1: clubData.customKit.kitAColor1,
        kitacolor2: clubData.customKit.kitAColor2,
        kitacolor3: clubData.customKit.kitAColor3,
        logging: false
      })
    })
    .catch(error => {
      console.log(error);
    });
}

function updateMembers(clubId) {
  //let clubId = 6703918
  let config = {
    headers: {
      "Host": "proclubs.ea.com",
      "Accept": "application/json",
      "Accept-Language": "en-US,en;q=0.5",
      "Accept-Encoding": "gzip, deflate, br",
      "content-type": "application/json",
      "Origin": "https://www.ea.com",
      "Connection": "keep-alive",
      "Referer": `https://www.ea.com/pt-br/games/fifa/fifa-21/pro-clubs/ps4-xb1-pc/members?clubId=${clubId}&platform=ps4`
    },
    params: {
      clubId: clubId
    }
  }

  axios.get('https://proclubs.ea.com/api/fifa/members/stats?platform=ps4', config)
    .then(async response => {
      const membersData = response.data.members
      membersData.forEach(md => {
        Membros.upsert(md)
      })
    })
    .catch(error => {
      console.log(error);
    });
}

function updateMatches() {
  let clubId = 6703918
  let config = {
    headers: {
      "Host": "proclubs.ea.com",
      "Accept": "application/json",
      "Accept-Language": "en-US,en;q=0.5",
      "Accept-Encoding": "gzip, deflate, br",
      "content-type": "application/json",
      "Origin": "https://www.ea.com",
      "Connection": "keep-alive",
      "Referer": `https://www.ea.com/pt-br/games/fifa/fifa-21/pro-clubs/ps4-xb1-pc/match-history?${clubId = 6703918}&platform=ps4`
    },
    params: {
      clubIds: clubId
    }
  }

  axios.get('https://proclubs.ea.com/api/fifa/clubs/matches?matchType=gameType9&platform=ps4', config)
    .then(async response => {

      const matchData = response.data
      //console.log(matchData)
      let saveMatch = {}
      let homePlayers = []
      let awayPlayers = []
      matchData.forEach(async md => {
        //INSERT MATCH DATA
        saveMatch.matchId = md.matchId,
          saveMatch.timestamp = md.timestamp,
          saveMatch.homeClubId = Object.keys(md.clubs)[1],
          saveMatch.awayClubId = Object.keys(md.clubs)[0]
        //console.log(md.clubs[saveMatch.homeClubId])

        Partidas.upsert({
          matchId: saveMatch.matchId,
          timestamp: saveMatch.timestamp,
          homeClub: saveMatch.homeClubId,
          awayClub: saveMatch.awayClubId,
          homeGoals: md.clubs[saveMatch.homeClubId].goals,
          awayGoals: md.clubs[saveMatch.awayClubId].goals,
          logging: false
        })

        saveMatch.homeClub = md.clubs[saveMatch.homeClubId]
        saveMatch.awayClub = md.clubs[saveMatch.awayClubId]
        //UPDATE CLUBS INFO
        updateClub(saveMatch.homeClubId)
        updateClub(saveMatch.awayClubId)
        //UPDATE CLUBS IN THAT MATCH INFO
        //UPDATE HOME CLUB
        let aggregateAway = md.aggregate[saveMatch.awayClubId]
        let aggregateHome = md.aggregate[saveMatch.homeClubId]
        ClubesPartidas.upsert({
          clubMatchId: md.matchId + saveMatch.awayClubId,
          clubId: saveMatch.awayClubId,
          matchId: md.matchId,
          seasonid: md.clubs[saveMatch.awayClubId].season_id,
          passattempts: aggregateAway.passattempts,
          passesmade: aggregateAway.passesmade,
          rating: aggregateAway.rating,
          shots: aggregateAway.shots,
          goals: aggregateAway.goals,
          goalsConceded: aggregateAway.goalsconceded,
          assists: aggregateAway.assists,
          tackleattempts: aggregateAway.tackleattempts,
          tacklesmade: aggregateAway.tacklesmade,
          logging:true
        })

        ClubesPartidas.upsert({
          clubMatchId: md.matchId + saveMatch.homeClubId,
          clubId: saveMatch.homeClubId,
          matchId: md.matchId,
          seasonid: md.clubs[saveMatch.homeClubId].season_id,
          passattempts: aggregateHome.passattempts,
          passesmade: aggregateHome.passesmade,
          rating: aggregateHome.rating,
          shots: aggregateHome.shots,
          goals: aggregateHome.goals,
          goalsConceded: aggregateHome.goalsconceded,
          assists: aggregateHome.assists,
          tackleattempts: aggregateHome.tackleattempts,
          tacklesmade: aggregateHome.tacklesmade,
          logging:true
        })

        //INSERT PLAYERS IN THAT MATCH DATA
        updateMembers(saveMatch.homeClubId)
        updateMembers(saveMatch.awayClubId)
        homePlayers = md.players[saveMatch.homeClubId]
        Object.entries(homePlayers).forEach(async player => {

          let playerEntry = player[1]
          MembrosPartidas.upsert({
            memberMatchId: playerEntry.playername + saveMatch.matchId,
            name: playerEntry.playername,
            matchId: saveMatch.matchId,
            passattempts: playerEntry.passattempts,
            passesmade: playerEntry.passesmade,
            rating: playerEntry.rating,
            shots: playerEntry.shots,
            goals: playerEntry.goals,
            mom: playerEntry.mom,
            assists: playerEntry.assists,
            tackleattempts: playerEntry.tackleattempts,
            tacklesmade: playerEntry.tacklesmade,
            pos: playerEntry.pos,
            vproattr: playerEntry.vproattr,
            logging: false
          })
        })

        //INSERT PLAYERS IN THAT MATCH DATA
        awayPlayers = md.players[saveMatch.awayClubId]
        //console.log(homePlayers)
        Object.entries(awayPlayers).forEach(async player => {
          let playerEntry = player[1]
          MembrosPartidas.upsert({
            memberMatchId: playerEntry.playername + saveMatch.matchId,
            name: playerEntry.playername,
            matchId: saveMatch.matchId,
            passattempts: playerEntry.passattempts,
            passesmade: playerEntry.passesmade,
            rating: playerEntry.rating,
            shots: playerEntry.shots,
            goals: playerEntry.goals,
            mom: playerEntry.mom,
            assists: playerEntry.assists,
            tackleattempts: playerEntry.tackleattempts,
            tacklesmade: playerEntry.tacklesmade,
            pos: playerEntry.pos,
            vproattr: playerEntry.vproattr,
            logging: false
          })
        })
        //console.log(homePlayers)
      })
    })
    .catch(error => {
      console.log(error);
    });
}

function updateAssets() {
  let clubId = 6703918
  let config = {
    headers: {
      "Host": "fifa21.content.easports.com",
      //"Accept": "application/json",
      "Accept-Language": "en-US,en;q=0.5",
      "Accept-Encoding": "gzip, deflate, br",
      //"content-type": "application/json",
      "Origin": "https://www.ea.com",
      "Connection": "keep-alive",
      "Referer": `https://fifa21.content.easports.com/fifa/fltOnlineAssets/05772199-716f-417d-9fe0-988fa9899c4d/2021/fifaweb/`
    },
    /*params: {
      clubIds: clubId
    }*/
  }

  axios.get('https://fifa21.content.easports.com/fifa/fltOnlineAssets/05772199-716f-417d-9fe0-988fa9899c4d/2021/fifaweb/', config)
    .then(async response => {
    })
    .catch(error => {
      console.log(error);
    });

}

async function getTeamColors(clubData) {
  const teamId = clubData.teamId
  const colorOptions = {
    count: 3
  }
  let kitColors = {}
  //console.log(clubData.customKit.isCustomTeam)
  if (clubData.customKit.isCustomTeam == "0") {
    logger.info("NOOOOO CUSTOOOOOOMMMMM")
    let teamColors = []
    let teamColorHex = []
    teamColors = await getColors(`https://www.ea.com/fifa/ultimate-team/web-app/content/21D4F1AC-91A3-458D-A64E-895AA6D871D1/2021/fut/items/images/mobile/kits/home/j0_${teamId}_0.png`, colorOptions)

    teamColors.forEach((teamColor, i) => {
      teamColorHex[i] = rgbToHex(teamColor._rgb[0], teamColor._rgb[1], teamColor._rgb[2])
    })
    //console.log("COLORHEXXXX::::", teamColorHex)
    kitColors.kitcolor1 = teamColorHex[0]
    kitColors.kitcolor2 = teamColorHex[1]
    kitColors.kitcolor3 = teamColorHex[2]
  }

  else {
    console.log("CUSTOOOOOOMMMMM")
    //console.log(clubData.customKit)
    let color1 = parseInt(clubData.customKit.kitColor1).toString(16);
    //console.log("COLOR1", color1)
    color1 = color1.padStart(6, '0')

    let color2 = parseInt(clubData.customKit.kitColor2).toString(16);
    color2 = color2.padStart(6, '0')

    let color3 = parseInt(clubData.customKit.kitColor3).toString(16);
    color3 = color3.padStart(6, '0')

    //console.log("COLORSSSSSSS", color1,color2,color3)
    //let hexString = valueD.toString(16);
    //hexString = hexString.padStart(6, '0')
    //console.log(hexString)
    kitColors.kitcolor1 = color1
    kitColors.kitcolor2 = color2
    kitColors.kitcolor3 = color3
  }
  //console.log("RETURN",kitColors)
  return kitColors
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function updateSeason () {
  
}