require('dotenv').config();
const Telegraf = require('telegraf');
const axios = require('axios');

const bot = new Telegraf(process.env.TOKEN);
const apikey = process.env.PIXABAYAPI;


const startCommand = require('./src/commands/start');
startCommand(bot);

const imageHandler = require('./src/inlinehandlers/image');
imageHandler(bot, axios, apikey);

const wikiCommand = require('./src/inlinehandlers/wiki');
wikiCommand(bot, axios);


bot.launch();




