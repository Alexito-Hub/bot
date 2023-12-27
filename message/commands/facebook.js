const { fetchJson } = require('../../lib/utils')

module.exports = {
    name: 'facebook',
    description: 'Descarga videos de Facebook',
    aliases: ['facebook', 'fb'],
    
    async execute(sock, m, args) {
        try {
            if (!args[0]) {
                v.reply('*facebook <url>*');
                return;
            }
            await sock.sendMessage(m.chat, { react: { text: '🕛', key: m.key } });
            const facebookUrl = args[0];
            const response = await fetchJson(`http://sabapi.tech:8090/download/facebook2?url=${facebookUrl}&apikey=MrRootsFree`);
            const fbdl = await fetchJson(`https://api.lolhuman.xyz/api/facebook?apikey=gataDios&url=${facebookUrl}`)
            if (response && response.resultado) {
                const result = response.resultado;
                if (result.media) {
                    sock.sendMessage(m.chat, {
                        video: { url: result.media.url },
                        mimetype: 'video/mp4',
                        caption: `ㅤ *⋯⋯ FACEBOOK ⋯⋯*
 ∘ *Descripción:* ${result.description}
 ∘ *Calidad:* ${result.media.quality}`
                    }, { quoted: m });
                } 
            } else if(fbdl) {
                const media = fbdl.result[0]
                if (media) {
                    sock.sendMessage(m.chat, { 
                        video: { url: media },
                        mimetype: 'video/mp4',
                        caption: `ㅤ *⋯⋯ FACEBOOK ⋯⋯*
 ∘ *No Info*`
                    })
                } else {
                    sock.sendMessage(m.chat, { 
                        image: { url: media, mimetype: 'image/jpeg' },
                        caption: `ㅤ *⋯⋯ FACEBOOK ⋯⋯*
 ∘ *No info*`
                    })
                }
            }
            await sock.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
            
        } catch (e) {
            await sock.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
            console.error(e);
            await sock.sendMessage(m.chat, { text: `${e}` });
        }
    },
};
