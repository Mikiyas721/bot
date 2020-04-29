const Telegraf = require('telegraf');
const axios = require('axios');

const bot = new Telegraf('1089287996:AAFSsK97f6mgPCQ31_BKS72UP9lrnMM0d4U');

const apiKey = "95921ebd8962a4b0c4823872bbedcf808270157030f329f8ac60a3c4b88edcf9";

function startCallBack(ctx) {
    bot.telegram.sendMessage(ctx.chat.id, "Welcome, this bot gives you cryptocurrency information", {
        reply_markup: {
            inline_keyboard: [
                [{text: "Crypto prices", callback_data: "prices"}],
                [{text: "CoinMarketCap", url: "https://coinmarketcap.com/"}]
            ]
        }
    })
}

bot.command('start', ctx => {
    startCallBack(ctx);
});

bot.action('start', ctx => {
    ctx.deleteMessage();
    startCallBack(ctx);
});

bot.action('prices', ctx => {
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, "Get price information. Select one of the cryptocurrencies below.", {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: "BTC", callback_data: "BTC"},
                    {text: "ETH", callback_data: "ETH"}
                ],
                [
                    {text: "BCH", callback_data: "BCH"},
                    {text: "LTC", callback_data: "LTC"}
                ],
                [
                    {text: "Back to Main Menu", callback_data: "start"},
                ]
            ]
        }
    })
});

bot.action(["BTC", "ETH", "BCH", "LTC"], async ctx => {
    let type = ctx.match;
    try {
        console.log(type);
        let result = await axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${ctx.match}&tsyms=USD&api_key=${apiKey}`);
        let resultObject = result.data.DISPLAY[type].USD;   // Why use square braces??
        let message =
            `
        Symbol: ${type}
        Price: ${resultObject.PRICE}
        Open: ${resultObject.OPENDAY}
        High: ${resultObject.HIGHDAY}
        Low: ${resultObject.LOWDAY}
        Supply: ${resultObject.SUPPLY}
        Market Cap: ${resultObject.MKTCAP}
        `;
        ctx.deleteMessage();
        bot.telegram.sendMessage(ctx.chat.id, message, {
            reply_markup: {
                inline_keyboard: [
                    [{text: "Back to price", callback_data: "prices"}]
                ]
            }
        })
    } catch (e) {
        ctx.reply(e)
    }
});

bot.command("info", ctx => {
    bot.telegram.sendMessage(ctx.chat.id, "Bot info", {
        reply_markup: {
            keyboard: [
                [
                    {text: "Male"},
                    {text: "Female"}
                ],
                [
                    {text: "Remove keyboard"}
                ]
            ],
            resize_keyboard: true
        }
    })
});

bot.hears("Male", ctx => {
    ctx.reply();
});
bot.hears("Female", ctx => {
    ctx.reply();
});
bot.hears("Remove keyboard", ctx => {
    bot.telegram.sendMessage(ctx.chat.id, "Removed Buttons", {
        reply_markup: {
            remove_keyboard: true
        }
    });
});

bot.launch();
