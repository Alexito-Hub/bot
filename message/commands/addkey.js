const axios = require('axios');
const { fetchJson } = require('../../lib/utils');

module.exports = {
    name: 'addkey',
    description: 'Añade una nueva clave con límite y estado',
    
    async execute(sock, m, args, isOwner) {
        try {
            // Verifica si el usuario tiene permisos para ejecutar el comando
            if (!isOwner) {
                await sock.sendMessage(m.chat, { text: 'No tienes permisos para ejecutar este comando.' }, { quoted: m });
                return;
            }

            // Obtiene los argumentos proporcionados por el usuario
            const [name, limit, status] = args.join(' ').split('|').map(arg => arg.trim());

            // Valida que el límite sea un número
            if (!/^\d+$/.test(limit)) {
                await sock.sendMessage(m.chat, { text: 'El límite solo puede contener números.' }, { quoted: m });
                return;
            }

            // Realiza la solicitud para agregar la nueva clave
            const apiUrl = 'https://api-zio.replit.app/api/keys?key=TK';
            const response = await fetchJson(apiUrl, {
                method: 'POST',
                data: {
                    name,
                    limit: parseInt(limit),
                    status: status.toLowerCase() === 'true',
                },
            });

            // Verifica la respuesta y proporciona retroalimentación al usuario
            if (response && response.status === 200) {
                await sock.sendMessage(m.chat, { text: 'Clave añadida correctamente.' }, { quoted: m });
            } else {
                await sock.sendMessage(m.chat, { text: 'Error al agregar la clave.' }, { quoted: m });
            }
        } catch (error) {
            console.error('Error:', error);
            await sock.sendMessage(m.chat, { text: 'Error al procesar la solicitud.' }, { quoted: m });
        }
    },
};
