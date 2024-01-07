const fs = require('fs');
const { createReadStream } = require('fs');
const { MessageType } = require('@whiskeysockets/baileys');

module.exports = {
    name: 'sticker',
    description: 'Convierte una imagen en sticker',
    aliases: ['stickerize'],

    async execute(sock, m) {
        try {
            if (m.quoted && m.quoted.type === MessageType.image) {
                const mediaData = await sock.downloadMediaMessage(m.quoted);
                const stream = createReadStream(mediaData);
                const sticker = await sock.sendImageAsSticker(m.chat, stream);

                if (sticker) {
                    await sock.sendMessage(m.chat, { text: 'Sticker creado correctamente.' }, { quoted: m });
                } else {
                    await sock.sendMessage(m.chat, { text: 'Error al crear el sticker.' }, { quoted: m });
                }
            } else {
                await sock.sendMessage(m.chat, { text: 'Cita un mensaje de imagen para crear el sticker.' }, { quoted: m });
            }
        } catch (error) {
            console.error(error);
            await sock.sendMessage(m.chat, { text: 'Error al procesar el comando.' }, { quoted: m });
        }
    },
};
