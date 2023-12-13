const kattData = fs.readFileSync('../../others/katt.json', 'utf8')
const katt = JSON.parse(kattData)


module.exports = {
    name: 'culo',
    description: 'tkm culo',
    aliases: ['katt', 'culito'],
    async execute(sock, m, store) {
        
        const authContact = ['51968374620', '51926996341']
        
        const auth = authContact.includes(m.sender)
        const getRandomMessage = () => {
            const randomIndex = Math.floor(Math.random() * katt.length)
            return katt[randomIndex]
        }
        
        if (auth) {
            const randomMessage = getRandomMessage()
            sock.sendMessage(m.chat, {
                video: {
                    url: 'https://telegra.ph/file/8faa454e3742f783186fe.jpg'
                },
                gifPlayback: true,
                caption: `ㅤ *⋯⋯ MESSAGE ⋯⋯*

${randomMessage}

Este comando es unico para ti mejor amiga.`
            })
        } else {
            sock.sendMessage(m.chat, { react: { text:'🚧', key: v.key}})
            await client.sendMessage(m.chat, { text: 'No estás autorizado para utilizar este comando.' }, {quoted: m})
        }
    }
}