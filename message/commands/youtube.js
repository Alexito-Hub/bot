const { fetchJson } = require('../../lib/utils')

module.exports = {
    name: 'youtube',
    description: 'Busqueda de youtube',
    aliases: ['yt'],
    
    async execute(sock, m, args) {
        try {
            if (!args[0]) {
                sock.sendMessage(m.chat, { text: '*youtube <string>*' }, { quoted: m });
                return;
            }
            
            const data = await fetchJson(``)
        } catch (error) {
            console.error('Error:', error);
            sock.sendMessage(m.chat, { text: 'Error al ejecutar el comando' }, { quoted: m });
        }
    },
};
