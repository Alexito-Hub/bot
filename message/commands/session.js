const uuid = require('node-uuid');

class SessionManager {
  constructor() {
    this.sessions = new Map();
  }

  createSession(userId, sessionId) {
    this.sessions.set(userId, sessionId);
  }

  deleteSession(userId) {
    this.sessions.delete(userId);
  }

  hasSession(userId) {
    return this.sessions.has(userId);
  }
}

module.exports = SessionManager;


module.exports = {
  name: 'menu2',
  description: 'Muestra opciones de menú',

  async execute(sock, m, args) {
    try {
      // Verifica si ya hay una sesión en curso para este usuario
      if (sessionManager.hasSession(m.sender)) {
        await sock.sendMessage(m.chat, { text: 'Ya tienes una sesión en curso. Por favor, termina esa sesión antes de iniciar una nueva.' }, { quoted: m });
        return;
      }

      // Genera un ID único para la sesión
      const sessionId = uuid.v4();

      // Almacena la sesión en la gestión de sesiones
      sessionManager.createSession(m.sender, sessionId);

      // Envia las opciones de menú
      await sock.sendMessage(m.chat, { text: 'Elige una opción:\n1. Link\n2. Server' }, { quoted: m });

      // Establece un temporizador para expirar la sesión después de 5 minutos
      const sessionTimeout = 5 * 60 * 1000; // 5 minutos en milisegundos
      setTimeout(() => {
        // Elimina la sesión cuando expire
        sessionManager.deleteSession(m.sender);
        // Envía un mensaje indicando que la sesión ha caducado
        sock.sendMessage(m.chat, { text: 'La sesión ha caducado.' }, { quoted: m });
      }, sessionTimeout);
    } catch (error) {
      console.error(error);
      await sock.sendMessage(m.chat, { text: 'Error al iniciar la sesión.' }, { quoted: m });
    }
  },
};

