const Telegraf = require('telegraf');
const bot = new Telegraf('1198025787:AAGJhaVc7VImUYTPqf_dYRfq0tiXhh6TWj8');

const startString = `Help Reference
/addis - get image of addis
/dubai - get gif of dubai
/addisloc - get location of addis
/cities - get photo of cities
/citieslist - get text file of cities
`;

bot.command(['start', 'help'], (ctx) => {
    ctx.reply(startString);
});
//using file url

bot.command("addis", ctx => {
    bot.telegram.sendChatAction(ctx.chat.id, "upload_photo");
    ctx.telegram.sendPhoto(ctx.chat.id, {source: "res/addis.jpg"}, {reply_to_message_id: ctx.message.message_id});
});

bot.command("dubai", ctx => {
    bot.telegram.sendChatAction(ctx.chat.id, "upload_video");
    ctx.telegram.sendAnimation(ctx.chat.id, "https://media2.giphy.com/media/c0BdI069vyn5K/giphy.gif?cid=790b7611640372d3186cd2314995cb37839375a907f0a08e&rid=giphy.gif",
        {reply_to_message_id: ctx.message.message_id})
});

bot.command("cities", ctx => {
    bot.telegram.sendChatAction(ctx.chat.id, "upload_photo");
    bot.telegram.sendMediaGroup(ctx.chat.id, [
        {type: "photo", media: {source: "res/addis.jpg"}},
        {type: "photo", media: {source: "res/dubai.jpg"}},
        {type: "photo", media: {source: "res/hongkong.jpg"}},
        {type: "photo", media: {source: "res/london.jpg"}},
        {type: "photo", media: {source: "res/newyork.jpg"}},
        {type: "photo", media: {source: "res/singapore.jpg"}}
    ], {reply_to_message_id: ctx.message.message_id})
});

bot.command('citieslist', ctx => {
    bot.telegram.sendChatAction(ctx.chat.id, "upload_document");
    bot.telegram.sendDocument(ctx.chat.id, {source: "res/citieslist.txt"}, {
        thumb: {source: "res/addis.jpg"}
    })
});

bot.command("addisloc", ctx => {
    bot.telegram.sendChatAction(ctx.chat.id, "find_location");
    bot.telegram.sendLocation(ctx.chat.id, 8.9806, 38.7578, {reply_to_message_id: ctx.message.message_id});
});

bot.on('message', async ctx => {
    if (ctx.updateSubTypes[0] === 'document') {
        try {
            let link = await bot.telegram.getFileLink(ctx.message.document.file_id);
            ctx.reply(`Your link is ${link}`)
        } catch (e) {
            ctx.reply(e);
        }
    }
    else if (ctx.updateSubTypes[0] === 'photo') {
        try {
            let link = await bot.telegram.getFileLink(ctx.message.photo[0].file_id);
            ctx.reply(`Your link is ${link}`)
        } catch (e) {
            ctx.reply(e);
        }
    }

});


bot.launch();









