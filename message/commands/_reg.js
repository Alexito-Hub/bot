const axios = require('axios');
const { fetchJson } = require('../../lib/utils');

module.exports = {
    name: 'reg',
    description: 'Registro',
    
    async execute(sock, m, args) {
        try {
            const [name, age] = args.join(' ').split('|').map(arg => arg.trim());
            
            if (!age) {
                await sock.sendMessage(m.chat, { text: 'Por favor, proporciona la edad.' }, { quoted: m });
                return;
            }
            const userAge = parseInt(age);
            const isRegisteredResponse = await fetchJson(`https://iam-zio.replit.app/data/users/${m.sender.split('@')[0]}?key=ZioAPI`);
            if (isRegisteredResponse.status === 200) {
                await sock.sendMessage(m.chat, { text: 'Ya estás registrado.' }, { quoted: m });
                return;
            }
            if (userAge < 13 || userAge > 75) {
                await sock.sendMessage(m.chat, { text: 'Debes tener entre 13 y 75 años para registrarte.' }, { quoted: m });
                return;
            }
            if (name.length < 3 || name.length > 15) {
                await sock.sendMessage(m.chat, { text: 'El nombre debe tener entre 3 y 15 caracteres.' }, { quoted: m });
                return;
            }
            const apiUrl = 'https://iam-zio.replit.app/data/users?key=ZioAPI';
            const response = await axios.post(apiUrl, {
                number: m.sender.split('@')[0],
                name,
                age
            });
            if (response.status === 201) {
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
