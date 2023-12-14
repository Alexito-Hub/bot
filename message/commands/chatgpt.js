const { fetchJson } = require('../../lib/utils')

module.exports = {
    name: 'chatgpt',
    description: 'Responde mediante chat gpt',
    aliases: ['ia', 'ai', 'chat', 'kaori'],
    async execute(sock, m, args, fgclink, store) {
        try {
            

            const message = args.join(' ')
            if (!message) {
                v.reply(`*kaori <string>*`)
                return
            }
            
            const key = await fetchJson(`https://minijulscito-api.onrender.com/api3/chatgp?texto=${message}&apikey=Juls123`)
            
            if (key) {
                sock.sendMessage(m.chat, {text: key.result}, {quoted:fgclink})
            } else {
                v.reply(`Hubo un problema, intentalo de nuevo`)
            }
        } catch (e) {
            console.log(e)
            v.reply(e)
        }
    }
}