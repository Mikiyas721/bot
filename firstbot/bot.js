const Telegraf = require('telegraf');

const bot = new Telegraf('1253539905:AAGQaSiRzcc0npvpLBXFeVd-St2n6Bw4cI8');

bot.start((ctx) => {
    ctx.reply("Hello "+ ctx.from.first_name + " you entered the start command, which is a "+ ctx.updateSubTypes[0]);
});

bot.hears("Dog", (ctx) => {
    ctx.reply("Wuf wuf")
});

bot.help((cxt) => {
    cxt.reply("Hello User. You have entered the help command.")
});

bot.settings((cxt) => {
    cxt.reply("Hello User. You have entered the settings command.")
});

bot.command("test", (ctx) =>{
    ctx.reply("Testing if the bot works")
});

bot.on("sticker",(ctx)=>{
    ctx.reply("Sorry, no stickers here")
});

bot.mention("botfather",(ctx)=>{
    ctx.reply(`This is a username ${ctx.from.username}`);
});

bot.phone("0941135730", (ctx)=>{
    ctx.reply(`Is this your phone number ${ctx.from.username}`)
});

bot.hashtag("hash", (ctx)=>{
    ctx.reply(`This is a hashtag ${ctx.from.username}`)

});

bot.use((ctx)=>{
    ctx.reply("Stop using the use method")
});

bot.launch();




