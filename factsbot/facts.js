const Telegraf = require('telegraf');
const axios = require('axios');

const bot = new Telegraf('1191105410:AAGnj1iauY871tgnBM_m3p3SUfrRYj1dzXU');

const link = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTT3k7qLwam1vMSsSVqewjo6Qq_4VKUYTNCRaed6ZTFGd2-ssfFmcct8tSUE1oe6i8iViMEezKCO4J8/pubhtml";
const googleLink = "https://spreadsheets.google.com/feeds/cells/1agJaelxSy53W0rVEJsSwGMZPGhvChhAXX5wmZ6p9e5I/1/public/full?alt=json";

bot.command('fact', ctx => {
    axios.get(googleLink).then(res => {
            let random = Math.round(Math.random() * (res.data.feed.entry[1].gs$cell.inputValue)-3) + 3;
            ctx.reply(res.data.feed.entry[random].gs$cell.inputValue)
        }
    ).catch(err => ctx.reply(err.message));
});


bot.launch();
