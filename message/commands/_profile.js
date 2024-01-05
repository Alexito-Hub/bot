const axios = require('axios');
const { fetchJson } = require('../../lib/utils');

module.exports = {
    name: "Perfil",
    description: "Obtener información de usuario",
    aliases: ["profile", "perfil"],
    
    async execute(sock, m, args, store) {
        try {
            const user = args.length > 0
                ? args[0].replace('@', '').replace(/\s/g, '').split('@')[0]
                : m.quoted
                    ? m.quoted.sender.split('@')[0]
                    : m.sender.split('@')[0];

            const profile = await fetchJson(`https://api-zio.replit.app/data/users/${user}?key=ZioAPI`);

            if (!profile.status === 404) {
                sock.sendMessage(m.chat, { text: '❌ Usuario no registrado o no se encuentra en la base de datos.' }, { quoted: m });
                return;
            }

            const dataUser = profile.result.user;
            const ppuser = await sock.profilePictureUrl(`${user}@c.us`, 'image');

            sock.sendMessage(m.chat, { 
                image: {url: ppuser},
                mimetype: 'image/jpeg',
                caption: `ㅤㅤ *⋯⋯ PROFILE ⋯⋯*

 *➭ Nombre:* ${dataUser.name}
 *➭ Edad:* ${dataUser.age}
 *➭ Género:* ${dataUser.gender}
 
 *➭ Premium* ${dataUser.premium ? '✔' : '✘'}
 
 *➭ Advertencias* ${dataUser.warning}
 *➭ Límites:* ${dataUser.limit}

@zioo`
            }, { quoted: m });
        } catch (error) {
            console.error('Error al obtener el perfil:', error);
            sock.sendMessage(m.chat, { text: '❌ Usuario no registrado o no se encuentra en la base de datos.' }, { quoted: m });
        }
    }
};
