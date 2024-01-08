const { Api } = require('../../lib/functions')

module.exports = {
    name: 'phrase',
    description: 'Responde mediante chat gpt',
    aliases: ['frases', 'frase'],
    async execute(sock, m, store,) {
        try {
            const data = await Api('frase')
            sock.sendMessage(m.chat, { 
                video: { url: 'https://telegra.ph/file/de8d3365a38f6090aaa89.mp4'},
                gifPlayback: true,
                caption: `ㅤ*⋯⋯  FRASES QUE UN GATO NO DIJO ⋯⋯*
                
➵ ${data.message}

*@zioo*`
            } )
        } catch (e) {
            throw e
        }
    }
}