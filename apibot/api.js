const Telegraf = require('telegraf');
const axios = require('axios');
const fs = require('fs');


const bot = new Telegraf('1197293831:AAF-f6f5hEiQXev83GMv05f44ei2g_J2bds');

const helpString = `*Simple API Bot*
/fortune - get a fortune cookie
/cat - get a random cat pic
/cat \`<text>\` - get cat image with your text on it
/dogbreeds - get list of dog breeds
/dog \`<breed>\` - get image of dog breed. The Dog breed name should be out of the breed list you get from the above command.`;

bot.command(['start', 'help'], ctx => {
    bot.telegram.sendMessage(ctx.from.id, helpString, {parse_mode: "markdown"});
});

const fortuneurl = "http://yerkee.com/api/fortune";
const caturl = "http://aws.random.cat/meow";

bot.command('fortune', ctx => {
    axios.get(fortuneurl).then(response => ctx.reply(response.data.fortune)).catch(error => ctx.reply(error));
});

bot.command('cat', ctx => {
    let input = ctx.message.text;
    let inputArray = input.split(" ");
    if (inputArray.length > 1) {
        inputArray.shift();
        input = inputArray.join(" ");
        ctx.replyWithPhoto(`http://cataas.com/cat/says/${input}`);
    } else {
        axios.get(caturl).then(res => ctx.replyWithPhoto(res.data.file)).catch(err => ctx.reply(err));
    }
});

bot.command('dogbreeds', ctx => {
    let data = readFromFile();
    let message = "Dog Breeds:\n";
    for (mess in data) {
        message += ("- " + data[mess] + "\n");
    }
    ctx.reply(message);
});
bot.command('dog', ctx => {
    let messageArray = ctx.message.text.split(" ");
    let data = readFromFile();
    if (messageArray.length <= 1) {
        let randomNumber = Math.ceil(Math.random() * 88);
        axios.get(`https://dog.ceo/api/breed/${data[randomNumber]}/images/random`).then(response => {
            ctx.replyWithPhoto(response.data.message, {caption: data[randomNumber]})
        }).catch(err => {
            ctx.reply(err.message);
        })
    } else {
        let breedInput = messageArray[1];
        if (data.includes(breedInput)) {
            axios.get(`https://dog.ceo/api/breed/${breedInput}/images/random`).then(response => {
                ctx.replyWithPhoto(response.data.message)
            }).catch(err => {
                ctx.reply(err.message);
            })
        } else {
            let suggestion = data.filter(item =>
                item.startsWith(breedInput)
            );
            if (suggestion.length == 0) ctx.reply("Sorry couldn't find any match");
            else {
                let suggestionString = "Did you mean\n";
                for (sug in suggestion) {
                    suggestionString += ("- " + suggestion[sug] + "\n");
                }
                ctx.reply(suggestionString)
            }
        }
    }
});

function readFromFile() {
    let rawData = fs.readFileSync("./dogbreeds.json", "utf8");
    return JSON.parse(rawData);
}

bot.launch();


