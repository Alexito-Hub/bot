const { fetchJson } = require('../../lib/utils');

module.exports = {
    name: 'tragamonedas',
    description: 'Juega al tragamonedas',
    aliases: ['slots'],

    async execute(sock, m) {
        try {
            
            async function sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }
            const data = await fetchJson('https://iam-zio.replit.app/api/slots?key=zio');
            const result = data.game.message;
            
            function Win() {
                if (result.includes('Ganaste')) {
                    return `╰──❲⋅ᐧ⋅ *𝚆𝙸𝙽* ⋅⋅❳──╯\n\n*◯─❲ 𝙶𝙰𝙽𝙰𝚂𝚃𝙴 ❳─◯*`;
                } else if (result.includes('Perdiste')) {
                    return `*╰──❲⋅𝙻𝙾𝚂𝙴𝚁ᐧ❳──╯*\n\n*◯─❲ 𝙿𝙴𝚁𝙳𝙸𝚂𝚃𝙴 ❳─◯*`;
                }
            }
            
            async function slotsRun() {
                let { key } = await sock.sendMessage(m.chat, { text: `ㅤ *⋯⋯ TRAGAMONEDAS ⋯⋯*\n\n◯──❲ Iniciando... ❳\n\n*ᴀᴘɪ@ᴢɪᴏᴏ*` });
                await sleep(2000);
                var slots = [
                    `*◯─❲ 𝚃𝚁𝙰𝙶𝙰𝙼𝙾𝙽𝙴𝙳𝙰𝚂 ❳─◯*

╭──❲ *ᐧᴋᴀᴏʀɪᐧ* ❳──╮
│🍇│🍋│🍒│  ◯
*│🍓│🍏│🍑├─╯*
│🍋│🍇│🍓│
╰──❲ *𝙹𝚄𝙴𝙶𝙰* ❳──╯

*◯─❲ 𝙰𝙿𝚄𝙴𝚂𝚃𝙰 ❳─◯*
➤ *100*

*ᴀᴘɪ©ᴢɪᴏ*`,
                    `*◯─❲ 𝚃𝚁𝙰𝙶𝙰𝙼𝙾𝙽𝙴𝙳𝙰𝚂 ❳─◯*

╭──❲ *ᐧᴋᴀᴏʀɪᐧ* ❳──╮
│🍇│🍋│🍒│
*│🍇│🍋│🍒├─╮*
│🍋│🍇│🍓│  ◯
╰─❲ *𝙻𝙾𝙰𝙳𝙸𝙽𝙶* ❳─╯

*◯─❲ 𝙰𝚙𝚄𝙴𝚂𝚃𝙰 ❳─◯*
➤ *100*

*ᴀᴘɪ©ᴢɪᴏ*`,
                    `*◯─❲ 𝚃𝚁𝙰𝙶𝙰𝙼𝙾𝙽𝙴𝙳𝙰𝚂 ❳─◯*

╭──❲ *ᐧᴋᴀᴏʀɪᐧ* ❳──╮
│🍇│🍋│🍒│
*│🍑│🍊│🍏├─╮*
│🍋│🍇│🍓│  ◯
╰─❲ *𝙻𝙾𝙰𝙳𝙸𝙽𝙶* ❳─╯

*◯─❲ 𝙰𝚙𝚄𝙴𝚂𝚃𝙰 ❳─◯*
➤ *100*

*ᴀᴘɪ©ᴢɪᴏ*`,
                    `*◯─❲ 𝚃𝚁𝙰𝙶𝙰𝙼𝙾𝙽𝙴𝙳𝙰𝚂 ❳─◯*

╭──❲ *ᐧᴋᴀᴏʀɪᐧ* ❳──╮
│🍇│🍋│🍒│
*│🍊│🍇│🍓├─╮*
│🍋│🍇│🍓│  ◯
╰─❲ *𝙻𝙾𝙰𝙳𝙸𝙽𝙶* ❳─╯

*◯─❲ 𝙰𝚙𝚄𝙴𝚂𝚃𝙰 ❳─◯*
➤ *100*

*ᴀᴘɪ©ᴢɪᴏ*`,
                    `*◯─❲ 𝚃𝚁𝙰𝙶𝙰𝙼𝙾𝙽𝙴𝙳𝙰𝚂 ❳─◯*

╭──❲ *ᐧᴋᴀᴏʀɪᐧ* ❳──╮
│🍇│🍋│🍒│
*│🍋│🍋│🍏├─╮*
│🍋│🍇│🍓│  ◯
╰─❲ *𝙻𝙾𝙰𝙳𝙸𝙽𝙶* ❳─╯

*◯─❲ 𝙰𝚙𝚄𝙴𝚂𝚃𝙰 ❳─◯*
➤ *100*

*ᴀᴘɪ©ᴢɪᴏ*`,
                    `*◯─❲ 𝚃𝚁𝙰𝙶𝙰𝙼𝙾𝙽𝙴𝙳𝙰𝚂 ❳─◯*

╭──❲ *ᐧᴋᴀᴏʀɪᐧ* ❳──╮
│🍇│🍋│🍒│  ◯
*│${data.game.casino[0]}│${data.game.casino[1]}│${data.game.casino[2]}├─╯*
│🍋│🍇│🍓│
${Win()}
➤ *${data.game.coins}*

*ᴀᴘɪ©ᴢɪᴏ*`
                ];
                for (let i = 0; i < slots.length; i++) {
                    await sock.sendMessage(m.chat, {text: slots[i], edit: key});
                    await sleep(1000)
                }
            }
            
            await slotsRun();

        } catch (error) {
            console.error(error);
            await sock.sendMessage(m.chat, { text: 'Error al procesar el comando.' }, { quoted: m });
        }
    },
};
