const axios = require('axios');

async function isRegister(number) {
    const apiUrl = `https://api-zio.replit.app/api/users/${number}?key=ZioAPI`;
    try {
        const response = await fetchJson(apiUrl);
        return response.status === 200;
    } catch (error) {
        if (response && response.status === 404) {
            return false;
        } else {
            console.error('Error al verificar el registro del usuario:', error.message);
            return false;
        }
    }
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
            const apiUrl = 'https://api-zio.replit.app/users?key=ZioAPI';
            const response = await axios.post(apiUrl, {
                number: m.sender.split('@')[0],
                name,
                gender: '✘', // Puedes ajustar esto según lo que esperes en la API
                age,
                email: '✘', // Puedes ajustar esto según lo que esperes en la API
                });


            // Verifica la respuesta y proporciona retroalimentación al usuario
            if (response && response.status === 200) {
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
