module.exports = (bot) => {

    const helpText = `*Welcome to Search Bot!*
Use the inline mode below
@ChannelMikibot p <search image>
@ChannelMikibot w <search wiki>`;

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

};