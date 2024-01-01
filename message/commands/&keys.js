const axios = require('axios');

module.exports = {
    name: 'getkeys',
    description: 'Obtiene las keys desde la API',

    async execute(sock, m, args) {
        try {
            // Puedes cambiar la URL de la API según tus necesidades
            const apiUrl = 'https://api.alexitoky.repl.co/api/keys/zio?key=TK';

            const response = await axios.get(apiUrl);

            if (response.status === 200) {
                const keyData = response.data.result;
                const keyInfo = `Key: ${keyData.key}\nLímite: ${keyData.limit}\nEstado: ${keyData.status ? 'Habilitado' : 'Deshabilitado'}`;

                await sock.sendMessage(m.chat, { text: keyInfo }, { quoted: m });
            } else {
                await sock.sendMessage(m.chat, { text: 'Error al obtener las keys desde la API.' }, { quoted: m });
            }
        } catch (error) {
            console.error('Error:', error);
            await sock.sendMessage(m.chat, { text: 'Error al procesar la solicitud.' }, { quoted: m });
        }
    },
};
