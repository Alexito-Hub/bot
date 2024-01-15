const { NodeVM } = require('vm2');

module.exports = {
    name: 'pseudocode',
    description: 'Ejecutar pseudocódigo',
    aliases: ['ps', '&'],

    async execute(sock, m, args) {
        try {
            if (!args[0]) {
                await sock.sendMessage(m.chat, { text: '*& <código>*' }, { quoted: m });
                return;
            }

            const pseudocode = args.join(' ');


            const vm = new NodeVM({
                sandbox: {},
                console: 'redirect',
                require: {
                    external: true,
                },
            });

            const result = vm.run(pseudocode);

            await sock.sendMessage(m.chat, { text: `${result}` }, { quoted: m });
        } catch (error) {
            console.error(error);
            await sock.sendMessage(m.chat, { text: 'Error' }, { quoted: m });
        }
    },
};
