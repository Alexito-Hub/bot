const { fetchJson } = require('../../lib/utils');

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

            const firstResult = searchResults.result[0];

            // Corregir la representación de la duración
            const duration = firstResult.duration ? firstResult.duration.simpleText : 'Desconocida';

            const message = `
                *⋯⋯ PLAY ⋯⋯*
                ∘ *Nombre:* ${firstResult.title}
                ∘ *Duración:* ${duration}
                ∘ *Vistas:* ${firstResult.views}
                
                Elige una opción para descargar:
                1. Descargar en Video
                2. Descargar en Audio
            `;

            const optionsMessage = await sock.sendMessage(m.chat, { text: message }, { quoted: m });

            // Esperar la respuesta del usuario con un tiempo de espera de 2 minutos
            const response = await sock.waitForMessage(optionsMessage.key.id, 120000);

            if (!response || !response.body) {
                await sock.sendMessage(m.chat, { text: 'Tiempo de espera agotado o respuesta no válida. Inténtalo de nuevo.' }, { quoted: m });
                return;
            }

            const choice = response.body.trim().toLowerCase();

            if (choice === 'audio' || choice === '1') {
                await sock.sendMessage(m.chat, { text: `Descargando el audio: ${firstResult.url}` }, { quoted: m });
                // Lógica para descargar el audio
            } else if (choice === 'video' || choice === '2') {
                await sock.sendMessage(m.chat, { text: `Descargando el video: ${firstResult.url}` }, { quoted: m });
                // Lógica para descargar el video
            } else {
                await sock.sendMessage(m.chat, { text: 'Opción no válida.' }, { quoted: m });
            }
        } catch (error) {
            console.error(error);
            await sock.sendMessage(m.chat, { text: 'Error al procesar el comando.' }, { quoted: m });
        }
    },
};
