
module.exports = {
    name: 'hidetag',
    description: 'Menciona a todos los miembros del grupo con un mensaje oculto',
    aliases: ['todos', '@', 'all'],
    
    async execute(sock, m, args, groupAdmins, isOwner) {
        try {
            
            const groupInfo = await sock.groupMetadata(m.chat);
            const isAdmin = groupInfo && groupInfo.participants.some(p => p.id == m.sender && ['admin', 'superadmin'].includes(p.admin));
            
            if (!isAdmin) {
                sock.sendMessage(m.chat, { text: 'Solo administradores.' }, { quoted: m });
                return;
            }
            if (!m.isGroup) {
                sock.sendMessage(m.chat, { text: 'Este comando solo se puede usar en grupos.' }, { quoted: m });
                return;
            }

            const groupInfo = await sock.groupMetadata(m.chat);
            const members = groupInfo.participants.map(member => member.id.replace('c.us', 's.whatsapp.net'));

            const message = args.join(' ');

            await sock.sendMessage(m.chat, { text: message, contextInfo:{mentionedJid: members}}, {quoted:m});
        } catch (error) {
            console.error('Error al ejecutar el comando hidetag:', error);
            sock.sendMessage(m.chat, { text: 'Error al ejecutar el comando hidetag.' }, { quoted: m });
        }
    },
};