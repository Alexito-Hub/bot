const axios = require('axios');
const { fetchJson } = require('../../lib/utils');

module.exports = {
    name: "Perfil",
    description: "Obtener información de usuario",
    aliases: ["profile", "perfil"],
    
    async execute(sock, m, args, store) {
        try {
            let user;
            
            if (args.length > 0) {
                user = args[0].replace('@', '').replace(/\s/g, '').split('@')[0];
            } else if (m.quoted) {
                user = m.quoted.sender.split('@')[0];
            } else if (m.sender) {
                user = m.sender.split('@')[0];
            } else {
                v.reply('Error ------------')
            }
            
            const profile = await fetchJson(`https://api-zio.replit.app/api/users/${user}?key=ZioAPI`);
            const dataUser = profile.result.user
            
            if (profile.status === 404) {
                sock.sendMessage(m.chat, { text: 'Usuario no registrado' }, { quoted: m });
                return;
            }
            const ppuser = await sock.profilePictureUrl(`${user}@c.us`, 'image');
            sock.sendMessage(m.chat, { 
                image: {url: ppuser},
                mimetype: 'image/jpeg',
                caption: `ㅤㅤ *⋯⋯ PROFILE ⋯⋯*

 *➭ Numero:* ${user}
 *➭ Nombre:* ${dataUser.name}
 *➭ Edad:* ${dataUser.age}
 *➭ Genero:* ${dataUser.gender}
 
 *➭ Premium* ${dataUser.premium ? '✔' : '✘'}
 
 *➭ Advertencias* ${dataUser.warning}
 *➭ Limites:* ${dataUser.limit}

@zioo`
            }, { quoted: m });
        } catch (e) {
            throw e
        }
    }
};
