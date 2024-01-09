const { sleep } = require('../../lib/utils');

// Array para almacenar opciones
const optionsArray = [];

module.exports = {
    name: 'menuCommand',
    description: 'Comando con opciones',
    aliases: ['menu'],

    async execute(sock, m) {
        try {
            // Enviar las opciones al usuario
            await sock.sendMessage(m.chat, { text: 'Elige una opción:\n1. Opción 1\n2. Opción 2' }, { quoted: m });

            // Esperar la respuesta del usuario
            const response = await sock.waitForMessage(m.sender, {
                filter: (message) => ['1', '2'].includes(message.body.trim()),
                timeout: 30000, // 30 segundos de tiempo de espera
            });

            if (response && response.body) {
                // Almacenar la opción en el array
                optionsArray.push(response.body.trim());

                // Responder con la opción seleccionada
                await sock.sendMessage(m.chat, { text: `Has seleccionado la opción ${response.body.trim()}` }, { quoted: m });
            } else {
                await sock.sendMessage(m.chat, { text: 'Tiempo de espera agotado o respuesta no válida.' }, { quoted: m });
            }
        } catch (error) {
            console.error(error);
            await sock.sendMessage(m.chat, { text: 'Error al procesar el comando.' }, { quoted: m });
        }
    },

    // Comando para mostrar las opciones almacenadas en el array
};
