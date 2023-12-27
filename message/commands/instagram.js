const { fetchJson } = require('../../lib/utils');

module.exports = {
    name: 'instagram',
    description: 'Descarga videos de Instagram',
    aliases: ['insta', 'ig'],
    
    async execute(sock, m, args) {
        try {
            if (!args[0]) {
                await sock.sendMessage(m.chat, { text: '*Instagram <string>*' }, { quoted: m });
                return;
            }
            
            const instaUrl = args[0];
            const response = await fetchJson(`http://sabapi.tech:8090/api/v2/instagram?url=${instaUrl}&apikey=MrRootsFree`);
            
            function roundTime(time) {
                return Math.round(time);
            }
            
            const responseMs = Date.now();
            const responseTime = roundTime(responseMs - m.messageTimestamp * 1000);
            const messageRoundTime = (responseTime / 1000).toFixed(3);
            
            if (response && response.resultado && response.resultado.length > 0) {
                for (const result of response.resultado) {
                    if (result.type === 'video') {
                        await sock.sendMessage(m.chat, {
                            video: { url: result.url },
                            mimetype: 'video/mp4',
                            caption: `᳃ ¡Listo! - *🧃 ${messageRoundTime} ms*`
                            
                        }, { quoted: m });
                        
                    } else if (result.type === 'image') {
                        await sock.sendMessage(m.chat, {
                            image: { url: result.url, mimetype: 'image/jpeg' },
                            caption: `᳃ ¡Listo! - *🧃 ${messageRoundTime} ms*`
                            
                        }, { quoted: m });
                        
                    }
                    
                }
                await sock.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
                
            }
            
        } catch (e) {
            await sock.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
            console.error(e);
            await sock.sendMessage(m.chat, { text: `${e}` });
        }
    }
}