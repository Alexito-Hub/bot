module.exports = {
    name: 'pareja',
    description: 'Menciona a dos usuarios como pareja',

    async execute(sock, m) {
        try {
            const groupId = m.chat;
            const participants = await sock.groupMetadata(groupId);
            console.log(participants)

            if (participants.length < 2) {
                await sock.sendMessage(m.chat, { text: 'No hay suficientes usuarios en el grupo para formar parejas.' }, { quoted: m });
                return;
            }

            // Elige dos usuarios aleatorios diferentes
            const [user1, user2] = (participants).slice(0, 2);

            // Menciona a los usuarios como pareja
            await sock.sendMessage(groupId, {
                text: `@${user1} y @${user2} son pareja ❤️`,
                contextInfo: { mentionedJid: [user1, user2] },
            });
        } catch (error) {
            console.error('Error en el comando pareja:', error);
            await sock.sendMessage(m.chat, { text: 'Error al procesar la solicitud.' }, { quoted: m });
        }
    },
};
