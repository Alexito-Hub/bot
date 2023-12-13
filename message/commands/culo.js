const fs = require('fs').promises;
const path = require('path');

module.exports = {
    name: 'culo',
    description: 'tkm culo',
    aliases: ['katt', 'culito'],
    
    async execute(sock, m, store) {
        try {
            const kattData = await fs.readFile(path.resolve(__dirname, '../../others/katt.json'), 'utf8');
            const katt = JSON.parse(kattData);
            
            const authContact = ['51968374620', '51926996341'];
            
            const auth = authContact.includes(m.sender.split('@')[0]);
            
            const getRandomMessage = () => {
                const randomIndex = Math.floor(Math.random() * katt.length);
                return katt[randomIndex];
            };
            
            if (auth) {
                const randomMessage = getRandomMessage();
                await sock.sendMessage(m.chat, {react:{text:'❤️', key: m.key}})
                await sock.sendMessage(m.chat, { 
                    contextInfo: {
                        remoteJid: m.chat
                    },
                    video: {
                        url: 'https://telegra.ph/file/1e78c8d1f3d7c59c9331a.mp4',
                    },
                    gifPlayback: true,
                    caption: `ㅤ *⋯⋯ MESSAGE ⋯⋯*

 ᳃ ${randomMessage}

*Este comando es único para ti mejor amiga.*`,
                });
            } else {
                await sock.sendMessage(m.chat, { react: { text: '🚧', key: m.key } });
                await sock.sendMessage(m.chat, { text: 'No estás autorizado.' }, { quoted: m });
            }
        } catch (error) {
            console.error('Error:', error);
            await sock.sendMessage(m.chat, { text: 'Error al ejecutar el comando.' }, { quoted: m });
        }
    },
};
