const axios = require('axios');
const { fetchJson } = require('../../lib/utils');

module.exports = {
    name: 'regcompleto',
    description: 'Registro completo solicitando nombre, edad, género y correo electrónico',
    
    async execute(sock, m, args) {
        try {
            const [name, age, gender, email] = args.join(' ').split('|').map(arg => arg.trim());
            if (name.length < 3 || name.length > 15) {
                await sock.sendMessage(m.chat, { text: 'El nombre debe tener entre 3 y 15 caracteres.' }, { quoted: m });
                return;
            }
            if (!age || !gender || !email) {
                await sock.sendMessage(m.chat, { text: 'Por favor, proporciona nombre, edad, género y correo electrónico.' }, { quoted: m });
                return;
            }
            const userAge = parseInt(age)
            const isRegisteredResponse = await fetchJson(`https://api-zio.replit.app/api/users/${m.sender.split('@')[0]}?key=ZioAPI`);
            if (isRegisteredResponse.status === 200) {
                await sock.sendMessage(m.chat, { text: 'Ya estás registrado.' }, { quoted: m });
                return;
            }
            if (userAge < 13 || userAge > 75) {
                await sock.sendMessage(m.chat, { text: 'Debes tener entre 13 y 75 años para registrarte.' }, { quoted: m });
                return;
            }
            if (!['femenino', 'masculino'].includes(gender.toLowerCase())) {
                await sock.sendMessage(m.chat, { text: 'Género no válido. Debe ser "femenino" o "masculino".' }, { quoted: m });
                return;
            }
            if (!validEmail(email)) {
                await sock.sendMessage(m.chat, { text: 'Correo electrónico no válido.' }, { quoted: m });
                return;
            }
            const apiUrl = 'https://api-zio.replit.app/api/users?key=ZioAPI';
            const response = await axios.post(apiUrl, {
                number: m.sender.split('@')[0],
                name,
                gender: gender.toLowerCase(),
                age,
                email,
            });
            if (response.status === 201) {
                await sock.sendMessage(m.chat, { text: 'Registro completo exitoso.' }, { quoted: m });
            } else {
                await sock.sendMessage(m.chat, { text: 'Error en el registro.' }, { quoted: m });
            }
        } catch (error) {
            console.error('Error:', error);
            await sock.sendMessage(m.chat, { text: 'Error al procesar la solicitud.' }, { quoted: m });
        }
    },
};

function validEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
