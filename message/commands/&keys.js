const axios = require('axios');

module.exports = {
    name: 'getkeys',
    description: 'Obtiene todas las keys desde la API',

    async execute(sock, m, args) {
        try {
            // Puedes cambiar la URL de la API según tus necesidades
            const apiUrl = 'https://api-zio.replit.app/api/keys?key=TK';

            const response = await axios.get(apiUrl);

            if (response.status === 200) {
                const keysData = response.data.result.keys;

                // Verificar si hay keys disponibles
                if (keysData.length > 0) {
                    // Mapear la información de cada key
                    const keysInfo = keysData.map(keyData => {
                        return `Key: ${keyData.key}\nLímite: ${keyData.limit}\nEstado: ${keyData.status ? 'Habilitado' : 'Deshabilitado'}`;
                    });

                    // Enviar la información de todas las keys en un solo mensaje
                    await sock.sendMessage(m.chat, { text: keysInfo.join('\n\n') }, { quoted: m });
                } else {
                    await sock.sendMessage(m.chat, { text: 'No hay keys disponibles.' }, { quoted: m });
                }
            } else {
                await sock.sendMessage(m.chat, { text: 'Error al obtener las keys desde la API.' }, { quoted: m });
            }
        } catch (error) {
            console.error('Error:', error);
            await sock.sendMessage(m.chat, { text: 'Error al procesar la solicitud.' }, { quoted: m });
        }
    },
};
