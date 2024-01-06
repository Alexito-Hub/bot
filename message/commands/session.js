const { fetchJson } = require('../../lib/utils')

module.exports = {
    name: 'play',
    description: 'Descarga videos de YouTube',
    aliases: ['ytplay'],

    async execute(sock, m, args) {
        try {
            if (!args[0]) {
                await sock.sendMessage(m.chat, { text: '*play <string>*' }, { quoted: m });
                return;
            }

            const searchText = args.join(' ');

            const searchResults = await fetchJson(`https://iam-zio.replit.app/api/ytdl-search?key=zio&q=${searchText}`);

            if (!searchResults || !searchResults.result || searchResults.result.length === 0) {
                await sock.sendMessage(m.chat, { text: 'No se encontraron resultados.' }, { quoted: m });
                return;
            }
            const result = searchResults.result[0]
            await sock.sendMessage(m.chat,{ video: { url: `https://iam-zio.replit.app/api/ytdl-ytmp4?key=zio&q=${result.url}`},
                mimetype: 'video/mp4',
                caption:`ㅤ *⋯⋯ TIK TOK ⋯⋯*
 ▢ *Título:* ${result.title}
 ▢ *Autor:* ${result.author.name}
 ▢ *Duración:* ${result.duration.timestamp}
 ▢ *Fecha:* ${result.date}
 ▢ *Descripción:* ${result.description}
 
*api@zio*`
            })

        } catch (error) {
            console.error(error);
            await sock.sendMessage(m.chat, { text: 'Error al procesar el comando.' }, { quoted: m });
        }
    },
};
