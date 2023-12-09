const ytdl = require('ytdl-core')

module.exports = {
    name: 'youtube',
    description: 'Descarga un video de YouTube',
    aliases: ['yt', 'download'],

    async execute(sock, m, args) {
        if (args.length !== 1) {
            v.reply('*youtube <url>*');
            return;
        }

        const youtubeUrl = args[0];
        downloadYoutubeVideo(sock, m, youtubeUrl);
    }
};

const downloadYoutubeVideo = async (sock, m, url) => {
    try {
        const info = await ytdl.getInfo(url);
        const format = ytdl.chooseFormat(info.formats, { quality: '136' });
        sock.sendMessage(m.chat, {react: {text: '🕛',key: m.key,}})
        if (format) {
            sock.sendMessage(m.chat, { video: { url: format.url }, mimetype: 'video/mp4', caption: 'Video descargado de YouTube' }, { quoted: m });
        } else {
            v.reply('Formato de video no válido.');
        }
    } catch (error) {
        console.error('Error al obtener información de YouTube:', error);
        v.reply('Error al obtener información de YouTube.');
    }
};
