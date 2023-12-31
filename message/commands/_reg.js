const axios = require('axios');

async function isUserRegistered(number) {
    const apiUrl = `https://api-zio.replit.app/users?key=ZioAPI&number=${number}`;
    const response = await axios.get(apiUrl);
    return response.data && response.data.status === 200;
}

module.exports = {
    name: 'reg',
    description: 'Registro simple solicitando nombre y edad',
    
    async execute(sock, m, args) {
        try {
            const [name, age] = args;

            if (!name || !age) {
                await sock.sendMessage(m.chat, { text: 'Por favor, proporciona nombre y edad.' }, { quoted: m });
                return;
            }

            const userAge = parseInt(age);

            // Verificar si el usuario ya está registrado
            const isRegistered = await isUserRegistered(m.sender.split('@')[0]);
            if (isRegistered) {
                await sock.sendMessage(m.chat, { text: 'Ya estás registrado.' }, { quoted: m });
                return;
            }

            // Validar la edad del usuario
            if (userAge < 13 || userAge > 75) {
                await sock.sendMessage(m.chat, { text: 'Debes tener entre 13 y 75 años para registrarte.' }, { quoted: m });
                return;
            }

            // Llama a la API para registrar la información del usuario
            const apiUrl = `https://api-zio.replit.app/users?key=ZioAPI`;
            const response = await axios.post(apiUrl, {
                number: m.sender.split('@')[0],
                name,
                age,
            });

            // Verifica la respuesta y proporciona retroalimentación al usuario
            if (response.data && response.data.status === 200) {
                await sock.sendMessage(m.chat, { text: 'Registro simple exitoso.' }, { quoted: m });
            } else {
                await sock.sendMessage(m.chat, { text: 'Error en el registro.' }, { quoted: m });
            }
        } catch (error) {
            console.error('Error:', error);
            await sock.sendMessage(m.chat, { text: 'Error al procesar la solicitud.' }, { quoted: m });
        }
    },
};
