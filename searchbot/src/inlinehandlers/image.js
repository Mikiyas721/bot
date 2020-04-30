module.exports = (bot, axios, apikey) => {
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

};