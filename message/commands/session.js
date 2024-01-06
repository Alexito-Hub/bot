let sessionMap = new Map();

module.exports = {
  name: 'menu2',
  description: 'Muestra opciones de menú',
  aliases: [],

  async execute(sock, m, args) {
    try {
      // Crear una nueva sesión o actualizar la existente
      sessionMap.set(m.sender, { menuTimestamp: Date.now() });
      
      // Enviar opciones de menú al usuario
      await sock.sendMessage(m.chat, {
        text: 'Selecciona una opción:\n1. video\n2. audio',
        contextInfo: {
          mentionedJid: [m.sender],
        },
      }, { quoted: m });
    } catch (error) {
      console.error(error);
      await sock.sendMessage(m.chat, { text: 'Error al mostrar el menú.' }, { quoted: m });
    }
  },
};

// Comando 'server' para la interacción
module.exports = {
  name: 'video',
  description: 'Muestra información del servidor',
  aliases: [],

  async execute(sock, m, args) {
    try {
      // Verificar si existe una sesión válida
      const session = sessionMap.get(m.sender);
      if (!session || Date.now() - session.menuTimestamp > 5 * 60 * 1000) {
        // Si la sesión ha caducado, informar al usuario
        await sock.sendMessage(m.chat, { text: 'La sesión ha caducado. Por favor, ejecuta el comando "menu" nuevamente.' }, { quoted: m });
        return;
      }

      // Realizar la acción correspondiente al comando 'server'
      await sock.sendMessage(m.chat, { text: 'Información del servidor:\nNombre: Mi Servidor\nUsuarios: 100\nVersión: 1.0' }, { quoted: m });
    } catch (error) {
      console.error(error);
      await sock.sendMessage(m.chat, { text: 'Error al ejecutar el comando "server".' }, { quoted: m });
    }
  },
};
