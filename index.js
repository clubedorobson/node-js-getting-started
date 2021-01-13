const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const cool = require('cool-ascii-faces');
const axios = require('axios');
const { JSDOM } = require("jsdom");
const { window } = new JSDOM("");
const $ = require("jquery")(window);
const logger = require("logger").createLogger('development.log');
const { Pool, ClientBase } = require('pg');
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
  .get('/db', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM jogadores');
      const results = { 'results': (result) ? result.rows : null };
      res.render('pages/db', results);
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/proclubs', async (req, res) => {
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
        "Referer": `https://www.ea.com/pt-br/games/fifa/fifa-21/pro-clubs/ps4-xb1-pc/overview?clubId=${clubId}&platform=ps4`
      },
      params: {
        clubIds: clubId
      }
    }

    axios.get('https://proclubs.ea.com/api/fifa/clubs/info?platform=ps4', config)
      .then(async response => {

        const clubData = response.data[clubId]
        const post = {
          clubId: clubData.clubId,
          name: clubData.name,
          regionId: clubData.regionId,
          teamId: clubData.teamId
        }

        let cols = [];
        let inputs = [];
        for (let k in post) {
          cols.push(k);
          inputs.push(k.value);
        }
        const client = await pool.connect();
        let query = `INSERT INTO CLUBES (${cols.toString()} values (${inputs.toString()}))`
        console.log(query)
        const result = await client.query("insert", [post])
        //const result = await client.query(`INSERT INTO CLUBES (${cols.toString()}) values (${inputs.toString()}))`)
        console.log(result)
        logger.warn(jogador)
        console.log(jogador)
        console.log(response.data.url);
        console.log(response.data.explanation);
      })
      .catch(error => {
        console.log(error);
      });
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`))
