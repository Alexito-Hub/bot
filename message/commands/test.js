const { sleep } = require('../../lib/utils');

module.exports = {
    name: 'test',
    description: 'Ejemplo de menú con opciones',
    aliases: ['test'],

    async execute(sock, m) {
        try {
            // Enviar las opciones del menú
            const menuMessage = await sock.sendMessage(m.chat, {
                text: `
                    Elige una opción:
                    1. Opción A
                    2. Opción B
                `,
            }, { quoted: m });

            // Esperar la respuesta del usuario
            const response = await sock.waitForMessage(m.chat, {
                sender: m.sender,
                quoted: menuMessage,
                options: ['1', '2'],
                timeout: 60000, // 60 segundos de tiempo de espera
            });

            if (!response || !response.body) {
                await sock.sendMessage(m.chat, { text: 'Tiempo de espera agotado o respuesta no válida. Inténtalo de nuevo.' }, { quoted: m });
                return;
            }

            const choice = response.body.trim();

            // Responder según la elección del usuario
            if (choice === '1') {
                await sock.sendMessage(m.chat, { text: 'Has elegido la Opción A.' }, { quoted: m });
            } else if (choice === '2') {
                await sock.sendMessage(m.chat, { text: 'Has elegido la Opción B.' }, { quoted: m });
            } else {
                await sock.sendMessage(m.chat, { text: 'Opción no válida.' }, { quoted: m });
            }
        } catch (error) {
            console.error(error);
            await sock.sendMessage(m.chat, { text: 'Error al procesar el comando.' }, { quoted: m });
        }
    },
};
