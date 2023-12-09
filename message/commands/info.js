const os = require('os');

module.exports = {
    name: 'info',
    description: 'Obtiene información del servidor.',
    aliases: ['cpu', 'server'],

    async execute(sock, m) {
        const cpuInfo = os.cpus()[0];
        const totalMemory = Math.round(os.totalmem() / (1024 * 1024)); // Convertir a MB

        const infoMessage = `*Información del Servidor*:

- *Sistema Operativo:* ${os.type()} ${os.release()}
- *Arquitectura del CPU:* ${cpuInfo.model}
- *Núcleos del CPU:* ${os.cpus().length}
- *Frecuencia del CPU:* ${cpuInfo.speed} MHz
- *Memoria Total:* ${totalMemory} MB`;

        await sock.sendMessage(m.chat, { text: infoMessage }, { quoted: m });
    },
};
