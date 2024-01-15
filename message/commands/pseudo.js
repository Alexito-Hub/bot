const util = require('util');
const vm = require('vm');

module.exports = {
    name: 'pseudocode',
    description: 'Ejecutar pseudocódigo',
    aliases: ['&'],

    async execute(sock, m, args, sleep) {
        try {
            if (!args[0]) {
                await sock.sendMessage(m.chat, { text: '*& <código>*' }, { quoted: m });
                return;
            }

            const pseudocode = args.join(' ');

            const sandbox = {
                console: {
                    log: (...args) => {
                        sock.sendMessage(m.chat, { text: args.map(arg => util.inspect(arg)).join(' ') }, { quoted: m });
                    },
                },
            };


            vm.createContext(sandbox);
            vm.runInContext(pseudocode, sandbox);
            
            sleep(500)
            await sock.sendMessage(m.chat, { text: '<process complete>' }, { quoted: m });
        } catch (error) {
            console.error(error);
            await sock.sendMessage(m.chat, { text: 'Error' }, { quoted: m });
        }
    },
};
