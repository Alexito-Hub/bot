const axios = require('axios');
const { fetchJson } = require('../../lib/utils');

module.exports = {
    name: "Perfil",
    description: "Obten información de usuario",
    aliases: ["profile", "perfil"],
    
    async execute(sock, m, args, store) {
        try {
            let user;
            
            if (m.sender) {
                user = m.sender.split(`@`)[0]
            } else if (args.length > 0) {
                user = args[0].replace('@', '').replace(/\s/g, '').split('@')[0];
            } else if (m.quoted) {
                user = m.quoted.sender.split(`@`)[0]
            } else {
                sock.sendMessage(m.chat, { text: '*Profile <@usuario>*' }, { quoted: m });
                return;
            }
            
            const profile = await fetchJson(`https://api-zio.replit.app/api/users/${user}?key=ZioAPI`)
            const dataUser = profile.result
            
            if (profile.status === 404) {
                sock.sendMessage(m.chat, { text: 'Usuario no registrado' }, { quoted: m });
                return;
            }
            
            try {
                ppuser = await sock.profilePictureUrl(`${sender.split('@')[0]}@c.us`, 'image')
                
            } catch {
                ppuser = 'https://imguh.com/images/2023/11/05/Blue-Modern-Futuristic-Artificial-Intelligence-TikTok-Story_20231105_090013_0000b5ccc9d014fdd421.jpg'
                
            }
            buffer = await getBuffer(ppuser)
            
            const profilePic = await sock.getProfilePicture(user);

            sock.sendMessage(m.chat, { 
                image: {url: buffer},
                mimetype: 'image/jpeg',
                caption: `ㅤㅤ *⋯⋯ PROFILE ⋯⋯*

 *➭ Numero:* ${user}
 
 *➭ Nombre:* ${dataUser.name}
 *➭ Edad:* ${dataUser.age}
 *➭ Genero:* ${dataUser.gender}
 
 *➭ Premium* ${dataUser.premium ? '✔' : '✘'}
 
 *➭ Advertencias* ${dataUser.warning}
 *➭ Limites:* ${dataUser.limit}
 
 *➭ Foto de Perfil:*
`
            }, { quoted: m })
        } catch (e) {
            throw e
        }
    }
}
