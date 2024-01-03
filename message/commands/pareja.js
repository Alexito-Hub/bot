module.exports = {
    name: 'pareja',
    description: 'Menciona a dos usuarios del grupo como pareja',

    async execute(sock, m, args) {
        try {
            const groupId = m.chat;
            const groupMetadata = await sock.groupMetadata(groupId);

            if (groupMetadata.participants.length < 2) {
                await sock.sendMessage(m.chat, { text: 'No hay suficientes usuarios en el grupo para formar parejas.' }, { quoted: m });
                return;
            }

            // Escoge dos usuarios aleatorios diferentes
            const [user1, user2] = getRandomParticipants(groupMetadata.participants);

            // Menciona a los usuarios como pareja
            await sock.sendMessage(groupId, {
                text: `¡@${user1.split('@')[0]} y @${user2.split('@')[0]} son pareja! 💑`,
                contextInfo: { mentionedJid: [user1, user2] },
            });
        } catch (error) {
            console.error('Error en el comando pareja:', error);
            await sock.sendMessage(m.chat, { text: 'Error al procesar la solicitud.' }, { quoted: m });
        }
    },
};

function getRandomParticipants(participants) {
    // Escoge dos índices aleatorios diferentes
    const index1 = getRandomIndex(participants.length);
    let index2 = getRandomIndex(participants.length);

    // Asegúrate de que los índices sean diferentes
    while (index2 === index1) {
        index2 = getRandomIndex(participants.length);
    }

    // Obtén los números de teléfono de los usuarios en los índices seleccionados
    const user1 = participants[index1].id;
    const user2 = participants[index2].id;

    return [user1, user2];
}

function getRandomIndex(max) {
    return Math.floor(Math.random() * max);
}
