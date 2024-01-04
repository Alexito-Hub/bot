// antilink.js
const { client, sms } = require('../../lib/simple');

module.exports = {
  name: 'antilink',
  description: 'Elimina a los usuarios que envíen enlaces',
  aliases: ['antienlace'],

  async execute(sock, m, args) {
    try {
      const isGroup = m.isGroup;
      const senderNumber = m.sender.split('@')[0];
      const isOwner = owner.includes(senderNumber);
      const isStaff = staff.includes(senderNumber) || isOwner;

      if (isGroup && isStaff) {
        // Verifica si el mensaje contiene un enlace
        if (m.type === 'extendedTextMessage' && m.message.extendedTextMessage.text.includes('http')) {
          // Elimina al usuario que envió el enlace
          await sock.groupParticipantsUpdate(m.chat, [senderNumber + '@s.whatsapp.net'], 'remove');
          await sock.sendMessage(m.chat, { text: `¡${senderNumber} fue eliminado por enviar un enlace!` }, { quoted: m });
        }
      } else {
        // Si no es un grupo o el remitente no es staff, envía un mensaje indicando que no tiene permisos
        await sock.sendMessage(m.chat, { text: 'Este comando solo puede ser utilizado por el staff en grupos.' }, { quoted: m });
      }
    } catch (error) {
      console.error(error);
      await sock.sendMessage(m.chat, { text: 'Error al procesar el comando antienlace' }, { quoted: m });
    }
  },
};
