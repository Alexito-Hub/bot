const ytdl = require('ytdl-core');

module.exports = {
    name: 'ytmp4',
    description: 'Descargar un video de YouTube en formato mp4.',
    aliases: ['mp4'],

    async execute(sock, m, args) {
        try {
            if (!args[0]) {
                return v.reply('Por favor, proporciona una URL de YouTube.');
            }

            const videoUrl = args[0];
            const info = await ytdl.getInfo(videoUrl);

            const videoInfo = {
                title: info.videoDetails.title,
                author: info.videoDetails.author.name,
                lengthSeconds: info.videoDetails.lengthSeconds,
                views: info.videoDetails.viewCount,
                url: videoUrl,
            };

            const videoStream = ytdl(videoUrl, { quality: 'highestvideo' });

            await sock.sendMessage(m.chat, { video: videoStream, mimetype: 'video/mp4', caption: formatVideoInfo(videoInfo) }, { quoted: m });
        } catch (error) {
            console.error('Error en el comando ytmp4:', error);
            v.reply('Se produjo un error al ejecutar el comando ytmp4.');
        }
    },
};

function formatVideoInfo(videoInfo) {
    return `*${videoInfo.title}*\n\nAutor: ${videoInfo.author}\nDuración: ${formatDuration(videoInfo.lengthSeconds)}\nVistas: ${videoInfo.views}\nURL: ${videoInfo.url}`;
}

function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}
