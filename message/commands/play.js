const ytsr = require('ytsr');
const axios = require('axios');

module.exports = {
    name: 'play',
    description: 'Buscar y reproducir el primer video relacionado con la búsqueda.',
    aliases: [],

    async execute(sock, m, args) {
        try {
            v.reply('Youtube no disponible 🍥', m)
            /* if (!args[0]) {
                return v.reply('Por favor, proporciona una búsqueda.');
            }

            const searchQuery = args.join(' ');
            const searchResults = await ytsr(searchQuery, { limit: 1 });

            if (searchResults && searchResults.items && searchResults.items.length > 0) {
                const firstVideo = searchResults.items[0];
                const videoUrl = `https://star-apis.teamfx.repl.co/api/downloader/ytplay?url=${encodeURIComponent(firstVideo.url)}&apikey=TeamFX`;

                sock.sendMessage(m.chat, { video: {url: videoUrl}, mimetype:'video/mp4', caption:`${firstVideo.title}`}, { quoted: m });
            } else {
                v.reply('No se encontraron resultados para la búsqueda.');
            }*/ 
        } catch (error) {
            console.error('Error en el comando play:', error);
            v.reply('Se produjo un error al ejecutar el comando play.');
        }
    },
};

