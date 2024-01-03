require('../../config');
const fs = require('fs');
const path = require('path');
const util = require('util');

const { Json } = require('../lib/functions');
const { client, sms } = require('../lib/simple');

// Almacena los grupos habilitados para welcome y goodbye
const enabledGroups = {
  welcome: [],
  goodbye: [],
};

const saveEnabledGroups = () => {
  fs.writeFileSync(path.join(__dirname, 'enabledGroups.json'), Json(enabledGroups));
};

const loadEnabledGroups = () => {
  const filePath = path.join(__dirname, 'enabledGroups.json');
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  }
  return enabledGroups;
};

// Cargar grupos habilitados al inicio
enabledGroups = loadEnabledGroups();

module.exports = {
  name: 'welcome',
  description: 'Comando para habilitar o deshabilitar mensajes de bienvenida',
  aliases: ['welcometoggle'],

  async execute(sock, m, args) {
    const isOwner = owner.includes(m.sender.split('@')[0]);
    const isStaff = staff.includes(m.sender.split('@')[0]) || isOwner;

    if (!isStaff) {
      await sock.sendMessage(m.chat, { text: 'Solo el staff tiene permiso para usar este comando.' }, { quoted: m });
      return;
    }

    const groupId = m.chat;

    // Verifica si el grupo ya está habilitado o deshabilitado
    const isEnabled = enabledGroups.welcome.includes(groupId);

    if (isEnabled) {
      // Deshabilitar welcome en el grupo
      enabledGroups.welcome = enabledGroups.welcome.filter(g => g !== groupId);
      await sock.sendMessage(m.chat, { text: 'Mensajes de bienvenida deshabilitados en este grupo.' }, { quoted: m });
    } else {
      // Habilitar welcome en el grupo
      enabledGroups.welcome.push(groupId);
      await sock.sendMessage(m.chat, { text: 'Mensajes de bienvenida habilitados en este grupo.' }, { quoted: m });
    }

    // Guardar cambios
    saveEnabledGroups();
  },
};

module.exports.goodbye = {
  name: 'goodbye',
  description: 'Comando para habilitar o deshabilitar mensajes de despedida',
  aliases: ['goodbyetoggle'],

  async execute(sock, m, args) {
    const isOwner = owner.includes(m.sender.split('@')[0]);
    const isStaff = staff.includes(m.sender.split('@')[0]) || isOwner;

    if (!isStaff) {
      await sock.sendMessage(m.chat, { text: 'Solo el staff tiene permiso para usar este comando.' }, { quoted: m });
      return;
    }

    const groupId = m.chat;

    // Verifica si el grupo ya está habilitado o deshabilitado
    const isEnabled = enabledGroups.goodbye.includes(groupId);

    if (isEnabled) {
      // Deshabilitar goodbye en el grupo
      enabledGroups.goodbye = enabledGroups.goodbye.filter(g => g !== groupId);
      await sock.sendMessage(m.chat, { text: 'Mensajes de despedida deshabilitados en este grupo.' }, { quoted: m });
    } else {
      // Habilitar goodbye en el grupo
      enabledGroups.goodbye.push(groupId);
      await sock.sendMessage(m.chat, { text: 'Mensajes de despedida habilitados en este grupo.' }, { quoted: m });
    }

    // Guardar cambios
    saveEnabledGroups();
  },
};

// Evento de actualización de participantes del grupo
sock.ev.on('group-participants.update', async (update) => {
  const groupId = update.id;
  const participants = update.participants;
  const action = update.action;
  const metadata = await sock.groupMetadata(groupId);
  const groupName = metadata.subject;

  // Verificar si el grupo tiene habilitado el welcome o goodbye
  const isWelcomeEnabled = enabledGroups.welcome.includes(groupId);
  const isGoodbyeEnabled = enabledGroups.goodbye.includes(groupId);

  if (groupId === ing || (!isWelcomeEnabled && !isGoodbyeEnabled)) {
    return;
  }

  for (const participant of participants) {
    const user = participant.split('@')[0];

    if (isWelcomeEnabled && action === 'add') {
      // Enviar mensaje de bienvenida
      await sock.sendMessage(groupId, {
        text: `¡Bienvenido, *@${user}⁩*! 🌠\nKaori está emocionado por tenerte en *${groupName}*. Si quieres explorar los comandos de Kaori, usa *.menu* en cualquier momento. ¡Disfruta tu estancia! 🤖`,
        contextInfo: {
          mentionedJid: [participant],
          remoteJid: [groupId],
        },
      });
    } else if (isGoodbyeEnabled && action === 'remove') {
      // Enviar mensaje de despedida
      await sock.sendMessage(groupId, {
        text: `¡Adiós, *@${user}⁩*! 🌠\nLamentamos ver tu partida del grupo ${groupName}. Siempre serás bienvenido/a de regreso si decides volver. ¡Hasta pronto y te deseamos lo mejor!`,
        contextInfo: {
          mentionedJid: [participant],
          remoteJid: [groupId],
        },
      });
    }
  }
});
