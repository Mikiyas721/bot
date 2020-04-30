const Telegraf = require('telegraf');
const axios = require('axios');

const bot = new Telegraf('1242212085:AAGRflf5WmPc1raG-HLvAtcsWBskBlGdkVY');

const helpText = `*Welcome to Search Bot!*
Use the inline mode below
@ChannelMikibot p <search image>
@ChannelMikibot w <search wiki>`;

const apikey = "16290300-7bf2fab88863e7575d1d62ca6";

bot.command(["start", "help"], ctx => {
    bot.telegram.sendMessage(ctx.chat.id, helpText, {
        reply_markup: {
            inline_keyboard: [
                [{text: "Search pixabay image", switch_inline_query_current_chat: "p "}],
                [{text: "Search Wiki", switch_inline_query_current_chat: "w "}]
            ]
        }, parse_mode: "markdown"
    })
});

bot.inlineQuery(/p\s.+/, async ctx => {
    let rawQuery = ctx.inlineQuery.query.split(" ");
    rawQuery.shift();
    let searchTerm = rawQuery.join(" ");
    let response = await axios.get(`https://pixabay.com/api/?key=${apikey}&q=${searchTerm}`)
    let rawResult = response.data.hits;

    let result = rawResult.map((item, index) => {
        return {
            type: 'photo',
            id: String(index),
            photo_url: item.largeImageURL,
            thumb_url: item.previewURL,
            photo_width: 300,
            photo_height: 200,
            parse_mode: "Markdown",
            caption: `[Source](${item.webformatURL})\n[Large](${item.largeImageURL})`
        }
    });
    ctx.answerInlineQuery(result)

});

bot.inlineQuery(/w\s.+/, async ctx => {
    let rawQuery = ctx.inlineQuery.query.split(" ");
    rawQuery.shift();
    let searchTerm = rawQuery.join(" ");
    let response = await axios.get(`https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${searchTerm}&limit=50`);
    let data = response.data;
    let allTiles = data[1];
    let allLinks = data[3];

    if (allTiles === undefined) return;

    let result = allTiles.map((item, index) => {
        return {
            type: 'article',
            id: String(index),
            title: item,
            input_message_content:{
                message_text: `${item}\n${allLinks[index]}`
            },
            description: allLinks[index]
        }
    });
    ctx.answerInlineQuery(result)

});


bot.launch();




