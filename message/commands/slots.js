const { fetchJson } = require('../../lib/utils');

module.exports = {
    name: 'tragamonedas',
    description: 'Juega al tragamonedas',
    aliases: ['slots'],

    async execute(sock, m) {
        try {
            const data = await fetchJson('https://iam-zio.replit.app/api/slots?key=zio');
            const result = data.game.message;
            let wined, loser;

            function Win() {
                if (result.includes('Ganaste')) {
                    wined = `╰──❲⋅ᐧ⋅ *𝚆𝙸𝙽* ⋅⋅❳──╯\n\n*◯─❲ 𝙶𝙰𝙽𝙰𝚂𝚃𝙴 ❳─◯*`;
                } else if (result.includes('Perdiste')) {
                    loser = `*╰──❲⋅𝙻𝙾𝚂𝙴𝚁ᐧ❳──╯*\n\n*◯─❲ 𝙿𝙴𝚁𝙳𝙸𝚂𝚃𝙴 ❳─◯*`;
                }
            }

            async function slotsRun() {
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
*│${data.game.result[0]}│${data.game.result[1]}│${data.game.result[2]}├─╯*
│🍋│🍇│🍓│
${Win()}
➤ *${data.game.coins}*

*ᴀᴘɪ©ᴢɪᴏ*`
                ];
                let { key } = await sock.sendMessage(m.chat, {text: `ㅤ *⋯⋯ TRAGAMONEDAS ⋯⋯*

◯──❲ Iniciando... ❳

*ᴀᴘɪ@ᴢɪᴏᴏ*`});
                for (let i = 0; i < slots.length; i++) {
                    await sock.sendMessage(m.chat, {text: slots[i], edit: key});
                }
            }
            
            await slotsRun();

        } catch (error) {
            console.error(error);
            await sock.sendMessage(m.chat, { text: 'Error al procesar el comando.' }, { quoted: m });
        }
    },
};
