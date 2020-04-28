const Telegraf = require('telegraf');

const bot = new Telegraf('1182527022:AAG-BlqffziIXkNrZ-Wfh12zZAvoj1PZdkI');
const helpMessage = `Say something to me:
        /start - Start the bot
        /help - Command reference
        /echo - Say you said echo
        /echo <msg> - Echo message
        `;

bot.use((ctx, next) => {
    bot.telegram.sendMessage(-407716743
        , ctx.message.from.first_name + " used your bot");
    next();
});
bot.start((ctx => {
    ctx.reply(helpMessage);
    ctx.reply("Hello I am the echo bot");
}));

bot.help((ctx) => {
    ctx.reply(helpMessage);
});

bot.command("echo", (ctx) => {
    let inputMessage = ctx.message.text;
    let inputArray = inputMessage.split(" ");

    if (inputArray[1] == null)
        ctx.reply("You said echo");
    else {
        let message = "";
        for (let currentMessage in inputArray) {
            if (currentMessage == 0) continue;
            message += inputArray[currentMessage];
            message += " ";
        }
        ctx.reply(ctx.message.from.first_name + " " + message)
    }
});


bot.launch();