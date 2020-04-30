module.exports = (bot, axios) => {
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
                input_message_content: {
                    message_text: `${item}\n${allLinks[index]}`
                },
                description: allLinks[index]
            }
        });
        ctx.answerInlineQuery(result)

    });

};