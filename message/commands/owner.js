module.exports = {
    name: 'owner',
    description: 'Menciona al propietario del bot',

    async execute(sock, m, args) {
        try {
            // ID del propietario
            const ownerId = '51968374620@s.whatsapp.net';

            // Menciona al propietario
            await sock.sendMessage(m.chat, {
                text: `¡Hola, @${ownerId.split('@')[0]}! ¡Eres el propietario del bot! 🤖`,
                contextInfo: { mentionedJid: [ownerId] },
            });
        } catch (error) {
            console.error('Error en el comando owner:', error);
            await sock.sendMessage(m.chat, { text: 'Error al procesar la solicitud.' }, { quoted: m });
        }
    },
};
