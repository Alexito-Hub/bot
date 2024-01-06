const sessions = {};

module.exports = {
  name: 'menu',
  description: 'Muestra opciones de menú',
  aliases: ['options'],

  async execute(sock, m, args) {
    try {
      // Verifica si hay una sesión activa
      if (sessions[m.sender]) {
        await sock.sendMessage(m.chat, { text: 'Ya hay una sesión activa. Utiliza "server" para obtener información.' }, { quoted: m });
        return;
      }

      // Inicia una nueva sesión
      sessions[m.sender] = {
        startTime: Date.now(),
        options: ['link', 'server'],
      };

      await sock.sendMessage(m.chat, { text: 'Opciones disponibles:\n1. link\n2. server' }, { quoted: m });
    } catch (error) {
      console.error(error);
      await sock.sendMessage(m.chat, { text: 'Error al procesar la solicitud de menú.' }, { quoted: m });
    }
  },
};

// Comando para la opción "server"
module.exports.server = {
  name: 'server',
  description: 'Obtiene información del servidor',

  async execute(sock, m) {
    try {
      // Verifica si hay una sesión activa
      if (!sessions[m.sender]) {
        await sock.sendMessage(m.chat, { text: 'No hay una sesión activa. Inicia una sesión con "menu".' }, { quoted: m });
        return;
      }

      // Verifica si la sesión está dentro del límite de tiempo (5 minutos)
      const elapsedTime = Date.now() - sessions[m.sender].startTime;
      if (elapsedTime > 5 * 60 * 1000) {
        // La sesión ha caducado
        delete sessions[m.sender];
        await sock.sendMessage(m.chat, { text: 'La sesión ha caducado. Inicia una nueva sesión con "menu".' }, { quoted: m });
        return;
      }

      // Realiza la acción para la opción "server"
      await sock.sendMessage(m.chat, { text: 'Información del servidor: ...' }, { quoted: m });

      // Finaliza la sesión después de ejecutar la acción
      delete sessions[m.sender];
    } catch (error) {
      console.error(error);
      await sock.sendMessage(m.chat, { text: 'Error al obtener información del servidor.' }, { quoted: m });
    }
  },
};
