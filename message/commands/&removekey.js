const axios = require('axios');
const { fetchJson } = require('../../lib/utils');

module.exports = {
    name: 'deletekey',
    description: 'Elimina una clave existente',
    aliases: ['removekey'],

    async execute(sock, m, args, isOwner) {
        try {
            // Verifica si el usuario tiene permisos para ejecutar el comando
            if (!isOwner) {
                await sock.sendMessage(m.chat, { text: 'No tienes permisos para ejecutar este comando.' }, { quoted: m });
                return;
            }

            // Obtiene el nombre de la clave proporcionado por el usuario
            const keyToDelete = args[0];

            // Realiza la solicitud para eliminar la clave
            const apiUrl = `https://api-zio.replit.app/api/keys/${keyToDelete}?key=Tk`;
            const response = await axios.delete(apiUrl);

            // Verifica la respuesta y proporciona retroalimentación al usuario
            if (response.status === 200) {
                await sock.sendMessage(m.chat, { text: 'Clave eliminada correctamente.' }, { quoted: m });
            } else {
                await sock.sendMessage(m.chat, { text: 'Error al eliminar la clave.' }, { quoted: m });
            }
        } catch (error) {
            console.error('Error:', error);
            await sock.sendMessage(m.chat, { text: 'Error al procesar la solicitud.' }, { quoted: m });
        }
    },
};
