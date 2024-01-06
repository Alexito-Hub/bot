const storage = require('node-persist');

// Configuración del almacenamiento temporal
storage.init();

module.exports = {
  name: 'ytplay',
  description: 'Muestra un menú interactivo',
  aliases: [],

  async execute(sock, m, args) {
    try {
      // Verifica si el usuario tiene una sesión activa
      const userSession = storage.getItem(m.sender);
      if (userSession && userSession.expires > Date.now()) {
        // Si hay una sesión activa, ejecutar la acción correspondiente
        if (userSession.action === 'video') {
          await sock.sendMessage(m.chat, { text: '¡Acción de servidor ejecutada!' }, { quoted: m });
        } else {
          await sock.sendMessage(m.chat, { text: 'Opción no válida.' }, { quoted: m });
        }
      } else {
        // Si no hay una sesión activa, mostrar las opciones
        await sock.sendMessage(m.chat, {
          text: 'ytplay interactivo:\n1. video\n2. audio\n\nResponde con el número de la opción que deseas ejecutar.',
        }, { quoted: m });

        // Almacena la sesión del usuario
        storage.setItem(m.sender, {
          expires: Date.now() + 300000, // 5 minutos
          action: 'ytplay',
        });
      }
    } catch (error) {
      console.error(error);
      await sock.sendMessage(m.chat, { text: 'Error al procesar el comando.' }, { quoted: m });
    }
  },
};
