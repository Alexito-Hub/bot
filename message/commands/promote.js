module.exports = {
    name: 'promote',
    description: 'añade a un miembro como administrador del grupo',
    aliases: ['promote'],
    
    async execute(sock, m, args, isBotAdmin) {
        try {
            if (!m.isGroup) {
                return;
            }
            
            if (isBotAdmin === false) {
                await sock.sendMessage(m.chat, { text: 'El bot no es administrador.' }, { quoted: m });
                return
            }
            const groupInfo = await sock.groupMetadata(m.chat);
            const isAdmin = groupInfo && groupInfo.participants.some(p => p.id == m.sender && ['admin', 'superadmin'].includes(p.admin));
            
            if (!isAdmin) {
                await sock.sendMessage(m.chat, { text: 'Solo administradores.' }, { quoted: m });
                return;
            }

            let targetUser;
            if (args.length > 0) {
                targetUser = args[0].replace('@', '').replace(/\s/g, '').split('@')[0] + '@s.whatsapp.net';
            } else if (m.quoted) {
                targetUser = m.quoted.sender;
            } else {
                await sock.sendMessage(m.chat, { text: '*promote <@usuario>*' }, { quoted: m });
                return;
            }

            const userObj = groupInfo.participants.find(p => p.id === targetUser);
            
            if (!userObj) {
                await sock.sendMessage(m.chat, { text: '¿?' }, { quoted: m });
                return;
            }

            if (['admin', 'superadmin'].includes(userObj.admin)) {
                await sock.sendMessage(m.chat, { text: 'ya es administrador.' }, { quoted: m });
                return;
            }

            await sock.groupParticipantsUpdate(m.chat, [targetUser], 'promote');
            await sock.sendMessage(m.chat, {
                contextInfo: {
                    remoteJid: m.chat,
                    mentionedJid: [m.sender, targetUser],
                },
                video: { url: 'https://telegra.ph/file/25ec490a6f4dd4b423110.mp4' },
                gifPlayback: true,
                caption: `ㅤ *⋯⋯ PROMOTE ⋯⋯*
 ∘ *Grupo:* ${groupInfo.subject}
 ∘ *Usuario* @${targetUser.split('@')[0]}
 ∘ *Por:* @${m.sender.split('@')[0]}

*©ᴢɪᴏᴏᴏ*`,
            });

        } catch (error) {
            console.log('Error:', error);
            await sock.sendMessage(m.chat, { text: `${error}` }, { quoted: m });
        }
    },
};
