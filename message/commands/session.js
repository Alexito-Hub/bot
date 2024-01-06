const sessions = {};

module.exports = {
  name: 'menu2',
  description: 'Muestra opciones de menú',
  aliases: ['options'],

  async execute(sock, m, args) {
    try {
      if (sessions[m.sender]) {
        await sock.sendMessage(m.chat, { text: 'Tienes una descarga pendiente.' }, { quoted: m });
        return;
      }

      // Inicia una nueva sesión
      sessions[m.sender] = {
        startTime: Date.now(),
        options: ['audio', 'video'],
      };

      await sock.sendMessage(m.chat, { text: 'Opciones disponibles:\n1. video\n2. audio' }, { quoted: m });
    } catch (error) {
      console.error(error);
      await sock.sendMessage(m.chat, { text: 'Error al procesar la solicitud' }, { quoted: m });
    }
  },
};

// Comando para la opción "server"
module.exports.server = {
  name: 'video',
  description: 'Obtiene información del servidor',

  async execute(sock, m) {
    try {
      // Verifica si hay una sesión activa
      if (!sessions[m.sender]) {
        return;
      }

      const elapsedTime = Date.now() - sessions[m.sender].startTime;
      if (elapsedTime > 5 * 60 * 1000) {
        // La sesión ha caducado
        delete sessions[m.sender];
        await sock.sendMessage(m.chat, { text: 'La sesión ha caducado.' }, { quoted: m });
        return;
      }

      // Realiza la acción para la opción "server"
      await sock.sendMessage(m.chat, { text: 'su video esta siendo procesado' }, { quoted: m });

      // Finaliza la sesión después de ejecutar la acción
      delete sessions[m.sender];
    } catch (error) {
      console.error(error);
      await sock.sendMessage(m.chat, { text: 'Error' }, { quoted: m });
    }
  },
};
