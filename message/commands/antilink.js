require('../../config');

// Variable global para controlar el estado del antienlace
let antiLinkEnabled = false;

module.exports = {
  name: 'antilink',
  description: 'Habilita o deshabilita la función antienlace',
  aliases: ['al', 'antienlace'],

  async execute(sock, m, args) {
    try {
      // Verificar si el usuario es propietario o tiene permisos de staff
      const isOwner = owner.includes(m.sender.split('@')[0]);
      const isStaff = staff.includes(m.sender.split('@')[0]) || isOwner;

      if (!isStaff) {
        // Si no es staff, enviar un mensaje indicando que no tiene permisos
        await sock.sendMessage(m.chat, { text: 'Solo el staff tiene permiso para usar este comando.' }, { quoted: m });
        return;
      }

      // Verificar si se proporciona un argumento (on/off)
      const arg = args[0]?.toLowerCase();

      if (arg === 'on') {
        // Habilitar la función antienlace
        antiLinkEnabled = true;
        await sock.sendMessage(m.chat, { text: '¡Función antienlace habilitada!' }, { quoted: m });
      } else if (arg === 'off') {
        // Deshabilitar la función antienlace
        antiLinkEnabled = false;
        await sock.sendMessage(m.chat, { text: '¡Función antienlace deshabilitada!' }, { quoted: m });
      } else {
        // Mostrar mensaje de uso correcto si no se proporciona un argumento válido
        await sock.sendMessage(m.chat, { text: 'Uso correcto: #antilink [on/off]' }, { quoted: m });
      }
    } catch (error) {
      console.error(error);
      await sock.sendMessage(m.chat, { text: 'Error al procesar el comando antilink' }, { quoted: m });
    }
  },

  // Agrega esta función para manejar mensajes y eliminar usuarios que envíen enlaces si la función antienlace está habilitada
  async execute(sock, m) {
    try {
      if (antiLinkEnabled && (m.type === 'chat' || m.type === 'extendedTextMessage')) {
        const detectedLinks = m.body.match(/(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/gi);

        if (detectedLinks && detectedLinks.length > 0) {
          // Si se detectan enlaces, eliminar al usuario
          await sock.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
          await sock.sendMessage(m.chat, { text: '¡Enlace detectado! Se eliminó al usuario.' }, { quoted: m });
        }
      }
    } catch (error) {
      console.error(error);
    }
  },
};
