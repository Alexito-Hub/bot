const axios = require('axios');

module.exports = {
    name: 'ytmp4',
    description: 'Obtener información y enviar el video de YouTube en formato mp4.',
    aliases: ['ytdl'],

    async execute(sock, m, args) {
        try {
            v.reply('Youtube no disponible 🍥')
            /* if (!args[0]) {
                return sock.sendMessage(m.chat, { text: 'Por favor, proporciona una URL de YouTube.' });
            }

            const videoUrl = args[0];
            const info = await getYoutubeInfo(videoUrl);

            if (info && info.result && info.result.videoUrl) {
                const videoInfo = {
                    title: info.result.title,
                    author: info.result.author.name,
                    lengthSeconds: info.result.length,
                    views: info.result.views,
                };

                const videoCaption = formatVideoInfo(videoInfo);
                await sock.sendMessage(m.chat, { video: { url: info.result.videoUrl }, mimetype: 'video/mp4', caption: { text: videoCaption } }, { quoted: m });
            } else {
                sock.sendMessage(m.chat, { text: 'No se pudo obtener información del video.' });
            } */
        } catch (error) {
            console.error('Error en el comando ytmp4:', error);
            sock.sendMessage(m.chat, { text: 'Se produjo un error al ejecutar el comando ytmp4.' });
        }
    },
};

async function getYoutubeInfo(videoUrl) {
    try {
        const apiUrl = `https://star-apis.teamfx.repl.co/api/downloader/ytplay?url=${encodeURIComponent(videoUrl)}&apikey=TeamFX`;
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error('Error al obtener información de YouTube:', error);
        return null;
    }
}

function formatVideoInfo(videoInfo) {
    return `*${videoInfo.title}*\n\nAutor: ${videoInfo.author}\nDuración: ${formatDuration(videoInfo.lengthSeconds)}\nVistas: ${videoInfo.views}`;
}

function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}


/*const ytdl = require('ytdl-core')

const info = await ytdl.getInfo('https://youtu.be/U29h5Ocgj30?si=0hiFmk69O56eeISy')
const videoInfo = {
                title: info.videoDetails.title,
                author: info.videoDetails.author.name,
                lengthSeconds: info.videoDetails.lengthSeconds,
                views: info.videoDetails.viewCount,
            };
const url = 'https://www.youtube.com/watch?v=' + info.videoDetails.videoId
const apiUrl = `https://star-apis.teamfx.repl.co/api/downloader/ytplay?url=${url}&apikey=StarAPI`;

function formatVideoInfo(videoInfo) {
    return `*${videoInfo.title}*\n\nAutor: ${videoInfo.author}\nDuración: ${formatDuration(videoInfo.lengthSeconds)}\nVistas: ${videoInfo.views}`;
}
function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

sock.sendMessage(m.chat, {video: {url:apiUrl}, mimetype:'video/mp4', caption:formatVideoInfo(videoInfo)})*/