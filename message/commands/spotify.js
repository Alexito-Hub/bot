const { fetchJson } = require('../../lib/utils');

module.exports = {
    name: 'spotify',
    description: 'Descarga musicas de Spotify',
    aliases: ['spotify'],
    async execute(sock, m, args) {
        try {
            if (!args[0]) {
                await sock.sendMessage(m.chat, { text: '*spotify <string>*' }, { quoted: m });
                return;
            }
            await sock.sendMessage(m.chat, { react: { text: '🕛', key: m.key } })
            
            const text = args.join(" ")
            
            const searchSpotify = await fetchJson(`http://sabapi.tech:8090/api/spotifysearch?query=${text}&apikey=MrRootsFree`)
            const spotify = await fetchJson(`http://sabapi.tech:8090/api/dl/spotify2?query=${text}&apikey=MrRootsFree`);
            
            const imgSpotify = searchSpotify.resultado.tracksArray[0]
            if (spotify && spotify.resultado && spotify.resultado.dl_link) {
                await sock.sendMessage(m.chat, { image:{ 
                    url: imgSpotify.thumb, mimetype: 'image/jpeg'},
                    caption: `ㅤ *⋯⋯ SPOTIFY ⋯⋯*
 ∘ *Nombre:* ${spotify.resultado.trackName}
 ∘ *Albun:* ${spotify.resultado.albumName}
 ∘ *Artista:* ${spotify.resultado.artists[0].name}
 ∘ *Duración:* ${spotify.resultado.duration}
 ∘ *Popularidad:* ${spotify.resultado.popularity}
 ∘ *Fecha:* ${spotify.resultado.release_data}`
                }, {quoted: m})
                await sock.sendMessage(m.chat, { audio: { 
                    url: spotify.resultado.dl_link }, 
                    mimetype: 'audio/mpeg', 
                    contextInfo:{
                        externalAdReply:{
                            title:`${spotify.resultado.trackName}`,
                            body: `${spotify.resultado.artists[0].name}`,
                            thumbnailUrl: imgSpotify.thumb,
                            sourceUrl: imgSpotify.url
                        }
                    }})
                await sock.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
            }
            
        } catch (e) {
            await sock.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
        }

    }
}