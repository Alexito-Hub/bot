const {
	default: makeWASocket,
	useMultiFileAuthState,
	DisconnectReason,
	makeCacheableSignalKeyStore,
	getContentType
} = require('@whiskeysockets/baileys');
const P = require('pino');
const { exec } = require('child_process');
const express = require('express');
const app = express();
const path = require('path');

const start = async () => {
	const logger = P({ level: 'info' }); // Ajusta el nivel de registro según sea necesario
	try {
		const { state, saveCreds } = await useMultiFileAuthState('session');

		const sock = makeWASocket({
			logger,
			browser: ['Kaori - v0.x', 'Firefox', '3.0.0'],
			printQRInTerminal: true,
			auth: {
				creds: state.creds,
				keys: makeCacheableSignalKeyStore(state.keys, logger),
			}
		});

		sock.ev.on('connection.update', (update) => {
			const { connection, lastDisconnect } = update;
			if (connection === 'close') {
				if (lastDisconnect.error.output.statusCode !== 401) {
					start();
				} else {
					exec('rm -rf session', (err) => {
						if (err) {
							logger.error('Error eliminando sesión:', err);
						} else {
							logger.info('Sesión eliminada');
							start();
						}
					});
				}
			} else if (connection === 'open') {
				logger.info('Conexión abierta');
			}
		});

		sock.ev.on('creds.update', saveCreds);
		
		sock.ev.on('group-participants.update', async (update) => {
            console.log('group-participants.update event triggered');
            const groupId = update.id;
            const participants = update.participants;
            const action = update.action;
    
            for (const participant of participants) {
                console.log(`participant update: ${participant}, action: ${action}`);
                const user = participant.split('@')[0];
                if (action === 'add') {
                    sock.sendMessage(groupId, { 
                        text:`¡Bienvenido/a @${user} al grupo NaN! ¡Espero que disfrutes tu estancia y compartas momentos geniales!`,
                        contextInfo: {
                            mentionedJid: [participant],
                            externalAdReply: {
                                title: `ᴍᴏᴄʜɪ • ᴛᴀᴋᴜ ᴍᴇᴅɪᴀ`,
                                body: `ugu`,
                                showAdAttribution: true,
                                renderLargerThumbnail: true, 
                                mediaType: 1, 
                                thumbnailUrl: 'https://imgmedia.larepublica.pe/640x371/larepublica/original/2022/06/30/62be22d15330dd1f2a2f91c0.webp'
                                }
                            }
                    })
    
                } else if (action === 'remove') {
                    sock.sendMessage(groupId, {
                        text:`Lamentamos ver partir a @${user}. Siempre serás bienvenido/a de regreso si decides volver. ¡Hasta pronto y te deseamos lo mejor!`,
                        contextInfo: {
                            mentionedJid: [participant],
                            externalAdReply: {
                                title: `ᴍᴏᴄʜɪ • ᴛᴀᴋᴜ ᴍᴇᴅɪᴀ`,
                                body: `Ugu`,
                                showAdAttribution: true,
                                renderLargerThumbnail: true, 
                                mediaType: 1, 
                                thumbnailUrl: 'https://imgmedia.larepublica.pe/640x371/larepublica/original/2022/06/30/62be22d15330dd1f2a2f91c0.webp'
                                }
                            }
                    })
                }
            }
        });
		sock.ev.on('messages.upsert', messages => {
			messages = messages.messages[0];
			if (!messages) return;

			messages.message = (getContentType(messages.message) === 'ephemeralMessage') ? messages.message.ephemeralMessage.message : messages.message;
			if (messages.key && messages.key.remoteJid === 'status@broadcast') return;

			require('./message/upsert')(sock, messages);
		});
	} catch (error) {
		logger.error('Error en la función start:', error);
	}
};

app.use(express.static(path.join(__dirname, 'others')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'others', 'index.html'));
});

app.use((req, res) => {
	res.status(404).sendFile(path.join(__dirname, 'others', '404.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Escuchando en el puerto ${PORT}`);
	start();
});
