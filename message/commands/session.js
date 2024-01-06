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

            // Supongamos que aquí está la lógica para buscar en YouTube y obtener los resultados
            const searchResults = await fetchJson(`https://iam-zio.replit.app/api/ytdl-search?key=zio&q=${searchText}`);

            if (!searchResults || !searchResults.result) {
                await sock.sendMessage(m.chat, { text: 'No se encontraron resultados.' }, { quoted: m });
                return;
            }

            // Obtener el primer resultado
            const firstResult = searchResults.result[0];

            // Construir el mensaje con la información del video y opciones de descarga
            const message = `
                *⋯⋯ PLAY ⋯⋯*
                ∘ *Nombre:* ${firstResult.title}
                ∘ *Duración:* ${firstResult.duration}
                ∘ *Vistas:* ${firstResult.views}
                
                Elige una opción para descargar:
                1. Descargar en Video
                2. Descargar en Audio
            `;

            // Enviar el mensaje con las opciones y obtener el ID del mensaje enviado
            const optionsMessage = await sock.sendMessage(m.chat, { text: message }, { quoted: m });

            // Esperar la respuesta del usuario con un tiempo de espera de 2 minutos
            const response = await sock.waitForMessage(m.chat, 120000);

            if (!response) {
                await sock.sendMessage(m.chat, { text: 'Tiempo de espera agotado. Inténtalo de nuevo.' }, { quoted: m });
                return;
            }

            switch (response.body) {
                case '1':
                    await sock.sendMessage(m.chat, { text: `Descargando el video: ${firstResult.url}` }, { quoted: m });
                    // Lógica para descargar el video
                    break;
                case '2':
                    await sock.sendMessage(m.chat, { text: `Descargando el audio: ${firstResult.url}` }, { quoted: m });
                    // Lógica para descargar el audio
                    break;
                default:
                    await sock.sendMessage(m.chat, { text: 'Opción no válida.' }, { quoted: m });
            }
        } catch (error) {
            console.error(error);
            await sock.sendMessage(m.chat, { text: 'Error al procesar el comando.' }, { quoted: m });
        }
    },
};
