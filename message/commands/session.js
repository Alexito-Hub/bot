const storage = require('node-persist');

// Configuración del almacenamiento temporal
storage.init();

module.exports = {
  name: 'menu',
  description: 'Muestra un menú interactivo',
  aliases: [],

  async execute(sock, m, args) {
    try {
      // Verifica si el usuario tiene una sesión activa
      const userSession = storage.getItemSync(m.sender);
      if (userSession && userSession.expires > Date.now()) {
        // Si hay una sesión activa, ejecutar la acción correspondiente
        if (userSession.action === 'server') {
          await sock.sendMessage(m.chat, { text: '¡Acción de servidor ejecutada!' }, { quoted: m });
        } else {
          await sock.sendMessage(m.chat, { text: 'Opción no válida.' }, { quoted: m });
        }
      } else {
        // Si no hay una sesión activa, mostrar las opciones
        await sock.sendMessage(m.chat, {
          text: 'Menú interactivo:\n1. link\n2. server\n\nResponde con el número de la opción que deseas ejecutar.',
        }, { quoted: m });

        // Almacena la sesión del usuario
        storage.setItemSync(m.sender, {
          expires: Date.now() + 300000, // 5 minutos
          action: 'menu',
        });
      }
    } catch (error) {
      console.error(error);
      await sock.sendMessage(m.chat, { text: 'Error al procesar el comando.' }, { quoted: m });
    }
  },
};
