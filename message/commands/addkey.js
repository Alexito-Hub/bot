const axios = require('axios');
const { fetchJson } = require('../../lib/utils');

module.exports = {
    name: 'addkey',
    description: 'Añade una nueva key',
    
    async execute(sock, m, args) {
        try {
            const [name, limit, status] = args;

            if (!name || !limit || !status) {
                await sock.sendMessage(m.chat, { text: 'Por favor, proporciona name, limit (solo números) y status separados por "|".' }, { quoted: m });
                return;
            }

            if (isNaN(limit) || !Number.isInteger(parseFloat(limit))) {
                await sock.sendMessage(m.chat, { text: 'El límite debe ser un número entero.' }, { quoted: m });
                return;
            }

            if (status !== 'true' && status !== 'false') {
                await sock.sendMessage(m.chat, { text: 'El parámetro status solo puede ser "true" o "false".' }, { quoted: m });
                return;
            }

            const postResponse = await fetchJson('https://api-zio.replit.app/api/keys', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
                },
                data: {
                    key: name,
                    limit: parseInt(limit),
                    status: status === 'true',
                },
            });

            if (postResponse.status === 200) {
                await sock.sendMessage(m.chat, { text: `Nueva key "${name}" agregada correctamente.` }, { quoted: m });
            } else {
                await sock.sendMessage(m.chat, { text: 'Error al agregar la nueva key.' }, { quoted: m });
            }
        } catch (error) {
            console.error('Error:', error);
            await sock.sendMessage(m.chat, { text: 'Error al procesar la solicitud.' }, { quoted: m });
        }
    },
};
