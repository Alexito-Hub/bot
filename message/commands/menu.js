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
                video:{url:'https://v16m-default.akamaized.net/aa3667fbfc34f2a1e74e968658072916/658cbc27/video/tos/alisg/tos-alisg-pve-0037/oYJe8JEIQDALhcEf16FgJO6m6OhjuEAFDCergw/?a=0&ch=0&cr=0&dr=0&lr=all&cd=0%7C0%7C0%7C0&cv=1&br=4620&bt=2310&bti=OHYpOTY0Zik3OjlmOm01MzE6ZDQ0MDo%3D&cs=0&ds=3&ft=pK~tdMZj8Zmo0n~fH94jVk_Zr5WrKsd.&mime_type=video_mp4&qs=0&rc=Zmg0aWc8NWRpZThmOTo5OEBpang6aHI5cnJ4cDMzODgzNEBfNTEtY18tXzQxMzUwMGMwYSNiM2ouMmRjZDFgLS1kLy1zcw%3D%3D&l=202312271806436C41DE3D4CDB0E718430&btag=e00088000'},
                gifPlayback: true,
                caption: `    ${greeting} *@${user} 🍥*
᳃ *"${dailyMessage}"*

  *∘ Prefijo:* ${prefixList} 
  *∘ Modo:* Público
  *∘ Actividad:* ${days > 0 ? `${days}d ` : ''}${hours}h ${minutes}m ${seconds}s
  *∘ Creator:* ziooo_zip

Para obtener información de algún comando usa "Help <command>"

 *• ⋯⋯ UTILITY ⋯⋯ •*
 ➵ calculadora
 
 *• ⋯⋯ DOWNLOADS ⋯⋯ •*
 ➵ tiktok *<url>*
 ➵ facebook *<url>* 
 ➵ instagram *<url>*
 ➵ play *<tring>*
 ➵ ytmp3 *<url>*
 ➵ spotify *<string>*

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

Obten información basica del bot con !info

*todos los derechos reservados @ziooo*`
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
