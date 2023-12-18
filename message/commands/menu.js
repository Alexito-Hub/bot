const moment = require('moment-timezone');

const getGreeting = () => {
    const currentHour = moment().tz('America/Lima').format('H');
    let greeting, dailyMessage;

    if (currentHour >= 5 && currentHour < 12) {
        greeting = '¡Buenos días!';
        dailyMessage = 'Es un nuevo día para alcanzar tus metas. ¡Vamos!';
    } else if (currentHour >= 12 && currentHour < 18) {
        greeting = '¡Buenas tardes!';
        dailyMessage = 'La tarde es perfecta para seguir progresando. ¡No te detengas!';
    } else if (currentHour >= 18 && currentHour < 24) {
        greeting = '¡Buenas noches!';
        dailyMessage = 'Descansa y recarga energías para un nuevo día de logros.';
    } else {
        greeting = '¡Buenas madrugadas!';
        dailyMessage = 'Aunque sea temprano, cada hora cuenta. ¡Sigue adelante!';
    }

    return { greeting, dailyMessage, time: moment().tz('America/Lima').format('h:mm A') };
};

module.exports = {
    name: 'menu',
    description: 'Muestra un menú de comandos',
    aliases: ['menu', 'commands'],

    async execute(sock, m) {
        try {
            const user = m.sender.split('@')[0];
            const prefixList = global.prefix.map(p => `[ ${p} ]`).join(' ');

            const uptimeSeconds = Math.floor(process.uptime());
            const days = Math.floor(uptimeSeconds / (24 * 60 * 60));
            const hours = Math.floor((uptimeSeconds % (24 * 60 * 60)) / (60 * 60));
            const minutes = Math.floor((uptimeSeconds % (60 * 60)) / 60);
            const seconds = uptimeSeconds % 60;

            const { greeting, dailyMessage, time } = getGreeting();
            
            await sock.sendMessage(m.chat, {
                contextInfo: {
                    remoteJid: m.chat,
                    mentionedJid: [m.sender]
                },
                video:{url:'https://telegra.ph/file/8615e70dd92328db2395b.mp4'},
                gifPlayback: true,
                caption: `    ${greeting} *@${user} 🍥*
᳃ *"${dailyMessage}"*

  *∘ Prefijo:* ${prefixList} 
  *∘ Modo:* Público
  *∘ Actividad:* ${days > 0 ? `${days}d ` : ''}${hours}h ${minutes}m ${seconds}s
  *∘ Creator:* ziooo_zip

Para obtener información de algún comando usa "Help <command>"

 *• ⋯⋯ UTILITY ⋯⋯ •*
 ➵ calculadora *<number + number>*
 
 *• ⋯⋯ SEARCH ⋯⋯•*
 ➵ play *<search>* ?unstable
 ➵ spotify *<search>* --no disponible
 
 *• ⋯⋯ DOWNLOADS ⋯⋯ •*
 ➵ tiktok *<url>*
 ➵ facebook *<url>* ?unstable
 ➵ youtube *<url>* ?unstable

 *• ⋯⋯ OWNER ⋯⋯ •*
 ➵ remove *<user>*
 ➵ hidetag *<string>
 ➵ tag *<string>*
 
 *• ⋯⋯ DEV ⋯⋯ •*
 ➵ run
 ➵ test
 ➵ ping
 ➵ $ 
 ➵ >
 ➵ <
 
 ➵ term --terminos y uso del bot

Obten información basica del bot con !info

*todos los derechos reservados @ziooo api@felix*`
            })
            await sock.sendMessage(m.chat, {
                text,
                contextInfo: {
                    remoteJid:m.chat,
                    mentionedJid: [m.sender],
                    externalAdReply: {
                        title: `Hora: ${time}`,
                        sourceUrl: `https://whatsapp.com/channel/0029VaBQgoGLdQehR6vmiY42`,
                        renderLargerThumbnail: false,
                        mediaType: 1,
                        thumbnailUrl: 'https://telegra.ph/file/ae78c6675b0f413a5c635.jpg'
                    }
                }
            });
        } catch (error) {
            console.error('Error en la ejecución del comando menu:', error);
        }
    }
};
