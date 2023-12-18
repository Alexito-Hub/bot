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
            
            const key = await fetchJson(`https://star-apis.teamfx.repl.co/api/others/chatgpt?query=${message}&apikey=StarAPI`)
            
            if (key) {
                sock.sendMessage(m.chat, {text: key.message}, {quoted:m})
            } else {
                v.reply(key)
            }
        } catch (e) {
            console.log(e)
            v.reply(e)
        }
    }
}