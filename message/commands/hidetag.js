module.exports = {
    name: 'hidetag',
    description: 'Menciona a todos los miembros del grupo con un mensaje oculto',
    
    async execute(sock, m, args, groupMetadata) {
        try {
            if (!m.isGroup) {
                sock.sendMessage(m.chat, { text: 'Este comando solo se puede usar en grupos.' }, { quoted: m });
                return;
            }

            const groupInfo = await groupMetadata(m.chat);
            const members = groupInfo.participants.map(adm => adm.id.replace('c.us', 's.whatsapp.net'));

            const message = args.join(' ');

            const options = {
                text: message,
                contextInfo: { mentionedJid: members },
            };

            await sendMessage(m.chat, options, {quoted:m});
        } catch (error) {
            console.error('Error al ejecutar el comando hidetag:', error);
            sock.sendMessage(m.chat, { text: 'Error al ejecutar el comando hidetag.' }, { quoted: m });
        }
    },
};
