require('../../config');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

module.exports = {
  name: 'tagall',
  description: 'Etiqueta a todos los miembros de los grupos en los que participa el bot',
  aliases: ['tag', '@todos', '@all'],

  async execute(sock, m, args) {
    try {
      const isOwner = owner.includes(m.sender.split('@')[0]);
      const isStaff = staff.includes(m.sender.split('@')[0]) || isOwner;

      if (!isStaff) {
        await sock.sendMessage(m.chat, { text: 'Solo el Staff puede usar el comando.' }, { quoted: m });
        return;
      }

      const groups = await sock.groupFetchAllParticipating();
      const groupIds = Object.keys(groups);
      
      const groupInfo = await sock.groupMetadata(m.chat);
      const members = groupInfo.participants.map(member => member.id.replace('c.us', 's.whatsapp.net'));
      
      const messageType = args.join(' ');
      if (!messageType) return await sock.sendMessage(m.chat, { text: '¿Falta de ideas para un mensaje?' }, { quoted: m });
      

if (m.type === 'imageMessage' || m.type === 'videoMessage' || m.type === 'audioMessage') {
  const mediaType = m.type === 'imageMessage' ? 'image' : 'video';

  for (const groupId of groupIds) {
    await sleep(1500);

    await sock.sendMessage(groupId, {
        [mediaType]: { url: m[mediaType + 'Message'].url, mimetype: m[mediaType + 'Message'].mimetype },
        caption: messageType,
        contextInfo:{
            
        }
    });
  }
} else {
  for (const groupId of groupIds) {
    await sleep(1500);

    await sock.sendMessage(groupId, {
      text: messageType,
      contextInfo:{
          mentionedJid: members.map(member => ({ tag: member })),
      }
    });
  }
}


      await sock.sendMessage(m.chat, { text: 'Envío de contenido correcto.' }, { quoted: m });
    } catch (error) {
      console.error(error);
      await sock.sendMessage(m.chat, { text: 'Error al enviar contenido' }, { quoted: m });
    }
  },
};
