const antilinkStatus = {};

module.exports = {
    name: 'antilink',
    description: 'Activa o desactiva el antienlace',
    aliases: ['toggleantilink'],

    async execute(sock, m, args) {
        const chatId = m.chat;

        // Verificar si el antilink está activado o desactivado
        if (antilinkStatus[chatId]) {
            antilinkStatus[chatId] = false;
            sock.sendMessage(chatId, { text: 'Antienlace desactivado.' }, { quoted: m });
        } else {
            antilinkStatus[chatId] = true;
            sock.sendMessage(chatId, { text: 'Antienlace activado.' }, { quoted: m });
        }
    },

    async onMessage(sock, m) {
        const chatId = m.chat;
        const sender = m.sender;

        // Verificar si el antilink está activado para el chat específico
        if (antilinkStatus[chatId]) {
            // Verificar si el mensaje contiene enlaces
            if (m.text && hasLinks(m.text)) {
                // Eliminar al usuario que envió el enlace
                await sock.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
                sock.sendMessage(chatId, { text: 'Enlaces no permitidos. Has sido eliminado.' });
            }
        }
    },
};

// Función para verificar si un texto contiene enlaces
function hasLinks(text) {
    const linkRegex = /(https?|ftp):\/\/[^\s/$.?#].[^\s]*/i;
    return linkRegex.test(text);
}
