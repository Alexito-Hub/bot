const { sleep } = require('../../lib/utils');

module.exports = {
    name: 'test',
    description: 'Comando con opciones',
    aliases: ['test'],

    async execute(sock, m) {
        try {
            await sock.sendMessage(m.chat, { text: 'Elige una opción:\n1. Opción 1\n2. Opción 2' }, { quoted: m });

            const response = await sock.waitForMessage(m.sender, {
                filter: (message) => ['1', '2'].includes(message.body.trim()),
            }, 30000);

            if (response && response.body) {
                await sock.sendMessage(m.chat, { text: `Has seleccionado la opción ${response.body.trim()}` }, { quoted: m });
            } else {
                await sock.sendMessage(m.chat, { text: 'Tiempo de espera agotado o respuesta no válida.' }, { quoted: m });
            }
        } catch (error) {
            console.error(error);
            if (error.message.includes('timeout')) {
                await sock.sendMessage(m.chat, { text: 'Lo siento, tu solicitud ha excedido el tiempo de espera.' }, { quoted: m });
            } else {
                await sock.sendMessage(m.chat, { text: 'Error al procesar el comando.' }, { quoted: m });
            }
        }
    },
};
