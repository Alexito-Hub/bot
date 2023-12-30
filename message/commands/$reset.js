const { exec } = require('child_process');

module.exports = {
    name: 'update',
    description: 'Actualiza y reinicia el bot',

    async execute(sock, m, args, isOwner, sleep) {
        try {
            if (!isOwner) {
                await sock.sendMessage(m.chat, { text: 'No tienes permisos para ejecutar este comando.' }, { quoted: m });
                return;
            }

            await sock.sendMessage(m.chat, { text: 'Actualizando, esto puede llevar un tiempo.' }, { quoted: m });

            await sleep(3000)

            exec('git pull', async (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error al ejecutar git pull: ${error}`);
                    await sock.sendMessage(m.chat, { text: 'Error al actualizar el bot.' }, { quoted: m });
                    return;
                }

                const updateMessage = stdout.includes('Updating') ? 'Se actualizó GitHub, hubo cambios.' : 'No hubo cambios en GitHub.';

                await sock.sendMessage(m.chat, { text: `Resultado de la actualización: ${updateMessage}\n${stdout}` }, { quoted: m });

                await sock.sendMessage(m.chat, { text: 'Reiniciando...' });

                exec('pm2 restart bot', async (error, stdout, stderr) => {
                    if (error) {
                        console.error(`Error al reiniciar el bot: ${error}`);
                        await sock.sendMessage(m.chat, { text: 'Error al reiniciar el bot.' });
                        return;
                    }
                    await sleep(3000)
                    await sock.sendMessage(m.chat, { text: 'Bot reiniciado exitosamente.' });
                });
            });
        } catch (error) {
            console.error('Error:', error);
            await sock.sendMessage(m.chat, { text: 'Error al procesar la solicitud.' }, { quoted: m });
        }
    },
};
