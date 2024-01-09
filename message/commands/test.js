const { sleep } = require('../../lib/utils');

module.exports = {
    name: 'menuExample',
    description: 'Ejemplo de menú con opciones',

    async execute(sock, m) {
        try {
            // Enviar las opciones del menú
            const menuMessage = await sock.sendMessage(m.chat, {
                text: `
                    Elige una opción:
                    1. Opción 1
                    2. Opción 2
                `,
            }, { quoted: m });

            // Esperar la respuesta del usuario
            const response = await sock.waitForMessage(m.chat, {
                sender: m.sender,
                quoted: menuMessage,
                options: ['1', '2'],
                timeout: 300000, // 5 minutos de tiempo de espera
            });

            if (response && response.body) {
                // Responder según la opción seleccionada
                const selectedOption = response.body.trim();
                if (selectedOption === '1') {
                    await sock.sendMessage(m.chat, { text: 'Has seleccionado la Opción 1.' }, { quoted: m });
                } else if (selectedOption === '2') {
                    await sock.sendMessage(m.chat, { text: 'Has seleccionado la Opción 2.' }, { quoted: m });
                } else {
                    await sock.sendMessage(m.chat, { text: 'Opción no válida.' }, { quoted: m });
                }
            } else {
                await sock.sendMessage(m.chat, { text: 'Tiempo de espera agotado o respuesta no válida. Inténtalo de nuevo.' }, { quoted: m });
            }
        } catch (error) {
            console.error(error);
            await sock.sendMessage(m.chat, { text: 'Error al procesar el comando.' }, { quoted: m });
        }
    },
};
