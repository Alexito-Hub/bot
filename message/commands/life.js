const { Api } = require('../../lib/functions')

module.exports = {
    name: 'life',
    description: 'Responde mediante chat gpt',
    aliases: ['consejo de vida', 'vida'],
    async execute(sock, m, store,) {
        try {
            const data = await Api('life')
            sock.sendMessage(m.chat, { 
                video: { url: 'https://telegra.ph/file/de8d3365a38f6090aaa89.mp4'},
                gifPlayback: true,
                caption: `ㅤ*⋯⋯  CONSEJO DE VIDA ⋯⋯*
                
➵ ${data.message}

*@zioo*`
            } )
        } catch (e) {
            throw e
        }
    }
}